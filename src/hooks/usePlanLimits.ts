
import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";

// Define all the features available in the application
export enum Feature {
  CHAT = "chat",
  AI_CHAT = "aiChat",
  PDF_EXPORT = "pdfExport",
  YOUTUBE_ANALYSIS = "youtubeAnalysis",
  MODULE_ACCESS = "moduleAccess",
  DOCUMENT_GENERATION = "documentGeneration",
  QUIZ_ADVANCED = "quizAdvanced"
}

export type Plan = "free" | "premium";

export interface FeatureUsage {
  limit: number;
  used: number;
}

export const usePlanLimits = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [userPlan, setUserPlan] = useState<Plan>(
    currentUser?.subscription?.plan || "free"
  );
  
  // Track feature usage
  const [usage, setUsage] = useState<Record<Feature, number>>({
    [Feature.CHAT]: 0,
    [Feature.AI_CHAT]: 0,
    [Feature.PDF_EXPORT]: 0,
    [Feature.YOUTUBE_ANALYSIS]: 0,
    [Feature.MODULE_ACCESS]: 0,
    [Feature.DOCUMENT_GENERATION]: 0,
    [Feature.QUIZ_ADVANCED]: 0
  });

  // Define limits based on plan
  const planLimits: Record<Plan, Record<Feature, number>> = {
    free: {
      [Feature.CHAT]: 10,
      [Feature.AI_CHAT]: 5,
      [Feature.PDF_EXPORT]: 2,
      [Feature.YOUTUBE_ANALYSIS]: 3,
      [Feature.MODULE_ACCESS]: 3,
      [Feature.DOCUMENT_GENERATION]: 1,
      [Feature.QUIZ_ADVANCED]: 5
    },
    premium: {
      [Feature.CHAT]: Infinity,
      [Feature.AI_CHAT]: Infinity,
      [Feature.PDF_EXPORT]: Infinity,
      [Feature.YOUTUBE_ANALYSIS]: Infinity,
      [Feature.MODULE_ACCESS]: Infinity,
      [Feature.DOCUMENT_GENERATION]: Infinity,
      [Feature.QUIZ_ADVANCED]: Infinity
    }
  };

  // Check if user has access to a feature
  const hasFeatureAccess = useCallback(
    (feature: Feature): boolean => {
      if (!isAuthenticated) return false;
      return usage[feature] < planLimits[userPlan][feature];
    },
    [isAuthenticated, userPlan, usage]
  );

  // Get limit for a feature
  const getLimitForFeature = useCallback(
    (feature: Feature): number => {
      return planLimits[userPlan][feature];
    },
    [userPlan]
  );

  // Check if feature has a limit
  const hasLimit = useCallback(
    (feature: Feature): boolean => {
      return planLimits[userPlan][feature] !== Infinity;
    },
    [userPlan]
  );

  // Get usage for a feature
  const getUsage = useCallback(
    (feature: Feature): number => {
      return usage[feature];
    },
    [usage]
  );

  // Increment usage counter for a feature
  const incrementUsage = useCallback(
    (feature: Feature): void => {
      setUsage((prev) => ({
        ...prev,
        [feature]: prev[feature] + 1
      }));
    },
    []
  );

  // Reset usage counter for a feature
  const resetUsage = useCallback(
    (feature: Feature): void => {
      setUsage((prev) => ({
        ...prev,
        [feature]: 0
      }));
    },
    []
  );

  // Reset all usage counters
  const resetAllUsage = useCallback((): void => {
    setUsage({
      [Feature.CHAT]: 0,
      [Feature.AI_CHAT]: 0,
      [Feature.PDF_EXPORT]: 0,
      [Feature.YOUTUBE_ANALYSIS]: 0,
      [Feature.MODULE_ACCESS]: 0,
      [Feature.DOCUMENT_GENERATION]: 0,
      [Feature.QUIZ_ADVANCED]: 0
    });
  }, []);

  // Specific incrementers for each feature
  const incrementChatMessages = useCallback((): void => {
    incrementUsage(Feature.CHAT);
  }, [incrementUsage]);

  const incrementAIChat = useCallback((): void => {
    incrementUsage(Feature.AI_CHAT);
  }, [incrementUsage]);

  const incrementPDFExport = useCallback((): void => {
    incrementUsage(Feature.PDF_EXPORT);
  }, [incrementUsage]);

  const incrementYouTubeAnalysis = useCallback((): void => {
    incrementUsage(Feature.YOUTUBE_ANALYSIS);
  }, [incrementUsage]);

  // Update user's plan
  const updateUserPlan = useCallback((plan: Plan): void => {
    setUserPlan(plan);
  }, []);

  // Remaining uses calculation
  const getRemainingUses = useCallback(
    (feature: Feature): number => {
      const limit = planLimits[userPlan][feature];
      if (limit === Infinity) return Infinity;
      return Math.max(0, limit - usage[feature]);
    },
    [userPlan, usage]
  );

  // Check if user can use feature based on limits
  const canUseFeature = useCallback(
    (feature: Feature): boolean => {
      return getRemainingUses(feature) > 0;
    },
    [getRemainingUses]
  );

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    hasFeatureAccess,
    incrementChatMessages,
    incrementAIChat,
    incrementPDFExport,
    incrementYouTubeAnalysis,
    incrementUsage,
    resetUsage,
    resetAllUsage,
    updateUserPlan,
    getRemainingUses,
    canUseFeature
  };
};
