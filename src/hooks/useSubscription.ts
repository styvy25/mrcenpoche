
import { useState, useEffect } from 'react';
import { useUser } from './useUser';

export interface UseSubscriptionReturn {
  isPremium: boolean;
  isBasic: boolean;
  subscribe: (plan: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isLoading: boolean;
  subscriptionPlan: {
    name: string;
    priceId: string;
    expires?: Date;
  } | null;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const { user } = useUser();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<{
    name: string;
    priceId: string;
    expires?: Date;
  } | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would check the subscription status from Supabase or your backend
        // For now, let's mock a response based on local storage
        const hasSubscription = localStorage.getItem('isPremium') === 'true';
        setIsPremium(hasSubscription);
        
        if (hasSubscription) {
          setSubscriptionPlan({
            name: 'Premium',
            priceId: 'premium',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          });
        } else {
          setSubscriptionPlan({
            name: 'Basic',
            priceId: 'basic'
          });
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionPlan({
          name: 'Basic',
          priceId: 'basic'
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  const subscribe = async (plan: string) => {
    setIsLoading(true);
    try {
      // In a real app, we would handle the subscription process with Stripe or another provider
      // For demo purposes, we'll just update local storage
      localStorage.setItem('isPremium', 'true');
      setIsPremium(true);
      setSubscriptionPlan({
        name: 'Premium',
        priceId: plan,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would handle the cancellation process
      localStorage.setItem('isPremium', 'false');
      setIsPremium(false);
      setSubscriptionPlan({
        name: 'Basic',
        priceId: 'basic'
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isPremium,
    isBasic: !isPremium,
    subscribe,
    cancelSubscription,
    isLoading,
    subscriptionPlan
  };
};
