
import { supabase } from "@/integrations/supabase/client";
import { Feature } from "@/hooks/api-keys/types";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  planType: 'free' | 'premium' | 'enterprise';
}

export interface UserSubscription {
  id: string;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  status: string;
  planType: 'free' | 'premium' | 'enterprise';
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPoints {
  points: number;
  level: number;
}

// Default subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free-plan',
    name: 'Gratuit',
    description: "L'essentiel pour démarrer",
    priceId: 'price_free',
    price: 0,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Accès à 3 modules de formation',
      'Assistant IA (limité à 10 questions/jour)',
      'Génération de PDF (limité à 3/mois)',
      'Suivi de progression basique'
    ],
    planType: 'free'
  },
  {
    id: 'premium-plan',
    name: 'Premium',
    description: "L'offre complète pour les militants actifs",
    priceId: 'price_1Owng6KsLcDuIw41ZukrPl1s',
    price: 9.99,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Accès illimité à tous les modules',
      'Assistant IA Styvy237 sans limite',
      'Génération de PDF illimitée',
      'Suivi de progression avancé',
      'Accès aux webinaires exclusifs',
      'Certificats de formation'
    ],
    isPopular: true,
    planType: 'premium'
  },
  {
    id: 'groupe-plan',
    name: 'Groupe',
    description: "Idéal pour les comités locaux du MRC",
    priceId: 'price_1OwnlrKsLcDuIw41txGn0Fvi',
    price: 99,
    currency: 'EUR',
    interval: 'month',
    features: [
      "Jusqu'à 15 utilisateurs",
      'Tous les avantages Premium',
      'Espace de discussion collaboratif',
      'Tableau de bord pour coordinateurs',
      'Formation sur mesure pour votre région',
      'Support prioritaire'
    ],
    planType: 'enterprise'
  }
];

// Create a checkout session and redirect to Stripe
export const createCheckoutSession = async (priceId: string, customerEmail?: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        customer_email: customerEmail,
        success_url: `${window.location.origin}/payment?success=true`,
        cancel_url: `${window.location.origin}/payment?canceled=true`
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url;
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Get user subscription
export const getUserSubscription = async (): Promise<UserSubscription | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }

    if (!data) return null;
    
    return {
      id: data.id,
      userId: data.user_id,
      stripeCustomerId: data.stripe_customer_id,
      stripeSubscriptionId: data.stripe_subscription_id,
      stripePriceId: data.stripe_price_id,
      status: data.status,
      planType: data.plan_type as 'free' | 'premium' | 'enterprise',
      currentPeriodStart: data.current_period_start ? new Date(data.current_period_start) : null,
      currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : null,
      cancelAtPeriodEnd: data.cancel_at_period_end,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Get user points
export const getUserPoints = async (): Promise<UserPoints | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('user_points')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching points:', error);
      return null;
    }

    return data ? {
      points: data.points,
      level: data.level
    } : { points: 0, level: 1 };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Check if a user can use a specific feature
export const canUseFeature = async (feature: Feature): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { data, error } = await supabase.rpc(
      'can_use_feature',
      { user_id: session.user.id, feature_name: feature }
    );

    if (error) {
      console.error('Error checking feature access:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Increment feature usage
export const incrementFeatureUsage = async (feature: Feature): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { data, error } = await supabase.rpc(
      'increment_feature_usage',
      { p_user_id: session.user.id, p_feature: feature }
    );

    if (error) {
      console.error('Error incrementing feature usage:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Manage subscription portal
export const goToCustomerPortal = async () => {
  const subscription = await getUserSubscription();
  if (!subscription?.stripeCustomerId) {
    throw new Error('No subscription found');
  }
  
  try {
    const { data, error } = await supabase.functions.invoke('customer-portal', {
      body: {
        customer_id: subscription.stripeCustomerId,
        return_url: window.location.origin
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    window.location.href = data.url;
    return data;
  } catch (error) {
    console.error('Error opening customer portal:', error);
    throw error;
  }
};
