import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export interface PaymentIntentData {
  amount: number;
  currency: string;
  metadata?: Record<string, string>;
}

export interface SubscriptionData {
  priceId: string;
  customerId: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentParams {
  amount: number;
  donationType: 'one-time' | 'monthly';
  donorEmail: string;
  donationId: string;
  metadata?: Record<string, string>;
}

/**
 * Formats an amount in USD currency
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Creates a Stripe payment intent for donations
 */
export async function createStripePaymentIntent(params: CreatePaymentIntentParams) {
  const { amount, donationType, donorEmail, donationId, metadata = {} } = params;

  // For monthly donations, create a subscription instead
  if (donationType === 'monthly') {
    // TODO: Implement subscription creation
    // For now, create a one-time payment
    console.warn('Monthly subscriptions not yet implemented, creating one-time payment');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    receipt_email: donorEmail,
    metadata: {
      donationId,
      donationType,
      ...metadata,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent;
}

export default stripe;