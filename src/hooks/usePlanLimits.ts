
import { useCallback } from 'react';

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
  },
  [Plan.BASIC]: {
    [Feature.MAX_CHATS]: 50,
  },
  [Plan.PREMIUM]: {
    [Feature.MAX_CHATS]: -1, // unlimited
  },
};

/**
 * Hook for checking user plan limits and features
 */
export function usePlanLimits() {
  // For demo, we'll use Premium tier
  // In a real app, this would come from the user's subscription
  const userSubscription: UserSubscription = {
    plan: Plan.PREMIUM,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };

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

  return {
    userSubscription,
    hasFeatureAccess,
    getFeatureLimit,
    isFreePlan,
    isPremiumPlan,
  };
}
