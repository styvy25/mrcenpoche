
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type SubscriptionPlan = "free" | "basic" | "premium" | "pro";

interface SubscriptionData {
  isPremium: boolean;
  subscriptionStatus: string;
  subscriptionExpiry: Date | null;
}

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

interface UseSubscriptionReturn {
  isPremium: boolean;
  subscriptionStatus: string;
  subscriptionExpiry: Date | null;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<UseSubscriptionReturn | undefined>(undefined);

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    isPremium: false,
    subscriptionStatus: "free",
    subscriptionExpiry: null
  });
  
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscriptionData({
        isPremium: false,
        subscriptionStatus: "free",
        subscriptionExpiry: null
      });
    }
  }, [user]);

  const checkSubscription = async () => {
    // Either check local storage or fetch from API
    const storedPlan = localStorage.getItem('subscription_plan');
    
    if (storedPlan) {
      try {
        const planData = JSON.parse(storedPlan);
        setSubscriptionData({
          isPremium: planData.plan !== 'free',
          subscriptionStatus: planData.plan,
          subscriptionExpiry: planData.expiry ? new Date(planData.expiry) : null
        });
      } catch (error) {
        console.error("Error parsing subscription data:", error);
      }
    } else if (user) {
      // For demo purposes, we'll just set a free plan
      // In a real app, you would check a subscription table in your database
      setSubscriptionData({
        isPremium: false,
        subscriptionStatus: "free",
        subscriptionExpiry: null
      });
      
      // Store in local storage for future use
      localStorage.setItem('subscription_plan', JSON.stringify({
        plan: "free",
        status: "active",
        expiry: null
      }));
    }
  };

  const refreshSubscription = async () => {
    await checkSubscription();
  };
  
  const value: UseSubscriptionReturn = {
    ...subscriptionData,
    refreshSubscription
  };
  
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): UseSubscriptionReturn => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
