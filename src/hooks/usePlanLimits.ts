
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
    // This would ideally get the actual usage from a database
    const usageMap = {
      maxChats: 0,
      maxDocuments: 0,
      maxQuizzes: 0
    };
    
    // Get usage from localStorage
    try {
      const storedUsage = JSON.parse(localStorage.getItem('featureUsage') || '{}');
      if (storedUsage[feature]) {
        usageMap[feature] = storedUsage[feature];
      }
    } catch (error) {
      console.error('Error parsing usage data:', error);
    }
    
    const limit = limits[feature];
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - usageMap[feature]);
  };

  const incrementUsage = (feature: 'maxChats' | 'maxDocuments' | 'maxQuizzes'): void => {
    try {
      const storedUsage = JSON.parse(localStorage.getItem('featureUsage') || '{}');
      storedUsage[feature] = (storedUsage[feature] || 0) + 1;
      localStorage.setItem('featureUsage', JSON.stringify(storedUsage));
    } catch (error) {
      console.error('Error updating usage data:', error);
    }
  };

  const resetUsage = (): void => {
    localStorage.removeItem('featureUsage');
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

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    getRemainingUsage,
    incrementUsage,
    resetUsage,
    hasChatLimit,
    hasReachedLimit,
    canAccessPremiumContent,
    canAccessAllModules
  };
};
