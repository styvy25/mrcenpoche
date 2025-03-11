
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
// This is a test publishable key, replace with your actual key in production
const stripePromise = loadStripe('pk_test_51Nk4IkHG3OQWoDIrTW1DEI9JbLDQ7RMowMRLV4mDqryQJiU0nblGpfQ8RWxGf1WRMsUYKY1jyqTpGK2QZbkiPTB200LwSeOajm');

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
