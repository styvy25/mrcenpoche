
import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionStatus {
  status: 'active' | 'inactive';
  subscriptionId?: string;
  currentPeriodEnd?: Date;
  plan?: string;
  message?: string;
}

/**
 * Create a checkout session for subscription
 */
export const createCheckoutSession = async (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string
): Promise<{ url: string } | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-subscription', {
      body: {
        action: 'createCheckoutSession',
        priceId,
        successUrl,
        cancelUrl
      }
    });
    
    if (error) {
      console.error("Error creating checkout session:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return null;
  }
};

/**
 * Get the user's subscription status
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-subscription', {
      body: {
        action: 'getSubscriptionStatus'
      }
    });
    
    if (error) {
      console.error("Error getting subscription status:", error);
      return { status: 'inactive', message: "Error fetching subscription status" };
    }
    
    return data;
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return { status: 'inactive', message: "Error fetching subscription status" };
  }
};

/**
 * Handle subscription success
 */
export const handleSubscriptionSuccess = async (sessionId: string): Promise<boolean> => {
  // In a real implementation, this might verify the session and update local state
  // For now, just returning success
  return true;
};
