
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { initializeStripe, getStripeInstance } from '@/components/payment/StripeConfig';

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    // Tentative d'initialisation de Stripe avec la clé stockée
    try {
      const savedKeys = localStorage.getItem("api_keys");
      if (savedKeys) {
        const keys = JSON.parse(savedKeys);
        if (keys.stripe) {
          setStripePromise(initializeStripe(keys.stripe));
        }
      }
    } catch (error) {
      console.error("Error initializing Stripe:", error);
    }
  }, []);

  // Si la clé Stripe n'est pas disponible, afficher uniquement les enfants
  if (!stripePromise) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
