
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from './useSubscription';

export enum Feature {
  AI_CHAT = 'ai_chat',
  PDF_GENERATION = 'pdf_generation',
  YOUTUBE_ANALYSIS = 'youtube_analysis',
  QUIZ_CREATION = 'quiz_creation'
}

// Feature limits per plan
const FEATURE_LIMITS: Record<string, Record<Feature, number>> = {
  free: {
    [Feature.AI_CHAT]: 10,
    [Feature.PDF_GENERATION]: 3,
    [Feature.YOUTUBE_ANALYSIS]: 5, 
    [Feature.QUIZ_CREATION]: 2
  },
  basic: {
    [Feature.AI_CHAT]: 50,
    [Feature.PDF_GENERATION]: 10,
    [Feature.YOUTUBE_ANALYSIS]: 20,
    [Feature.QUIZ_CREATION]: 10
  },
  premium: {
    [Feature.AI_CHAT]: -1, // unlimited
    [Feature.PDF_GENERATION]: -1, // unlimited
    [Feature.YOUTUBE_ANALYSIS]: -1, // unlimited
    [Feature.QUIZ_CREATION]: -1 // unlimited
  },
  pro: {
    [Feature.AI_CHAT]: -1, // unlimited
    [Feature.PDF_GENERATION]: -1, // unlimited
    [Feature.YOUTUBE_ANALYSIS]: -1, // unlimited
    [Feature.QUIZ_CREATION]: -1 // unlimited
  }
};

const STORAGE_KEY = 'feature_usage';

export interface UsePlanLimitsReturn {
  getRemainingUsage: (feature: Feature) => number;
  checkAndUseFeature: (feature: Feature) => Promise<boolean>;
  resetUsage: () => void;
}

export function usePlanLimits(): UsePlanLimitsReturn {
  const { toast } = useToast();
  const { subscriptionStatus } = useSubscription();
  const [usageData, setUsageData] = useState<Record<Feature, number>>(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {
      [Feature.AI_CHAT]: 0,
      [Feature.PDF_GENERATION]: 0,
      [Feature.YOUTUBE_ANALYSIS]: 0,
      [Feature.QUIZ_CREATION]: 0
    };
  });

  const saveUsage = (newUsage: Record<Feature, number>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
    setUsageData(newUsage);
  };

  const getRemainingUsage = (feature: Feature): number => {
    const limit = FEATURE_LIMITS[subscriptionStatus]?.[feature] || 
                  FEATURE_LIMITS.free[feature];
                  
    // Unlimited case
    if (limit === -1) return -1;
    
    const used = usageData[feature] || 0;
    return Math.max(0, limit - used);
  };

  const checkAndUseFeature = async (feature: Feature): Promise<boolean> => {
    const remaining = getRemainingUsage(feature);
    
    // If unlimited
    if (remaining === -1) return true;
    
    if (remaining <= 0) {
      toast({
        title: "Limite atteinte",
        description: `Vous avez atteint votre limite d'utilisation pour cette fonctionnalité. Passez à une offre supérieure pour continuer.`,
        variant: "destructive",
      });
      return false;
    }
    
    // Update usage
    const newUsage = {
      ...usageData,
      [feature]: (usageData[feature] || 0) + 1
    };
    
    saveUsage(newUsage);
    
    // Show warning if close to limit
    if (remaining <= 3 && remaining > 1) {
      toast({
        title: "Limite proche",
        description: `Il vous reste ${remaining - 1} utilisation${remaining - 1 > 1 ? 's' : ''} pour cette fonctionnalité.`,
        variant: "warning",
      });
    }
    
    return true;
  };

  const resetUsage = () => {
    const emptyUsage = {
      [Feature.AI_CHAT]: 0,
      [Feature.PDF_GENERATION]: 0,
      [Feature.YOUTUBE_ANALYSIS]: 0,
      [Feature.QUIZ_CREATION]: 0
    };
    saveUsage(emptyUsage);
    toast({
      title: "Utilisation réinitialisée",
      description: "Vos compteurs d'utilisation ont été réinitialisés.",
    });
  };

  return {
    getRemainingUsage,
    checkAndUseFeature,
    resetUsage
  };
}
