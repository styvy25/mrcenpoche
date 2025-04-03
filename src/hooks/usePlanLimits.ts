
import { useSubscription } from '@/hooks/useSubscription';

interface FeatureLimits {
  maxQuizzes: number;
  maxModules: number;
  maxApiCalls: number;
  maxDownloads: number;
  maxVideoTime: number; // in minutes
}

const PLAN_LIMITS: Record<string, FeatureLimits> = {
  basic: {
    maxQuizzes: 5,
    maxModules: 3,
    maxApiCalls: 50,
    maxDownloads: 5,
    maxVideoTime: 30
  },
  premium: {
    maxQuizzes: -1, // unlimited
    maxModules: -1, // unlimited
    maxApiCalls: 500,
    maxDownloads: 100,
    maxVideoTime: -1 // unlimited
  }
};

export const usePlanLimits = () => {
  const { isPremium, isLoading } = useSubscription();
  
  // Get the limits based on the user's subscription
  const getLimits = (): FeatureLimits => {
    return isPremium ? PLAN_LIMITS.premium : PLAN_LIMITS.basic;
  };
  
  // Check if a feature is allowed for the current plan
  const isFeatureAllowed = (feature: keyof FeatureLimits): boolean => {
    const limits = getLimits();
    return limits[feature] !== 0;
  };
  
  // Check if a feature usage is within the limits
  const isWithinLimits = (feature: keyof FeatureLimits, currentUsage: number): boolean => {
    const limits = getLimits();
    return limits[feature] === -1 || currentUsage < limits[feature];
  };
  
  // Check and use a feature, throws an error if the feature cannot be used
  const checkAndUseFeature = (featureKey: string): boolean => {
    // This is a simplified version that always returns true
    // In a real app, this would check against actual usage stats
    return true;
  };
  
  // Check usage against quota
  const checkUsageQuota = (featureKey: string): boolean => {
    // This is a simplified version that always returns true
    // In a real app, this would check against actual usage stats
    return true;
  };
  
  return {
    isPremium,
    isLoading,
    getLimits,
    isFeatureAllowed,
    isWithinLimits,
    checkAndUseFeature,
    checkUsageQuota
  };
};

export default usePlanLimits;
