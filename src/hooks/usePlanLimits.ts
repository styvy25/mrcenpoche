
import { useState, useEffect } from 'react';

// Define plan types
export type PlanType = 'free' | 'premium' | 'group';

// Define plan limits
export interface PlanLimits {
  maxChats: number;
  maxDocuments: number;
  maxQuizzes: number;
  offlineMode: boolean;
  pdfExport: boolean;
  youtubeAnalysis: boolean;
  advancedAnalytics: boolean;
  allModules: boolean;
  customDocuments: boolean;
}

// Define usage stats
export interface UsageStats {
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

// Plan limits configuration
const planLimitsConfig: Record<PlanType, PlanLimits> = {
  free: {
    maxChats: 10,
    maxDocuments: 3,
    maxQuizzes: 5,
    offlineMode: false,
    pdfExport: false,
    youtubeAnalysis: false,
    advancedAnalytics: false,
    allModules: false,
    customDocuments: false
  },
  premium: {
    maxChats: Infinity,
    maxDocuments: Infinity,
    maxQuizzes: Infinity,
    offlineMode: true,
    pdfExport: true,
    youtubeAnalysis: true,
    advancedAnalytics: true,
    allModules: true,
    customDocuments: true
  },
  group: {
    maxChats: Infinity,
    maxDocuments: Infinity,
    maxQuizzes: Infinity,
    offlineMode: true,
    pdfExport: true,
    youtubeAnalysis: true,
    advancedAnalytics: true,
    allModules: true,
    customDocuments: true
  }
};

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [limits, setLimits] = useState<PlanLimits>(planLimitsConfig.free);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get stored plan from localStorage
    const storedPlan = localStorage.getItem('userPlan') as PlanType | null;
    if (storedPlan && planLimitsConfig[storedPlan]) {
      setUserPlan(storedPlan);
      setLimits(planLimitsConfig[storedPlan]);
    }
    setIsLoading(false);
  }, []);

  // Function to get today's date in YYYY-MM-DD format for usage tracking
  const getTodayDateKey = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  };

  // Function to get usage for a specific feature
  const getFeatureUsage = (feature: string): number => {
    try {
      const todayKey = getTodayDateKey();
      const storedUsage = JSON.parse(localStorage.getItem('featureUsage') || '{}');
      return storedUsage[todayKey]?.[feature] || 0;
    } catch (error) {
      console.error(`Error getting ${feature} usage:`, error);
      return 0;
    }
  };

  // Function to increment usage for a specific feature
  const incrementFeatureUsage = (feature: string): boolean => {
    try {
      const todayKey = getTodayDateKey();
      const storedUsage = JSON.parse(localStorage.getItem('featureUsage') || '{}');
      
      // Initialize today's usage if not exists
      if (!storedUsage[todayKey]) {
        storedUsage[todayKey] = {};
      }
      
      // Increment feature usage
      storedUsage[todayKey][feature] = (storedUsage[todayKey][feature] || 0) + 1;
      localStorage.setItem('featureUsage', JSON.stringify(storedUsage));
      
      return true;
    } catch (error) {
      console.error(`Error incrementing ${feature} usage:`, error);
      return false;
    }
  };

  const getUsageStats = (): UsageStats => {
    return {
      userPlan,
      chatMessagesLimit: limits.maxChats,
      chatMessagesToday: getFeatureUsage('chatMessages'),
      pdfGenerationsLimit: limits.maxDocuments,
      pdfGenerationsToday: getFeatureUsage('pdfGenerations'),
      quizzesLimit: limits.maxQuizzes,
      quizzesToday: getFeatureUsage('quizzes'),
      youtubeAnalysisLimit: userPlan === 'free' ? 3 : Infinity,
      youtubeAnalysisToday: getFeatureUsage('youtubeAnalysis')
    };
  };

  const updateUserPlan = async (newPlan: PlanType): Promise<boolean> => {
    try {
      setUserPlan(newPlan);
      setLimits(planLimitsConfig[newPlan]);
      localStorage.setItem('userPlan', newPlan);
      return true;
    } catch (error) {
      console.error('Error updating user plan:', error);
      return false;
    }
  };

  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    return !!limits[feature];
  };

  const getRemainingUsage = (feature: 'maxChats' | 'maxDocuments' | 'maxQuizzes'): number => {
    const featureMap = {
      'maxChats': 'chatMessages',
      'maxDocuments': 'pdfGenerations',
      'maxQuizzes': 'quizzes'
    };
    
    const usage = getFeatureUsage(featureMap[feature]);
    const limit = limits[feature];
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - usage);
  };

  const hasChatLimit = (): boolean => {
    return limits.maxChats !== Infinity;
  };

  const hasReachedLimit = (feature: 'maxChats' | 'maxDocuments' | 'maxQuizzes'): boolean => {
    return getRemainingUsage(feature) <= 0;
  };

  const canAccessPremiumContent = (): boolean => {
    return userPlan === 'premium' || userPlan === 'group';
  };

  const canAccessAllModules = (): boolean => {
    return limits.allModules;
  };

  // Chat-specific functions
  const canSendChatMessage = (): boolean => {
    if (userPlan !== 'free') return true;
    return getFeatureUsage('chatMessages') < limits.maxChats;
  };

  const incrementChatMessages = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!canSendChatMessage()) return false;
    return incrementFeatureUsage('chatMessages');
  };

  // PDF-specific functions
  const canGeneratePdf = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!limits.pdfExport) return false;
    return getFeatureUsage('pdfGenerations') < limits.maxDocuments;
  };

  const incrementPdfGenerations = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!canGeneratePdf()) return false;
    return incrementFeatureUsage('pdfGenerations');
  };

  // Quiz-specific functions
  const canTakeQuiz = (): boolean => {
    if (userPlan !== 'free') return true;
    return getFeatureUsage('quizzes') < limits.maxQuizzes;
  };

  const incrementQuizzes = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!canTakeQuiz()) return false;
    return incrementFeatureUsage('quizzes');
  };

  // YouTube analysis functions
  const canAnalyzeYoutube = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!limits.youtubeAnalysis) return false;
    // Free users can analyze 3 YouTube videos per day
    return getFeatureUsage('youtubeAnalysis') < 3;
  };

  const incrementYoutubeAnalysis = (): boolean => {
    if (userPlan !== 'free') return true;
    if (!canAnalyzeYoutube()) return false;
    return incrementFeatureUsage('youtubeAnalysis');
  };

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    getRemainingUsage,
    hasChatLimit,
    hasReachedLimit,
    canAccessPremiumContent,
    canAccessAllModules,
    // Added functions
    getUsageStats,
    canSendChatMessage,
    incrementChatMessages,
    canGeneratePdf,
    incrementPdfGenerations,
    canTakeQuiz,
    incrementQuizzes,
    canAnalyzeYoutube,
    incrementYoutubeAnalysis
  };
};
