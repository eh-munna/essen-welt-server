import Stripe from 'stripe';
import config from '../../config/index.js';

const stripe = new Stripe(config.stripeSecret);

const paymentIntent = async (payload = []) => {
  let totalAmount = payload?.reduce(
    (total, item) => total + (item?.price || 0) * (item?.quantity || 1),
    0
  );

  const minAmount = 0.5;
  if (totalAmount < minAmount) {
    totalAmount = minAmount;
  }

  // Create a payment intent in Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent.client_secret;
};
export { paymentIntent };
