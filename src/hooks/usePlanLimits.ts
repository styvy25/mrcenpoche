
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/lib/supabase';

export type PlanType = 'free' | 'premium';

export interface PlanLimits {
  chatMessagesPerDay: number;
  pdfGenerationsPerMonth: number;
  quizzesPerDay?: number;
}

const FREE_PLAN_LIMITS: PlanLimits = {
  chatMessagesPerDay: 10,
  pdfGenerationsPerMonth: 3,
  quizzesPerDay: 5,
};

const PREMIUM_PLAN_LIMITS: PlanLimits = {
  chatMessagesPerDay: -1, // unlimited
  pdfGenerationsPerMonth: -1, // unlimited
  quizzesPerDay: -1, // unlimited
};

interface UsageData {
  chatMessagesToday: number;
  pdfGenerationsThisMonth: number;
  quizzesToday: number;
}

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [limits, setLimits] = useState<PlanLimits>(FREE_PLAN_LIMITS);
  const [usage, setUsage] = useState<UsageData>({
    chatMessagesToday: 0,
    pdfGenerationsThisMonth: 0,
    quizzesToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load user plan and usage from localStorage on initial render
  useEffect(() => {
    const loadPlanAndUsage = async () => {
      try {
        // First check localStorage for cached data
        const storedPlan = localStorage.getItem('userPlan');
        if (storedPlan) {
          setUserPlan(storedPlan as PlanType);
          setLimits(storedPlan === 'premium' ? PREMIUM_PLAN_LIMITS : FREE_PLAN_LIMITS);
        }

        // Get usage data from localStorage
        const today = new Date().toISOString().split('T')[0];
        const month = new Date().toISOString().slice(0, 7);
        
        const chatUsage = JSON.parse(localStorage.getItem('chatUsage') || '{}');
        const pdfUsage = JSON.parse(localStorage.getItem('pdfUsage') || '{}');
        const quizUsage = JSON.parse(localStorage.getItem('quizUsage') || '{}');
        
        setUsage({
          chatMessagesToday: chatUsage[today] || 0,
          pdfGenerationsThisMonth: Object.entries(pdfUsage)
            .filter(([key]) => key.startsWith(month))
            .reduce((sum, [_, count]) => sum + (count as number), 0),
          quizzesToday: quizUsage[today] || 0,
        });

        // If user is logged in, fetch plan from Supabase
        if (user) {
          const { data, error } = await supabase
            .from('user_subscriptions')
            .select('plan_type, is_active')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching subscription:', error);
          } else if (data) {
            const plan = data.is_active && data.plan_type === 'premium' ? 'premium' : 'free';
            setUserPlan(plan);
            setLimits(plan === 'premium' ? PREMIUM_PLAN_LIMITS : FREE_PLAN_LIMITS);
            localStorage.setItem('userPlan', plan);
          }
        }
      } catch (error) {
        console.error('Error loading plan data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlanAndUsage();
  }, [user]);

  // Update user plan in both state and localStorage
  const updateUserPlan = async (newPlan: PlanType): Promise<boolean> => {
    try {
      setUserPlan(newPlan);
      setLimits(newPlan === 'premium' ? PREMIUM_PLAN_LIMITS : FREE_PLAN_LIMITS);
      localStorage.setItem('userPlan', newPlan);
      
      // If user is logged in, update plan in Supabase
      if (user) {
        const { error } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: user.id,
            plan_type: newPlan,
            is_active: true,
          });

        if (error) {
          console.error('Error updating subscription:', error);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error updating plan:', error);
      return false;
    }
  };

  // Check if user can use a feature
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    if (userPlan === 'premium') return true;
    
    const limit = limits[feature];
    if (limit === -1) return true; // Unlimited
    
    if (feature === 'chatMessagesPerDay') {
      return usage.chatMessagesToday < limit;
    } else if (feature === 'pdfGenerationsPerMonth') {
      return usage.pdfGenerationsThisMonth < limit;
    } else if (feature === 'quizzesPerDay') {
      return usage.quizzesToday < limit;
    }
    
    return false;
  };

  // Increment chat message count
  const incrementChatMessages = (): boolean => {
    const feature = 'chatMessagesPerDay';
    if (!canUseFeature(feature)) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de messages. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const chatUsage = JSON.parse(localStorage.getItem('chatUsage') || '{}');
    chatUsage[today] = (chatUsage[today] || 0) + 1;
    localStorage.setItem('chatUsage', JSON.stringify(chatUsage));
    
    setUsage(prev => ({
      ...prev,
      chatMessagesToday: prev.chatMessagesToday + 1,
    }));
    
    return true;
  };

  // Increment PDF generation count
  const incrementPdfGenerations = (): boolean => {
    const feature = 'pdfGenerationsPerMonth';
    if (!canUseFeature(feature)) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite mensuelle de générations de PDF. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const pdfUsage = JSON.parse(localStorage.getItem('pdfUsage') || '{}');
    pdfUsage[today] = (pdfUsage[today] || 0) + 1;
    localStorage.setItem('pdfUsage', JSON.stringify(pdfUsage));
    
    setUsage(prev => ({
      ...prev,
      pdfGenerationsThisMonth: prev.pdfGenerationsThisMonth + 1,
    }));
    
    return true;
  };

  // Increment quiz count
  const incrementQuizzes = (): boolean => {
    const feature = 'quizzesPerDay';
    if (!canUseFeature(feature)) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de quiz. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const quizUsage = JSON.parse(localStorage.getItem('quizUsage') || '{}');
    quizUsage[today] = (quizUsage[today] || 0) + 1;
    localStorage.setItem('quizUsage', JSON.stringify(quizUsage));
    
    setUsage(prev => ({
      ...prev,
      quizzesToday: prev.quizzesToday + 1,
    }));
    
    return true;
  };

  // Check if user can send a chat message
  const canSendChatMessage = (): boolean => {
    return canUseFeature('chatMessagesPerDay');
  };

  // Check if user can generate a PDF
  const canGeneratePdf = (): boolean => {
    return canUseFeature('pdfGenerationsPerMonth');
  };

  // Check if user can take a quiz
  const canTakeQuiz = (): boolean => {
    return canUseFeature('quizzesPerDay');
  };

  // Check if user has a chat message limit
  const hasChatLimit = (): boolean => {
    return userPlan === 'free' && limits.chatMessagesPerDay !== -1;
  };

  // Get usage statistics
  const getUsageStats = () => {
    return {
      userPlan,
      chatMessagesToday: usage.chatMessagesToday,
      chatMessagesLimit: limits.chatMessagesPerDay,
      pdfGenerationsThisMonth: usage.pdfGenerationsThisMonth,
      pdfGenerationsLimit: limits.pdfGenerationsPerMonth,
      quizzesToday: usage.quizzesToday,
      quizzesLimit: limits.quizzesPerDay,
    };
  };

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    incrementChatMessages,
    incrementPdfGenerations,
    incrementQuizzes,
    canSendChatMessage,
    canGeneratePdf,
    canTakeQuiz,
    hasChatLimit,
    getUsageStats,
  };
};
