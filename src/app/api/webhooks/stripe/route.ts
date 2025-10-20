import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { updateDonationStatus, getDonationById } from '@/lib/database';
import { sendDonationReceipt, sendAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  try {
    // Verify webhook signature
    const event = await constructWebhookEvent(body, signature);

    console.log('Stripe webhook event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: any) {
  try {
    const donationId = paymentIntent.metadata?.donationId;
    
    if (!donationId) {
      console.error('No donation ID found in payment intent metadata');
      return;
    }

    // Update donation status to completed
    const updatedDonation = await updateDonationStatus(donationId, 'completed', {
      paymentIntentId: paymentIntent.id,
      completedAt: new Date(),
    });

    if (!updatedDonation) {
      console.error('Donation not found:', donationId);
      return;
    }

    console.log('Payment succeeded for donation:', donationId);

    // Send receipt email to donor
    try {
      await sendDonationReceipt(updatedDonation);
    } catch (emailError) {
      console.error('Failed to send donation receipt:', emailError);
    }

    // Send admin notification
    try {
      await sendAdminNotification(updatedDonation);
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: any) {
  try {
    const donationId = paymentIntent.metadata?.donationId;
    
    if (!donationId) {
      console.error('No donation ID found in payment intent metadata');
      return;
    }

    // Update donation status to failed
    await updateDonationStatus(donationId, 'failed', {
      paymentIntentId: paymentIntent.id,
      errorMessage: paymentIntent.last_payment_error?.message || 'Payment failed',
    });

    console.log('Payment failed for donation:', donationId);

  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    // This handles recurring subscription payments
    const subscriptionId = invoice.subscription;
    const donationId = invoice.metadata?.donationId || 
                      invoice.subscription_details?.metadata?.donationId;

    if (!donationId) {
      console.error('No donation ID found in invoice metadata');
      return;
    }

    const donation = await getDonationById(donationId);
    if (!donation) {
      console.error('Donation not found:', donationId);
      return;
    }

    // For recurring payments, we might want to create a new donation record
    // or update the existing one with the latest payment info
    await updateDonationStatus(donationId, 'completed', {
      subscriptionId: subscriptionId,
      completedAt: new Date(),
    });

    console.log('Recurring payment succeeded for donation:', donationId);

    // Send receipt for recurring payment
    try {
      await sendDonationReceipt({
        ...donation,
        status: 'completed',
        completedAt: new Date(),
      });
    } catch (emailError) {
      console.error('Failed to send recurring donation receipt:', emailError);
    }

  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: any) {
  try {
    const donationId = invoice.metadata?.donationId || 
                      invoice.subscription_details?.metadata?.donationId;

    if (!donationId) {
      console.error('No donation ID found in invoice metadata');
      return;
    }

    console.log('Recurring payment failed for donation:', donationId);

    // You might want to send a notification to the donor about the failed payment
    // and provide instructions to update their payment method

  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

async function handleSubscriptionCreated(subscription: any) {
  try {
    const donationId = subscription.metadata?.donationId;
    
    if (!donationId) {
      console.error('No donation ID found in subscription metadata');
      return;
    }

    // Update donation with subscription ID
    await updateDonationStatus(donationId, 'pending', {
      subscriptionId: subscription.id,
    });

    console.log('Subscription created for donation:', donationId);

  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  try {
    const donationId = subscription.metadata?.donationId;
    
    if (!donationId) {
      console.error('No donation ID found in subscription metadata');
      return;
    }

    // Update donation status to cancelled
    await updateDonationStatus(donationId, 'cancelled', {
      subscriptionId: subscription.id,
    });

    console.log('Subscription cancelled for donation:', donationId);

    // You might want to send a confirmation email about the cancellation

  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}
