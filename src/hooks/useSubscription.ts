
import { useState, useEffect } from 'react';
import { getUserSubscription, getUserPoints, UserSubscription, UserPoints } from '../services/paymentService';

interface SubscriptionHookResult {
  subscription: UserSubscription | null;
  loading: boolean;
  isBasic: boolean;
  isPremium: boolean;
  currentPlan: {
    planType: string;
    priceId?: string;
    name?: string;
    price?: number;
    interval?: string;
    features?: string[];
  } | null;
  userPoints: UserPoints;
  plan: string;
  expiresAt: string;
  features: string[];
}

export const useSubscription = (): SubscriptionHookResult => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [userPoints, setUserPoints] = useState<UserPoints>({ points: 0, level: 1 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const sub = await getUserSubscription();
        setSubscription(sub);
        
        const points = await getUserPoints();
        setUserPoints(points);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  // Determine if user is on basic or premium plan
  const isBasic = subscription?.planType === 'free' || !subscription?.isActive;
  const isPremium = subscription?.planType === 'premium' && subscription?.isActive;

  // Current plan info with additional properties to fix build errors
  const currentPlan = subscription ? {
    planType: subscription.planType || 'free',
    priceId: subscription.priceId,
    name: isPremium ? 'Premium' : 'Basic',
    price: isPremium ? 1999 : 0,
    interval: isPremium ? 'month' : '',
    features: isPremium ? 
      ['Exports PDF illimités', 'Assistant IA avancé', 'Modules premium', 'Analyse vidéo'] : 
      ['Assistant IA basique']
  } : null;

  // Default to never-expiring free plan
  const expiresAtDate = subscription?.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd)
    : new Date(2099, 11, 31);

  // For compatibility with components expecting certain fields
  return {
    subscription,
    loading,
    isBasic,
    isPremium,
    currentPlan,
    userPoints,
    plan: subscription?.planType || 'free',
    expiresAt: expiresAtDate.toISOString(),
    features: isPremium ? 
      ['pdf_export', 'ai_chat', 'video_analysis', 'premium_modules'] : 
      ['ai_chat_basic']
  };
};
