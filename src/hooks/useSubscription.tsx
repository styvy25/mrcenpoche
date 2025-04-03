
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Plan {
  id: string;
  name: string;
  priceId: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

interface Subscription {
  id: string;
  plan: string;
  status: string;
  expiresAt: Date | null;
}

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

interface UseSubscriptionReturn {
  isPremium: boolean;
}

const SubscriptionContext = createContext<UseSubscriptionReturn | undefined>(undefined);

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setIsPremium(false);
        return;
      }
      
      // In a real app, you would check the user's subscription status
      // For now, we'll just set it to false
      setIsPremium(false);
    };
    
    checkSubscription();
  }, [user]);
  
  return (
    <SubscriptionContext.Provider value={{ isPremium }}>
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
