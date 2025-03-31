
import { useState, useEffect } from 'react';
import { Feature, PlanType } from './api-keys/types';

// Define the limits for each plan
const PLAN_LIMITS = {
  free: {
    [Feature.AI_CHAT]: 20,
    [Feature.PDF_EXPORT]: 3,
    [Feature.VIDEO_ANALYSIS]: 5,
    [Feature.DOCUMENT_GENERATOR]: 2,
    [Feature.PREMIUM_MODULES]: 0,
    [Feature.QUIZ_ACCESS]: 10,
    [Feature.FORUM_ACCESS]: true
  },
  premium: {
    [Feature.AI_CHAT]: 100,
    [Feature.PDF_EXPORT]: 25,
    [Feature.VIDEO_ANALYSIS]: 50,
    [Feature.DOCUMENT_GENERATOR]: 25,
    [Feature.PREMIUM_MODULES]: true,
    [Feature.QUIZ_ACCESS]: true,
    [Feature.FORUM_ACCESS]: true
  },
  enterprise: {
    [Feature.AI_CHAT]: Number.POSITIVE_INFINITY,
    [Feature.PDF_EXPORT]: Number.POSITIVE_INFINITY,
    [Feature.VIDEO_ANALYSIS]: Number.POSITIVE_INFINITY,
    [Feature.DOCUMENT_GENERATOR]: Number.POSITIVE_INFINITY,
    [Feature.PREMIUM_MODULES]: true,
    [Feature.QUIZ_ACCESS]: true,
    [Feature.FORUM_ACCESS]: true
  }
};

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [usage, setUsage] = useState<Record<string, number>>({
    [Feature.AI_CHAT]: 0,
    [Feature.PDF_EXPORT]: 0,
    [Feature.VIDEO_ANALYSIS]: 0,
    [Feature.DOCUMENT_GENERATOR]: 0,
    [Feature.QUIZ_ACCESS]: 0
  });

  // Load user plan and usage from local storage on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem('user_plan');
    if (storedPlan && (storedPlan === 'free' || storedPlan === 'premium' || storedPlan === 'enterprise')) {
      setUserPlan(storedPlan as PlanType);
    }

    const storedUsage = localStorage.getItem('usage_data');
    if (storedUsage) {
      try {
        setUsage(JSON.parse(storedUsage));
      } catch (e) {
        console.error('Failed to parse usage data:', e);
      }
    }
  }, []);

  // Get the limit for a feature based on user's plan
  const getLimitForFeature = (feature: Feature) => {
    return PLAN_LIMITS[userPlan][feature];
  };

  // Check if a feature has a numerical limit
  const hasLimit = (feature: Feature) => {
    const limit = PLAN_LIMITS[userPlan][feature];
    return typeof limit === 'number' && limit !== Number.POSITIVE_INFINITY;
  };

  // Get current usage for a feature
  const getUsage = (feature: Feature) => {
    return usage[feature] || 0;
  };

  // Check if user has exceeded the limit for a feature
  const hasExceededLimit = (feature: Feature) => {
    if (!hasLimit(feature)) return false;
    return getUsage(feature) >= getLimitForFeature(feature);
  };

  // Increment usage for a feature
  const incrementUsage = (feature: Feature) => {
    const newUsage = { ...usage, [feature]: (usage[feature] || 0) + 1 };
    setUsage(newUsage);
    localStorage.setItem('usage_data', JSON.stringify(newUsage));
    return !hasExceededLimit(feature);
  };

  // Reset usage for a feature
  const resetUsage = (feature: Feature) => {
    const newUsage = { ...usage, [feature]: 0 };
    setUsage(newUsage);
    localStorage.setItem('usage_data', JSON.stringify(newUsage));
  };

  // Update user's plan
  const updateUserPlan = (plan: PlanType) => {
    setUserPlan(plan);
    localStorage.setItem('user_plan', plan);
  };

  // Get remaining usage for a feature
  const getRemainingUsage = (feature: Feature) => {
    if (!hasLimit(feature)) return Number.POSITIVE_INFINITY;
    return Math.max(0, getLimitForFeature(feature) - getUsage(feature));
  };

  // Feature-specific convenience methods
  const canGeneratePdf = () => {
    return !hasExceededLimit(Feature.PDF_EXPORT);
  };

  const canAccessAllModules = () => {
    return userPlan !== 'free';
  };

  const hasChatLimit = () => {
    return hasLimit(Feature.AI_CHAT);
  };

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    hasExceededLimit,
    incrementUsage,
    resetUsage,
    updateUserPlan,
    getRemainingUsage,
    // Feature-specific methods
    canGeneratePdf,
    canAccessAllModules,
    hasChatLimit
  };
};

export { Feature };

