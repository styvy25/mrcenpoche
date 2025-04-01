
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";

// Types
interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
  stripePriceId: string;
}

interface SubscriptionStatus {
  isActive: boolean;
  plan: string | null;
  interval: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  customerId: string | null;
  subscriptionId: string | null;
  priceId: string | null;
  status: string | null;
}

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

// Function to create a Stripe checkout session
export const createCheckoutSession = async (priceId: string): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      console.error('User is not authenticated');
      return null;
    }
    
    // Create checkout session through Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        priceId,
        userId: session.user.id,
        customerEmail: session.user.email,
      },
    });
    
    if (error) {
      console.error('Error creating checkout session:', error);
      return null;
    }
    
    return data.sessionId || null;
  } catch (error) {
    console.error('Unexpected error creating checkout session:', error);
    return null;
  }
};

// Function to redirect to Stripe checkout
export const redirectToCheckout = async (priceId: string): Promise<void> => {
  try {
    const sessionId = await createCheckoutSession(priceId);
    if (!sessionId) {
      throw new Error('Failed to create checkout session');
    }
    
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};

// Function to get current subscription status
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  const defaultStatus: SubscriptionStatus = {
    isActive: false,
    plan: null,
    interval: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    customerId: null,
    subscriptionId: null,
    priceId: null,
    status: null,
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
      console.error('Error fetching subscription:', error);
      return defaultStatus;
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
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return defaultStatus;
  }
};

// Function to get user points and level
export const getUserPoints = async (): Promise<{ points: number; level: number }> => {
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
    
    if (error || !data) {
      console.error('Error fetching user points:', error);
      return { points: 0, level: 1 };
    }
    
    return {
      points: data.points || 0,
      level: data.level || 1,
    };
  } catch (error) {
    console.error('Error getting user points:', error);
    return { points: 0, level: 1 };
  }
};
