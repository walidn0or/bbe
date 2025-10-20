import { NextRequest, NextResponse } from 'next/server';
import { validateDonationForm, sanitizeFormData, DonationFormData } from '@/lib/donation-validation';
import { createStripePaymentIntent } from '@/lib/stripe';
import { saveDonation } from '@/lib/database';
import { sendDonationReceipt, sendAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const validationErrors = validateDonationForm(body);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Sanitize form data
    const sanitizedData: DonationFormData = sanitizeFormData(body);

    // Generate unique donation ID
    const donationId = `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Create Stripe payment intent
      const paymentIntent = await createStripePaymentIntent({
        amount: sanitizedData.amount,
        donationType: sanitizedData.donationType,
        donorEmail: sanitizedData.email,
        donationId: donationId,
        metadata: {
          donorName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          isAnonymous: sanitizedData.isAnonymous.toString(),
          dedicateGift: sanitizedData.dedicateGift.toString(),
          ...(sanitizedData.dedicateGift && {
            dedicationType: sanitizedData.dedicationType,
            dedicateName: sanitizedData.dedicateName,
          }),
        },
      });

      // Save donation to database with pending status
      const donation = await saveDonation({
        ...sanitizedData,
        id: donationId,
        status: 'pending',
        paymentIntentId: paymentIntent.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Return payment client secret for frontend processing
      return NextResponse.json({
        success: true,
        donationId: donationId,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });

    } catch (paymentError) {
      console.error('Payment processing error:', paymentError);
      
      // Save failed donation attempt for tracking
      await saveDonation({
        ...sanitizedData,
        id: donationId,
        status: 'failed',
        errorMessage: paymentError instanceof Error ? paymentError.message : 'Payment processing failed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json(
        { error: 'Payment processing failed. Please try again or contact support.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Donation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const donationId = searchParams.get('id');

  if (!donationId) {
    return NextResponse.json(
      { error: 'Donation ID is required' },
      { status: 400 }
    );
  }

  try {
    // This would fetch donation details from database
    // For now, return a placeholder response
    return NextResponse.json({
      success: true,
      donation: {
        id: donationId,
        status: 'completed',
        // Add other donation details as needed
      }
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation details' },
      { status: 500 }
    );
  }
}
