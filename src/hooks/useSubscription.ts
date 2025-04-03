
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionPlan = "free" | "basic" | "premium" | "pro";

export interface UseSubscriptionReturn {
  isPremium: boolean;
  subscriptionStatus: string;
  subscriptionExpiry: Date | null;
  refreshSubscription: () => Promise<void>;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("free");
  const [subscriptionExpiry, setSubscriptionExpiry] = useState<Date | null>(null);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    // Either check local storage or fetch from API
    const storedPlan = localStorage.getItem('subscription_plan');
    
    if (storedPlan) {
      try {
        const planData = JSON.parse(storedPlan);
        setIsPremium(planData.plan !== 'free');
        setSubscriptionStatus(planData.plan);
        setSubscriptionExpiry(planData.expiry ? new Date(planData.expiry) : null);
      } catch (error) {
        console.error("Error parsing subscription data:", error);
      }
    } else {
      // If not in local storage, try to fetch from Supabase if the user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_subscriptions')
            .select('plan, status, expires_at')
            .eq('user_id', user.id)
            .single();
            
          if (data && !error) {
            const isPlan = data.plan !== 'free' && data.status === 'active';
            setIsPremium(isPlan);
            setSubscriptionStatus(data.plan);
            setSubscriptionExpiry(data.expires_at ? new Date(data.expires_at) : null);
            
            // Store in local storage for future use
            localStorage.setItem('subscription_plan', JSON.stringify({
              plan: data.plan,
              status: data.status,
              expiry: data.expires_at
            }));
          }
        } catch (error) {
          console.error('Error fetching subscription data:', error);
        }
      }
    }
  };

  const refreshSubscription = async () => {
    await checkSubscription();
  };

  return {
    isPremium,
    subscriptionStatus,
    subscriptionExpiry,
    refreshSubscription
  };
};
