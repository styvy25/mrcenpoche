
import { useState, useEffect } from 'react';
import { useSubscription } from './useSubscription';

export type Feature = 
  | 'ai-chat'
  | 'document-creation'
  | 'advanced-modules'
  | 'quiz-attempts'
  | 'exports'
  | 'api-access';

interface FeatureLimit {
  monthly: number;
  used: number;
  unlimited: boolean;
}

export interface PlanLimits {
  limits: Record<Feature, FeatureLimit>;
  isLoading: boolean;
  checkAndUseFeature: (feature: Feature) => { canUse: boolean; remaining: number };
}

export const usePlanLimits = (): PlanLimits => {
  const { isPremium, isBasic = !isPremium } = useSubscription();
  const [limits, setLimits] = useState<Record<Feature, FeatureLimit>>({
    'ai-chat': { monthly: isBasic ? 10 : 999, used: 0, unlimited: !isBasic },
    'document-creation': { monthly: isBasic ? 5 : 999, used: 0, unlimited: !isBasic },
    'advanced-modules': { monthly: isBasic ? 0 : 999, used: 0, unlimited: !isBasic },
    'quiz-attempts': { monthly: isBasic ? 3 : 999, used: 0, unlimited: !isBasic },
    'exports': { monthly: isBasic ? 2 : 999, used: 0, unlimited: !isBasic },
    'api-access': { monthly: isBasic ? 0 : 100, used: 0, unlimited: false }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading limits from API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const checkAndUseFeature = (feature: Feature) => {
    const featureLimit = limits[feature];
    const remaining = featureLimit.monthly - featureLimit.used;
    const canUse = featureLimit.unlimited || remaining > 0;

    if (canUse && !featureLimit.unlimited) {
      // Update the used count
      setLimits(prev => ({
        ...prev,
        [feature]: {
          ...prev[feature],
          used: prev[feature].used + 1
        }
      }));
    }

    return { canUse, remaining };
  };

  return {
    limits,
    isLoading,
    checkAndUseFeature
  };
};
