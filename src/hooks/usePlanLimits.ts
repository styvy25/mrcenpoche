
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

export type PlanType = 'free' | 'premium';

export interface PlanLimits {
  chatMessagesPerDay: number;
  pdfGenerationsPerMonth: number;
  adFree: boolean;
}

const DEFAULT_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    chatMessagesPerDay: 10,
    pdfGenerationsPerMonth: 3,
    adFree: false
  },
  premium: {
    chatMessagesPerDay: -1, // unlimited
    pdfGenerationsPerMonth: -1, // unlimited
    adFree: true
  }
};

// Keys for local storage
const CHAT_USAGE_KEY = 'mrc_chat_usage';
const PDF_USAGE_KEY = 'mrc_pdf_usage';
const USER_PLAN_KEY = 'mrc_user_plan';

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [limits, setLimits] = useState<PlanLimits>(DEFAULT_LIMITS.free);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Initialize limits from local storage or backend
  useEffect(() => {
    const savedPlan = localStorage.getItem(USER_PLAN_KEY);
    if (savedPlan && (savedPlan === 'free' || savedPlan === 'premium')) {
      setUserPlan(savedPlan);
      setLimits(DEFAULT_LIMITS[savedPlan]);
    }
    setIsLoading(false);

    // If we have a user, try to fetch their plan from backend
    if (user?.id) {
      fetchUserPlan(user.id);
    }
  }, [user]);

  // Function to fetch user plan from backend
  const fetchUserPlan = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('plan_type')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        const planType = data.plan_type as PlanType;
        setUserPlan(planType);
        setLimits(DEFAULT_LIMITS[planType]);
        localStorage.setItem(USER_PLAN_KEY, planType);
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user plan (local and backend if authenticated)
  const updateUserPlan = async (newPlan: PlanType): Promise<boolean> => {
    try {
      setUserPlan(newPlan);
      setLimits(DEFAULT_LIMITS[newPlan]);
      localStorage.setItem(USER_PLAN_KEY, newPlan);
      
      // Update in backend if authenticated
      if (user?.id) {
        const { error } = await supabase
          .from('user_subscriptions')
          .upsert({ 
            user_id: user.id, 
            plan_type: newPlan,
            updated_at: new Date().toISOString() 
          });
          
        if (error) throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user plan:', error);
      return false;
    }
  };

  // Feature checks
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    const featureValue = limits[feature];
    if (typeof featureValue === 'boolean') return featureValue;
    return true; // For non-boolean features
  };

  // Chat messages
  const getChatMessagesToday = (): number => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const usage = JSON.parse(localStorage.getItem(CHAT_USAGE_KEY) || '{}');
      return usage[today] || 0;
    } catch (error) {
      console.error('Error getting chat messages count:', error);
      return 0;
    }
  };

  const incrementChatMessages = (): boolean => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const usage = JSON.parse(localStorage.getItem(CHAT_USAGE_KEY) || '{}');
      const todayCount = usage[today] || 0;
      
      // Check against limit
      if (limits.chatMessagesPerDay > 0 && todayCount >= limits.chatMessagesPerDay) {
        return false;
      }
      
      // Update count
      usage[today] = todayCount + 1;
      localStorage.setItem(CHAT_USAGE_KEY, JSON.stringify(usage));
      return true;
    } catch (error) {
      console.error('Error incrementing chat messages:', error);
      return false;
    }
  };

  const canSendChatMessage = (): boolean => {
    if (limits.chatMessagesPerDay < 0) return true; // unlimited
    return getChatMessagesToday() < limits.chatMessagesPerDay;
  };

  // PDF generations
  const getPDFGenerationsThisMonth = (): number => {
    try {
      const yearMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
      const usage = JSON.parse(localStorage.getItem(PDF_USAGE_KEY) || '{}');
      return usage[yearMonth] || 0;
    } catch (error) {
      console.error('Error getting PDF generations count:', error);
      return 0;
    }
  };

  const canGeneratePDF = (): boolean => {
    if (limits.pdfGenerationsPerMonth < 0) return true; // unlimited
    return getPDFGenerationsThisMonth() < limits.pdfGenerationsPerMonth;
  };

  const hasChatLimit = (): boolean => {
    return limits.chatMessagesPerDay > 0;
  };

  const hasPDFLimit = (): boolean => {
    return limits.pdfGenerationsPerMonth > 0;
  };
  
  const getUsageStats = () => {
    return {
      userPlan,
      chatMessagesToday: getChatMessagesToday(),
      chatMessagesLimit: limits.chatMessagesPerDay,
      pdfGenerationsThisMonth: getPDFGenerationsThisMonth(),
      pdfGenerationsLimit: limits.pdfGenerationsPerMonth
    };
  };

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    canSendChatMessage,
    canGeneratePDF,
    hasChatLimit,
    hasPDFLimit,
    getUsageStats,
    incrementChatMessages
  };
};
