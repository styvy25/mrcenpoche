
import { useState, useEffect } from 'react';
import { getUserSubscription, getUserPoints, SubscriptionPlan, SUBSCRIPTION_PLANS, UserSubscription, UserPoints } from '@/services/paymentService';

export function usePaymentState(searchParams: URLSearchParams) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    async function loadSubscriptionData() {
      try {
        setLoading(true);
        
        // Get user subscription
        const userSubscription = await getUserSubscription();
        setSubscription(userSubscription);
        
        // Get user points
        const points = await getUserPoints();
        setUserPoints(points);
        
        // Find current plan
        if (userSubscription) {
          const plan = SUBSCRIPTION_PLANS.find(p => p.planType === userSubscription.planType) || SUBSCRIPTION_PLANS[0];
          setCurrentPlan(plan);
        } else {
          // Default to free plan
          setCurrentPlan(SUBSCRIPTION_PLANS[0]);
        }
      } catch (error) {
        console.error('Error loading subscription data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSubscriptionData();
  }, []);
  
  // Check if user is on a premium plan
  const isPremium = subscription?.planType === 'premium' || subscription?.planType === 'enterprise';
  
  // Check if subscription is active
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  return {
    subscription,
    userPoints,
    loading,
    currentPlan,
    isPremium,
    isSubscriptionActive,
    success,
    canceled
  };
}
