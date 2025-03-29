
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type PlanType = 'free' | 'premium';

export interface PlanLimits {
  chatMessages: number;
  pdfGenerations: number;
  quizzes: number;
  youtubeAnalysis: number;
}

interface UsageStats {
  userPlan: PlanType;
  chatMessagesLimit: number;
  chatMessagesToday: number;
  pdfGenerationsLimit: number;
  pdfGenerationsToday: number;
  quizzesLimit: number;
  quizzesToday: number;
  youtubeAnalysisLimit: number;
  youtubeAnalysisToday: number;
}

const PLAN_CONFIGS: Record<PlanType, PlanLimits> = {
  free: {
    chatMessages: 20,
    pdfGenerations: 5,
    quizzes: 10,
    youtubeAnalysis: 3
  },
  premium: {
    chatMessages: 1000,
    pdfGenerations: 50,
    quizzes: 200,
    youtubeAnalysis: 30
  }
};

// Initialize local storage with usage data
const initializeUsageData = () => {
  const today = new Date().toISOString().split('T')[0];
  const existingData = localStorage.getItem('mrc_usage_data');
  
  if (!existingData || JSON.parse(existingData).date !== today) {
    const initialData = {
      date: today,
      chatMessages: 0,
      pdfGenerations: 0,
      quizzes: 0,
      youtubeAnalysis: 0
    };
    localStorage.setItem('mrc_usage_data', JSON.stringify(initialData));
    return initialData;
  }
  
  return JSON.parse(existingData);
};

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [usageData, setUsageData] = useState(() => initializeUsageData());
  const [isLoading, setIsLoading] = useState(true);
  const [limits, setLimits] = useState<PlanLimits>(PLAN_CONFIGS.free);
  const { toast } = useToast();

  // Initialize the user's plan and limits from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem('mrc_user_plan');
    const plan: PlanType = (storedPlan === 'premium') ? 'premium' : 'free';
    setUserPlan(plan);
    setLimits(PLAN_CONFIGS[plan]);
    setIsLoading(false);
    
    // Re-initialize usage data at the start of a new day
    setUsageData(initializeUsageData());
  }, []);
  
  // Update localStorage when usage data changes
  useEffect(() => {
    localStorage.setItem('mrc_usage_data', JSON.stringify(usageData));
  }, [usageData]);

  // Update user plan
  const updateUserPlan = async (newPlan: PlanType): Promise<boolean> => {
    try {
      localStorage.setItem('mrc_user_plan', newPlan);
      setUserPlan(newPlan);
      setLimits(PLAN_CONFIGS[newPlan]);
      return true;
    } catch (error) {
      console.error('Error updating user plan:', error);
      return false;
    }
  };

  // Check if user can use a specific feature
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    const limit = limits[feature];
    const used = usageData[feature as keyof typeof usageData];
    return used < limit;
  };

  // Increment usage counters
  const incrementUsage = (feature: keyof PlanLimits): boolean => {
    if (!canUseFeature(feature)) {
      toast({
        title: "Limite atteinte",
        description: `Vous avez atteint votre limite quotidienne pour cette fonctionnalité. Passez à Premium pour un accès illimité.`,
        variant: "destructive",
      });
      return false;
    }
    
    setUsageData(prev => ({
      ...prev,
      [feature]: prev[feature as keyof typeof prev] + 1
    }));
    
    return true;
  };

  // Helper methods for specific features
  const canSendChatMessage = () => canUseFeature('chatMessages');
  const canGeneratePdf = () => canUseFeature('pdfGenerations');
  const canTakeQuiz = () => canUseFeature('quizzes');
  const canAnalyzeYoutube = () => canUseFeature('youtubeAnalysis');
  
  const incrementChatMessages = () => incrementUsage('chatMessages');
  const incrementPdfGenerations = () => incrementUsage('pdfGenerations');
  const incrementQuizzes = () => incrementUsage('quizzes');
  const incrementYoutubeAnalysis = () => incrementUsage('youtubeAnalysis');
  
  // Get current usage statistics
  const getUsageStats = (): UsageStats => {
    return {
      userPlan,
      chatMessagesLimit: limits.chatMessages,
      chatMessagesToday: usageData.chatMessages,
      pdfGenerationsLimit: limits.pdfGenerations,
      pdfGenerationsToday: usageData.pdfGenerations,
      quizzesLimit: limits.quizzes,
      quizzesToday: usageData.quizzes,
      youtubeAnalysisLimit: limits.youtubeAnalysis,
      youtubeAnalysisToday: usageData.youtubeAnalysis
    };
  };
  
  // Check if user can access all modules
  const canAccessAllModules = () => userPlan === 'premium';

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    canSendChatMessage,
    canGeneratePdf,
    canTakeQuiz,
    canAnalyzeYoutube,
    incrementChatMessages,
    incrementPdfGenerations,
    incrementQuizzes,
    incrementYoutubeAnalysis,
    getUsageStats,
    canAccessAllModules
  };
};
