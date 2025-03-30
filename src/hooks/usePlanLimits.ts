
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

export type Feature = 'maxChats' | 'maxDocuments' | 'maxQuizzes' | 'youtubeAnalyses';
export type PlanType = 'free' | 'basic' | 'premium';

interface UsageStats {
  chatMessagesToday: number;
  chatMessagesLimit: number;
  documentsGeneratedToday: number;
  documentsLimit: number;
  quizzesCompletedToday: number;
  quizzesLimit: number;
  youtubeAnalysesToday: number;
  youtubeAnalysesLimit: number;
  userPlan: PlanType;
}

// Default limits by plan
const PLAN_LIMITS = {
  free: {
    maxChats: 10,
    maxDocuments: 2,
    maxQuizzes: 3,
    youtubeAnalyses: 2
  },
  basic: {
    maxChats: 50,
    maxDocuments: 5,
    maxQuizzes: 10,
    youtubeAnalyses: 5
  },
  premium: {
    maxChats: Infinity,
    maxDocuments: Infinity,
    maxQuizzes: Infinity,
    youtubeAnalyses: Infinity
  }
};

export const usePlanLimits = () => {
  const { isAuthenticated } = useAuth();
  const [usageStats, setUsageStats] = useState<UsageStats>({
    chatMessagesToday: 0,
    chatMessagesLimit: PLAN_LIMITS.free.maxChats,
    documentsGeneratedToday: 0,
    documentsLimit: PLAN_LIMITS.free.maxDocuments,
    quizzesCompletedToday: 0,
    quizzesLimit: PLAN_LIMITS.free.maxQuizzes,
    youtubeAnalysesToday: 0,
    youtubeAnalysesLimit: PLAN_LIMITS.free.youtubeAnalyses,
    userPlan: 'free'
  });

  const isPremium = usageStats.userPlan === 'premium';

  // Initialize usage stats from localStorage on mount
  useEffect(() => {
    const storedStats = localStorage.getItem('mrc_usage_stats');
    const storedDate = localStorage.getItem('mrc_usage_date');
    
    // Reset counts if it's a new day
    const today = new Date().toDateString();
    if (storedDate !== today) {
      const updatedStats = {
        ...usageStats,
        chatMessagesToday: 0,
        documentsGeneratedToday: 0,
        quizzesCompletedToday: 0,
        youtubeAnalysesToday: 0,
      };
      setUsageStats(updatedStats);
      localStorage.setItem('mrc_usage_stats', JSON.stringify(updatedStats));
      localStorage.setItem('mrc_usage_date', today);
      return;
    }
    
    if (storedStats) {
      setUsageStats(JSON.parse(storedStats));
    }
  }, []);

  // Save to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('mrc_usage_stats', JSON.stringify(usageStats));
  }, [usageStats]);

  // Check if user has reached the limit for a specific feature
  const hasReachedLimit = useCallback((feature: Feature): boolean => {
    if (!isAuthenticated) return false;
    
    if (isPremium) return false;
    
    switch (feature) {
      case 'maxChats':
        return usageStats.chatMessagesToday >= usageStats.chatMessagesLimit;
      case 'maxDocuments':
        return usageStats.documentsGeneratedToday >= usageStats.documentsLimit;
      case 'maxQuizzes':
        return usageStats.quizzesCompletedToday >= usageStats.quizzesLimit;
      case 'youtubeAnalyses':
        return usageStats.youtubeAnalysesToday >= usageStats.youtubeAnalysesLimit;
      default:
        return false;
    }
  }, [isAuthenticated, isPremium, usageStats]);

  // Get remaining usage for a specific feature
  const getRemainingUsage = useCallback((feature: Feature): number => {
    if (!isAuthenticated) return 0;
    
    if (isPremium) return Infinity;
    
    switch (feature) {
      case 'maxChats':
        return Math.max(0, usageStats.chatMessagesLimit - usageStats.chatMessagesToday);
      case 'maxDocuments':
        return Math.max(0, usageStats.documentsLimit - usageStats.documentsGeneratedToday);
      case 'maxQuizzes':
        return Math.max(0, usageStats.quizzesLimit - usageStats.quizzesCompletedToday);
      case 'youtubeAnalyses':
        return Math.max(0, usageStats.youtubeAnalysesLimit - usageStats.youtubeAnalysesToday);
      default:
        return 0;
    }
  }, [isAuthenticated, isPremium, usageStats]);

  // Increment usage for chat messages
  const incrementChatMessages = useCallback((): boolean => {
    if (hasReachedLimit('maxChats')) return false;
    
    setUsageStats(prev => ({
      ...prev,
      chatMessagesToday: prev.chatMessagesToday + 1
    }));
    
    return true;
  }, [hasReachedLimit]);

  // Increment usage for PDF generations
  const incrementPdfGenerations = useCallback((): boolean => {
    if (hasReachedLimit('maxDocuments')) return false;
    
    setUsageStats(prev => ({
      ...prev,
      documentsGeneratedToday: prev.documentsGeneratedToday + 1
    }));
    
    return true;
  }, [hasReachedLimit]);

  // Increment usage for quizzes
  const incrementQuizzes = useCallback((): boolean => {
    if (hasReachedLimit('maxQuizzes')) return false;
    
    setUsageStats(prev => ({
      ...prev,
      quizzesCompletedToday: prev.quizzesCompletedToday + 1
    }));
    
    return true;
  }, [hasReachedLimit]);

  // Increment usage for YouTube analyses
  const incrementYoutubeAnalyses = useCallback((): boolean => {
    if (hasReachedLimit('youtubeAnalyses')) return false;
    
    setUsageStats(prev => ({
      ...prev,
      youtubeAnalysesToday: prev.youtubeAnalysesToday + 1
    }));
    
    return true;
  }, [hasReachedLimit]);

  // Update user plan
  const updateUserPlan = useCallback((newPlan: PlanType) => {
    setUsageStats(prev => {
      const updatedLimits = {
        ...prev,
        userPlan: newPlan,
        chatMessagesLimit: PLAN_LIMITS[newPlan].maxChats,
        documentsLimit: PLAN_LIMITS[newPlan].maxDocuments,
        quizzesLimit: PLAN_LIMITS[newPlan].maxQuizzes,
        youtubeAnalysesLimit: PLAN_LIMITS[newPlan].youtubeAnalyses
      };
      
      localStorage.setItem('mrc_usage_stats', JSON.stringify(updatedLimits));
      return updatedLimits;
    });
  }, []);

  // Check if user can send chat messages
  const canSendChatMessage = useCallback((): boolean => {
    return !hasReachedLimit('maxChats');
  }, [hasReachedLimit]);

  // Check if user can generate PDFs
  const canGeneratePdf = useCallback((): boolean => {
    return !hasReachedLimit('maxDocuments');
  }, [hasReachedLimit]);

  // Check if user can take quizzes
  const canTakeQuiz = useCallback((): boolean => {
    return !hasReachedLimit('maxQuizzes');
  }, [hasReachedLimit]);

  // Check if user can analyze YouTube videos
  const canAnalyzeYoutube = useCallback((): boolean => {
    return !hasReachedLimit('youtubeAnalyses');
  }, [hasReachedLimit]);

  // Check if user has chat limit
  const hasChatLimit = useCallback((): boolean => {
    return usageStats.userPlan !== 'premium';
  }, [usageStats.userPlan]);

  // Get usage stats
  const getUsageStats = useCallback((): UsageStats => {
    return usageStats;
  }, [usageStats]);

  // Check if feature is available for current plan
  const canUseFeature = useCallback((feature: string): boolean => {
    if (usageStats.userPlan === 'premium') return true;
    
    // Define features available for each plan
    const featuresByPlan = {
      free: ['chat', 'offlineMode', 'basicQuizzes'],
      basic: ['chat', 'offlineMode', 'basicQuizzes', 'pdfGeneration', 'youtubeAnalysis']
    };
    
    // @ts-ignore
    return featuresByPlan[usageStats.userPlan]?.includes(feature) || false;
  }, [usageStats.userPlan]);

  return {
    isPremium,
    hasReachedLimit,
    getRemainingUsage,
    incrementChatMessages,
    incrementPdfGenerations,
    incrementQuizzes,
    incrementYoutubeAnalyses,
    updateUserPlan,
    userPlan: usageStats.userPlan,
    canSendChatMessage,
    canGeneratePdf,
    canTakeQuiz,
    canAnalyzeYoutube,
    hasChatLimit,
    getUsageStats,
    canUseFeature
  };
};
