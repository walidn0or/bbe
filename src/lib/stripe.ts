import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface PaymentIntentData {
  amount: number;
  donationType: 'one-time' | 'monthly';
  donorEmail: string;
  donationId: string;
  metadata: Record<string, string>;
}

export interface SubscriptionData {
  amount: number;
  donorEmail: string;
  donationId: string;
  metadata: Record<string, string>;
}

export async function createStripePaymentIntent(data: PaymentIntentData) {
  try {
    if (data.donationType === 'monthly') {
      // For monthly donations, create a subscription
      return await createStripeSubscription({
        amount: data.amount,
        donorEmail: data.donorEmail,
        donationId: data.donationId,
        metadata: data.metadata,
      });
    } else {
      // For one-time donations, create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: 'usd',
        receipt_email: data.donorEmail,
        metadata: {
          donationId: data.donationId,
          donationType: data.donationType,
          ...data.metadata,
        },
        description: `Donation to Beyond Borders Empowerment - $${data.amount}`,
      });

      return paymentIntent;
    }
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    throw new Error('Failed to create payment intent');
  }
}

export async function createStripeSubscription(data: SubscriptionData) {
  try {
    // First, create or retrieve customer
    const customers = await stripe.customers.list({
      email: data.donorEmail,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: data.donorEmail,
        metadata: {
          donationId: data.donationId,
          ...data.metadata,
        },
      });
    }

    // Create a price for the subscription
    const price = await stripe.prices.create({
      unit_amount: Math.round(data.amount * 100), // Convert to cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Monthly Donation to Beyond Borders Empowerment',
        description: `Monthly donation of $${data.amount}`,
      },
      metadata: {
        donationId: data.donationId,
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        donationId: data.donationId,
        donationType: 'monthly',
        ...data.metadata,
      },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      subscription_id: subscription.id,
    };
  } catch (error) {
    console.error('Stripe subscription creation error:', error);
    throw new Error('Failed to create subscription');
  }
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw new Error('Failed to retrieve payment intent');
  }
}

export async function retrieveSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new Error('Failed to retrieve subscription');
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

export async function constructWebhookEvent(body: string, signature: string) {
  try {
    return stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Webhook signature verification failed');
  }
}

// Helper function to format amount for display
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Helper function to get Stripe dashboard URL for payment
export function getStripeDashboardUrl(paymentIntentId: string): string {
  const isLive = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_');
  const baseUrl = isLive 
    ? 'https://dashboard.stripe.com' 
    : 'https://dashboard.stripe.com/test';
  return `${baseUrl}/payments/${paymentIntentId}`;
}
