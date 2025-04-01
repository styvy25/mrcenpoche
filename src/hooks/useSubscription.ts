
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface UserSubscription {
  isPremium: boolean;
  plan: string;
  expiresAt: string | null;
  features: string[];
}

export const useSubscription = () => {
  const { isLoggedIn, user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription>({
    isPremium: false,
    plan: 'free',
    expiresAt: null,
    features: ['basic_access']
  });
  
  useEffect(() => {
    if (isLoggedIn && user) {
      // This would normally fetch the user's subscription status from an API
      // For demo purposes, we'll just set a mock subscription
      setSubscription({
        isPremium: false,
        plan: 'free',
        expiresAt: null,
        features: ['basic_access', 'quiz_access']
      });
    }
  }, [isLoggedIn, user]);
  
  return {
    ...subscription,
    isBasic: subscription.plan === 'free',
  };
};
