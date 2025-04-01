
import { useState, useEffect } from 'react';
import { getUserPoints } from '@/services/paymentService';
import { usePoints } from '@/hooks/usePoints';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
  planType: 'free' | 'premium' | 'enterprise';
}

export interface UserSubscription {
  isActive: boolean;
  plan: string | null;
  interval: string | null;
  currentPeriodEnd: string | null;
  status: string | null;
}

export interface UserPoints {
  points: number;
  level: number;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    description: 'Pour les sympathisants',
    price: 0,
    features: [
      'Accès aux modules de base',
      'Quiz limités',
      'Contenu du MRC limité',
    ],
    interval: 'month',
    planType: 'free'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Pour les militants actifs',
    price: 10,
    features: [
      'Accès à tous les modules',
      'Quiz illimités',
      'Contenu exclusif du MRC',
      'Support prioritaire',
    ],
    interval: 'month',
    planType: 'premium'
  }
];

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const { points, level } = usePoints();

  useEffect(() => {
    async function loadSubscriptionData() {
      try {
        setLoading(true);
        
        // For now, default to free plan until subscription management is implemented
        const userSubscription: UserSubscription = {
          isActive: true,
          plan: 'free',
          interval: 'month',
          currentPeriodEnd: null,
          status: 'active'
        };
        
        setSubscription(userSubscription);
        
        // Default to free plan
        setCurrentPlan(SUBSCRIPTION_PLANS[0]);
      } catch (error) {
        console.error('Error loading subscription data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSubscriptionData();
  }, []);
  
  // Check if user is on a premium plan
  const isPremium = subscription?.plan === 'premium' || subscription?.plan === 'enterprise';
  
  // Check if subscription is active
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  return {
    subscription,
    userPoints: { points, level },
    loading,
    currentPlan,
    isPremium,
    isSubscriptionActive
  };
}
