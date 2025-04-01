
import { useState, useEffect } from 'react';
import { useSubscription } from './useSubscription';
import { Feature } from '../services/paymentService';

interface PlanLimitsResult {
  canUseFeature: (feature: Feature) => boolean;
  getRemainingUsage: (feature: Feature) => number;
  getMaxUsage: (feature: Feature) => number;
}

export const usePlanLimits = (): PlanLimitsResult => {
  const { isPremium, isBasic, plan } = useSubscription();
  const [featureLimits, setFeatureLimits] = useState<Record<Feature, number>>({
    [Feature.PDF_EXPORT]: 5,
    [Feature.AI_CHAT]: 10,
    [Feature.VIDEO_ANALYSIS]: 3,
    [Feature.PREMIUM_MODULES]: 2
  });
  
  const [usageCounts, setUsageCounts] = useState<Record<Feature, number>>({
    [Feature.PDF_EXPORT]: 0,
    [Feature.AI_CHAT]: 0,
    [Feature.VIDEO_ANALYSIS]: 0,
    [Feature.PREMIUM_MODULES]: 0
  });

  useEffect(() => {
    // In a real implementation, this would fetch usage data from the backend
    const fetchUsageData = async () => {
      // Mock implementation
      setUsageCounts({
        [Feature.PDF_EXPORT]: 2,
        [Feature.AI_CHAT]: 5,
        [Feature.VIDEO_ANALYSIS]: 1,
        [Feature.PREMIUM_MODULES]: 0
      });
    };

    fetchUsageData();
  }, []);

  const canUseFeature = (feature: Feature): boolean => {
    // Premium users can always use all features
    if (isPremium) return true;
    
    // For free plan users, check against limits
    return usageCounts[feature] < featureLimits[feature];
  };

  const getRemainingUsage = (feature: Feature): number => {
    if (isPremium) return Infinity;
    return Math.max(0, featureLimits[feature] - usageCounts[feature]);
  };

  const getMaxUsage = (feature: Feature): number => {
    if (isPremium) return Infinity;
    return featureLimits[feature];
  };

  return {
    canUseFeature,
    getRemainingUsage,
    getMaxUsage
  };
};
