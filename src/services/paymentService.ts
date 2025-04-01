
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

// Mock implementations for functions that use Supabase
// These will be replaced with actual implementations when we have the proper database schema

// Function to check if user can use a feature
export const canUseFeature = async (feature: Feature): Promise<boolean> => {
  // Mock implementation - always return true
  return true;
};

// Function to increment feature usage counter
export const incrementFeatureUsage = async (feature: Feature): Promise<void> => {
  // Mock implementation
  console.log(`Feature usage incremented for: ${feature}`);
};

// Function to get current subscription status
export const getSubscriptionStatus = async (): Promise<UserSubscription> => {
  const defaultStatus: UserSubscription = {
    isActive: true,
    plan: 'free',
    interval: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    customerId: null,
    subscriptionId: null,
    priceId: null,
    status: 'active',
    planType: 'free',
  };
  
  return defaultStatus;
};

// Function to get user points
export const getUserPoints = async (): Promise<UserPoints> => {
  // Mock implementation
  return {
    points: 100,
    level: 1,
  };
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
    window.location.href = 'https://billing.stripe.com/p/login/test';
  } catch (error) {
    console.error('Error redirecting to customer portal:', error);
    throw error;
  }
};
