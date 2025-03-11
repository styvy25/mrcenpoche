
import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any> | null = null;

export const initializeStripe = (publishableKey: string) => {
  if (!stripePromise && publishableKey) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const getStripeInstance = () => {
  if (!stripePromise) {
    try {
      const savedKeys = localStorage.getItem("api_keys");
      if (savedKeys) {
        const keys = JSON.parse(savedKeys);
        if (keys.stripe) {
          stripePromise = loadStripe(keys.stripe);
        }
      }
    } catch (error) {
      console.error("Error initializing Stripe:", error);
    }
  }
  return stripePromise;
};
