
import { useCallback, useState, useEffect } from 'react';

/**
 * Available features in the application
 */
export enum Feature {
  // Chat features
  CHAT = "chat",
  MAX_CHATS = "maxChats",
  VOICE_MESSAGES = "voiceMessages",
  ATTACHMENTS = "attachments",
  
  // Document features
  PDF_EXPORT = "pdfExport",
  CERTIFICATE = "certificate",
  
  // Analysis features
  YOUTUBE_ANALYSIS = "youtubeAnalysis",
  AI_ASSISTANT = "aiAssistant",
  
  // Premium features
  PREMIUM_MODULES = "premiumModules",
  PREMIUM_QUIZZES = "premiumQuizzes"
}

// Define plan tiers
export enum Plan {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium"
}

// User subscription
export interface UserSubscription {
  plan: Plan;
  expiresAt?: Date;
  features?: Feature[];
}

// Usage tracking interface
export interface UsageStats {
  chatMessages: number;
  pdfGenerations: number;
  youtubeAnalyses: number;
  quizzesTaken: number;
}

// Define features available in each plan
const planFeatures = {
  [Plan.FREE]: [
    Feature.CHAT,
    Feature.PDF_EXPORT,
  ],
  [Plan.BASIC]: [
    Feature.CHAT,
    Feature.MAX_CHATS,
    Feature.PDF_EXPORT,
    Feature.CERTIFICATE,
    Feature.YOUTUBE_ANALYSIS,
  ],
  [Plan.PREMIUM]: [
    Feature.CHAT,
    Feature.MAX_CHATS,
    Feature.VOICE_MESSAGES,
    Feature.ATTACHMENTS,
    Feature.PDF_EXPORT,
    Feature.CERTIFICATE,
    Feature.YOUTUBE_ANALYSIS,
    Feature.AI_ASSISTANT,
    Feature.PREMIUM_MODULES,
    Feature.PREMIUM_QUIZZES,
  ],
};

// Define limits for each plan
const planLimits = {
  [Plan.FREE]: {
    [Feature.MAX_CHATS]: 10,
    pdfGenerations: 3,
    youtubeAnalyses: 2,
    quizzesTaken: 5,
  },
  [Plan.BASIC]: {
    [Feature.MAX_CHATS]: 50,
    pdfGenerations: 10,
    youtubeAnalyses: 10,
    quizzesTaken: 20,
  },
  [Plan.PREMIUM]: {
    [Feature.MAX_CHATS]: -1, // unlimited
    pdfGenerations: -1, // unlimited
    youtubeAnalyses: -1, // unlimited
    quizzesTaken: -1, // unlimited
  },
};

// Local storage key for usage stats
const USAGE_STATS_KEY = 'mrc_usage_stats';

/**
 * Hook for checking user plan limits and features
 */
export function usePlanLimits() {
  // For demo, we'll use Premium tier
  // In a real app, this would come from the user's subscription
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan: Plan.PREMIUM,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  // Track feature usage
  const [usageStats, setUsageStats] = useState<UsageStats>({
    chatMessages: 0,
    pdfGenerations: 0,
    youtubeAnalyses: 0,
    quizzesTaken: 0,
  });

  // Load usage stats from localStorage on component mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem(USAGE_STATS_KEY);
      if (savedStats) {
        setUsageStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  }, []);

  // Save usage stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(USAGE_STATS_KEY, JSON.stringify(usageStats));
  }, [usageStats]);

  /**
   * Check if user has access to a specific feature
   */
  const hasFeatureAccess = useCallback(
    (feature: Feature): boolean => {
      const plan = userSubscription.plan || Plan.FREE;
      return planFeatures[plan].includes(feature);
    },
    [userSubscription.plan]
  );

  /**
   * Get limit for a specific feature
   */
  const getFeatureLimit = useCallback(
    (feature: Feature): number => {
      const plan = userSubscription.plan || Plan.FREE;
      return planLimits[plan]?.[feature] ?? 0;
    },
    [userSubscription.plan]
  );

  /**
   * Check if user is on free plan
   */
  const isFreePlan = useCallback(
    (): boolean => {
      return userSubscription.plan === Plan.FREE;
    },
    [userSubscription.plan]
  );

  /**
   * Check if user is on premium plan
   */
  const isPremiumPlan = useCallback(
    (): boolean => {
      return userSubscription.plan === Plan.PREMIUM;
    },
    [userSubscription.plan]
  );

  // Check if user has reached the chat message limit
  const hasReachedLimit = useCallback(
    (feature: Feature): boolean => {
      const plan = userSubscription.plan;
      const limit = planLimits[plan][feature];
      
      // If limit is -1, it's unlimited
      if (limit === -1) return false;
      
      // Check against the appropriate usage counter
      switch (feature) {
        case Feature.MAX_CHATS:
          return usageStats.chatMessages >= limit;
        case Feature.PDF_EXPORT:
          return usageStats.pdfGenerations >= planLimits[plan].pdfGenerations;
        case Feature.YOUTUBE_ANALYSIS:
          return usageStats.youtubeAnalyses >= planLimits[plan].youtubeAnalyses;
        case Feature.PREMIUM_QUIZZES:
          return usageStats.quizzesTaken >= planLimits[plan].quizzesTaken;
        default:
          return false;
      }
    },
    [userSubscription.plan, usageStats]
  );

  // Get remaining usage for a feature
  const getRemainingUsage = useCallback(
    (feature: Feature): number => {
      const plan = userSubscription.plan;
      
      switch (feature) {
        case Feature.MAX_CHATS:
          const chatLimit = planLimits[plan][feature];
          return chatLimit === -1 ? -1 : chatLimit - usageStats.chatMessages;
        case Feature.PDF_EXPORT:
          const pdfLimit = planLimits[plan].pdfGenerations;
          return pdfLimit === -1 ? -1 : pdfLimit - usageStats.pdfGenerations;
        case Feature.YOUTUBE_ANALYSIS:
          const ytLimit = planLimits[plan].youtubeAnalyses;
          return ytLimit === -1 ? -1 : ytLimit - usageStats.youtubeAnalyses;
        case Feature.PREMIUM_QUIZZES:
          const quizLimit = planLimits[plan].quizzesTaken;
          return quizLimit === -1 ? -1 : quizLimit - usageStats.quizzesTaken;
        default:
          return -1;
      }
    },
    [userSubscription.plan, usageStats]
  );

  // Check if the chat feature has a limit
  const hasChatLimit = useCallback(
    (): boolean => {
      const plan = userSubscription.plan;
      return planLimits[plan][Feature.MAX_CHATS] !== -1;
    },
    [userSubscription.plan]
  );

  // Increment chat messages count
  const incrementChatMessages = useCallback(
    (): boolean => {
      if (hasReachedLimit(Feature.MAX_CHATS)) {
        return false;
      }
      
      setUsageStats(prev => ({
        ...prev,
        chatMessages: prev.chatMessages + 1
      }));
      
      return true;
    },
    [hasReachedLimit]
  );

  // Check if user can generate PDF
  const canGeneratePdf = useCallback(
    (): boolean => {
      const plan = userSubscription.plan;
      const limit = planLimits[plan].pdfGenerations;
      
      // If limit is -1, it's unlimited
      if (limit === -1) return true;
      
      return usageStats.pdfGenerations < limit;
    },
    [userSubscription.plan, usageStats.pdfGenerations]
  );

  // Increment PDF generations count
  const incrementPdfGenerations = useCallback(
    (): boolean => {
      if (!canGeneratePdf()) {
        return false;
      }
      
      setUsageStats(prev => ({
        ...prev,
        pdfGenerations: prev.pdfGenerations + 1
      }));
      
      return true;
    },
    [canGeneratePdf]
  );

  // Check if user can analyze YouTube videos
  const canAnalyzeYoutube = useCallback(
    (): boolean => {
      const plan = userSubscription.plan;
      const limit = planLimits[plan].youtubeAnalyses;
      
      // If limit is -1, it's unlimited
      if (limit === -1) return true;
      
      return usageStats.youtubeAnalyses < limit;
    },
    [userSubscription.plan, usageStats.youtubeAnalyses]
  );

  // Increment YouTube analyses count
  const incrementYoutubeAnalysis = useCallback(
    (): boolean => {
      if (!canAnalyzeYoutube()) {
        return false;
      }
      
      setUsageStats(prev => ({
        ...prev,
        youtubeAnalyses: prev.youtubeAnalyses + 1
      }));
      
      return true;
    },
    [canAnalyzeYoutube]
  );

  // Check if user can take quizzes
  const canTakeQuiz = useCallback(
    (): boolean => {
      const plan = userSubscription.plan;
      const limit = planLimits[plan].quizzesTaken;
      
      // If limit is -1, it's unlimited
      if (limit === -1) return true;
      
      return usageStats.quizzesTaken < limit;
    },
    [userSubscription.plan, usageStats.quizzesTaken]
  );

  // Increment quizzes taken count
  const incrementQuizzes = useCallback(
    (): boolean => {
      if (!canTakeQuiz()) {
        return false;
      }
      
      setUsageStats(prev => ({
        ...prev,
        quizzesTaken: prev.quizzesTaken + 1
      }));
      
      return true;
    },
    [canTakeQuiz]
  );

  // Check if user can access all modules
  const canAccessAllModules = useCallback(
    (): boolean => {
      return userSubscription.plan === Plan.PREMIUM || userSubscription.plan === Plan.BASIC;
    },
    [userSubscription.plan]
  );

  // Determine if user can use a specific feature
  const canUseFeature = useCallback(
    (feature: Feature): boolean => {
      if (!hasFeatureAccess(feature)) {
        return false;
      }

      // For features with usage limits, check if limit is reached
      switch (feature) {
        case Feature.MAX_CHATS:
          return !hasReachedLimit(Feature.MAX_CHATS);
        case Feature.PDF_EXPORT:
          return canGeneratePdf();
        case Feature.YOUTUBE_ANALYSIS:
          return canAnalyzeYoutube();
        case Feature.PREMIUM_QUIZZES:
          return canTakeQuiz();
        default:
          return true;
      }
    },
    [hasFeatureAccess, hasReachedLimit, canGeneratePdf, canAnalyzeYoutube, canTakeQuiz]
  );

  // Update user plan for payment flow
  const updateUserPlan = useCallback(
    (newPlan: Plan): void => {
      setUserSubscription(prev => ({
        ...prev,
        plan: newPlan,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }));
    },
    []
  );

  // Get current user plan
  const userPlan = userSubscription.plan;

  return {
    userSubscription,
    hasFeatureAccess,
    getFeatureLimit,
    isFreePlan,
    isPremiumPlan,
    hasReachedLimit,
    getRemainingUsage,
    hasChatLimit,
    incrementChatMessages,
    canGeneratePdf,
    incrementPdfGenerations,
    canAnalyzeYoutube,
    incrementYoutubeAnalysis,
    canTakeQuiz,
    incrementQuizzes,
    canAccessAllModules,
    canUseFeature,
    updateUserPlan,
    userPlan
  };
}
