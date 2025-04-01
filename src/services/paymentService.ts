
import { supabase } from "@/integrations/supabase/client";

// Types
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
  stripePriceId: string;
}

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
  cancelAtPeriodEnd: boolean;
  customerId: string | null;
  subscriptionId: string | null;
  priceId: string | null;
  status: string | null;
  planType?: 'free' | 'premium' | 'enterprise';
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
    price: 3000,
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

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basique',
    description: 'Pour les sympathisants et nouveaux militants',
    price: 0,
    features: [
      'Accès aux modules de base',
      'Quiz limités (5 par jour)',
      'Contenu du MRC limité',
    ],
    interval: 'month',
    stripePriceId: '',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Pour les militants actifs',
    price: 3000,
    features: [
      'Accès à tous les modules',
      'Quiz illimités',
      'Contenu exclusif du MRC',
      'Support prioritaire',
      'Certificats de formation',
    ],
    interval: 'month',
    stripePriceId: 'price_1OEXXoBnTYl74gTgWtE3Dqr8',
  },
  {
    id: 'premium-annual',
    name: 'Premium Annuel',
    description: 'Pour les militants dévoués',
    price: 25000,
    features: [
      'Tous les avantages Premium',
      'Économisez 30% par rapport au tarif mensuel',
      'Accès prioritaire aux nouvelles fonctionnalités',
      'Badge "Supporter Loyal"',
    ],
    interval: 'year',
    stripePriceId: 'price_1OEXXoBnTYl74gTgYIcwUDNI',
  },
];

// Function to get current subscription status
export const getSubscriptionStatus = async (): Promise<UserSubscription> => {
  const defaultStatus: UserSubscription = {
    isActive: false,
    plan: null,
    interval: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    customerId: null,
    subscriptionId: null,
    priceId: null,
    status: null,
    planType: 'free',
  };
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return defaultStatus;
    }
    
    // Get subscription data from database
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (error || !data) {
      console.log('No subscription found, using default free plan');
      return {
        ...defaultStatus,
        isActive: true,
        plan: 'free',
        status: 'active',
        planType: 'free'
      };
    }
    
    return {
      isActive: data.is_active,
      plan: data.plan_type,
      interval: data.interval || null,
      currentPeriodEnd: data.end_date,
      cancelAtPeriodEnd: data.cancel_at_period_end || false,
      customerId: data.stripe_customer_id || null,
      subscriptionId: data.stripe_subscription_id || null,
      priceId: data.stripe_price_id || null,
      status: data.status || null,
      planType: data.plan_type as 'free' | 'premium' | 'enterprise'
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return defaultStatus;
  }
};

// Function to get user points
export const getUserPoints = async (): Promise<UserPoints> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return { points: 0, level: 1 };
    }
    
    const { data, error } = await supabase
      .from('user_points')
      .select('points, level')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user points:', error);
      return { points: 0, level: 1 };
    }
    
    return {
      points: data?.points || 0,
      level: data?.level || 1,
    };
  } catch (error) {
    console.error('Error getting user points:', error);
    return { points: 0, level: 1 };
  }
};

// Function to get user subscription
export const getUserSubscription = async (): Promise<UserSubscription | null> => {
  try {
    return await getSubscriptionStatus();
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
};
