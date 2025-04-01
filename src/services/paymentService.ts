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

export enum Feature {
  PDF_EXPORT = 'pdf_export',
  AI_CHAT = 'ai_chat',
  VIDEO_ANALYSIS = 'video_analysis',
  PREMIUM_MODULES = 'premium_modules'
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
  planType: 'free' | 'premium' | 'enterprise';
  priceId?: string;
  isPopular?: boolean;
}

export interface UserSubscription {
  isActive: boolean;
  plan: string | null;
  interval: string | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  customerId: string | null;
  subscriptionId: string | null;
  priceId: string | null;
  status: string | null;
  planType?: 'free' | 'premium' | 'enterprise';
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
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
    planType: 'free',
    priceId: 'price_free'
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
    planType: 'premium',
    priceId: 'price_1OEXXoBnTYl74gTgWtE3Dqr8',
    isPopular: true
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
    price: 10,
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
    price: 100,
    features: [
      'Tous les avantages Premium',
      'Économisez 17% par rapport au tarif mensuel',
      'Accès prioritaire aux nouvelles fonctionnalités',
      'Badge "Supporter Loyal"',
    ],
    interval: 'year',
    stripePriceId: 'price_1OEXXoBnTYl74gTgYIcwUDNI',
  },
];

// Feature usage limits for free plan
const FEATURE_LIMITS = {
  [Feature.PDF_EXPORT]: 5,
  [Feature.AI_CHAT]: 10,
  [Feature.VIDEO_ANALYSIS]: 3,
  [Feature.PREMIUM_MODULES]: 2
};

// Function to check if user can use a feature
export const canUseFeature = async (feature: Feature): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return false;
    }
    
    // Check if user is premium (premium users can always use features)
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (subscription?.plan_type === 'premium' && subscription?.is_active) {
      return true;
    }
    
    // For free users, check usage count against limits
    const { data: usageData, error } = await supabase
      .from('feature_usage')
      .select('count')
      .eq('user_id', session.user.id)
      .eq('feature', feature)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking feature usage:', error);
      return false;
    }
    
    const usageCount = usageData?.count || 0;
    return usageCount < FEATURE_LIMITS[feature];
  } catch (error) {
    console.error('Error in canUseFeature:', error);
    return false;
  }
};

// Function to increment feature usage counter
export const incrementFeatureUsage = async (feature: Feature): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return;
    }
    
    // Check if record exists
    const { data: existingUsage } = await supabase
      .from('feature_usage')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('feature', feature)
      .maybeSingle();
    
    if (existingUsage) {
      // Update existing record
      await supabase
        .from('feature_usage')
        .update({ count: existingUsage.count + 1, updated_at: new Date() })
        .eq('id', existingUsage.id);
    } else {
      // Insert new record
      await supabase
        .from('feature_usage')
        .insert({
          user_id: session.user.id,
          feature: feature,
          count: 1
        });
    }
  } catch (error) {
    console.error('Error incrementing feature usage:', error);
  }
};

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
      currentPeriodEnd: data.end_date ? new Date(data.end_date) : null,
      cancelAtPeriodEnd: data.cancel_at_period_end || false,
      customerId: data.stripe_customer_id || null,
      subscriptionId: data.stripe_subscription_id || null,
      priceId: data.stripe_price_id || null,
      status: data.status || null,
      planType: data.plan_type as 'free' | 'premium' | 'enterprise',
      stripeCustomerId: data.stripe_customer_id || null,
      stripeSubscriptionId: data.stripe_subscription_id || null
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

// Redirect to customer portal for managing subscription
export const goToCustomerPortal = async (): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      body: { user_id: session.user.id }
    });

    if (error) throw error;
    
    // Redirect to the URL returned from the function
    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No portal URL returned');
    }
  } catch (error) {
    console.error('Error redirecting to customer portal:', error);
    throw error;
  }
};
