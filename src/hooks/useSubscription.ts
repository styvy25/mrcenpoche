
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getSubscriptionStatus, SubscriptionStatus } from '@/services/stripe/stripeService';
import { useAuth } from '@/components/auth/AuthContext';

export interface UseSubscriptionReturn {
  isPremium: boolean;
  subscriptionStatus: SubscriptionStatus | null;
  loading: boolean;
  error: string | null;
  refreshStatus: () => Promise<void>;
  plan?: string;
  currentPlan?: {
    name: string;
    priceId: string;
    expires?: Date;
  };
}

export const useSubscription = (): UseSubscriptionReturn => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setSubscriptionStatus(null);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const status = await getSubscriptionStatus();
      setSubscriptionStatus(status);
    } catch (err) {
      console.error('Error fetching subscription status:', err);
      setError("Erreur lors de la vérification de l'abonnement");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSubscriptionStatus();
    
    // Set up subscription to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchSubscriptionStatus();
      } else if (event === 'SIGNED_OUT') {
        setSubscriptionStatus(null);
      }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [user?.id]);
  
  // Extract plan information from the subscription status
  const plan = subscriptionStatus?.plan || 'free';
  const currentPlan = subscriptionStatus?.status === 'active' ? {
    name: subscriptionStatus.plan || 'Premium',
    priceId: subscriptionStatus.subscriptionId || 'price_free',
    expires: subscriptionStatus.currentPeriodEnd
  } : undefined;
  
  return {
    isPremium: subscriptionStatus?.status === 'active',
    subscriptionStatus,
    loading,
    error,
    refreshStatus: fetchSubscriptionStatus,
    plan,
    currentPlan
  };
};
