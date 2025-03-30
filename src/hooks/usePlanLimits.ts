
import { useAuth } from "@/components/auth/AuthContext";
import { useState, useEffect } from "react";

// Define the types for plan limits
type Feature = 'basic_access' | 'generate_from_topic' | 'generate_from_youtube' | 'pdf_correction';
type PlanType = 'free' | 'premium' | 'enterprise';

interface UsageLimits {
  [key: string]: number;
}

interface UsageStats {
  [key: string]: number;
}

export function usePlanLimits() {
  const { currentUser } = useAuth();
  const [usageStats, setUsageStats] = useState<UsageStats>({});
  
  // Default limits based on plan type
  const planLimits: Record<PlanType, UsageLimits> = {
    free: {
      pdf_pages: 5,
      documents: 3,
      concurrent_projects: 1,
      ai_requests: 20,
      topic_generation: 5
    },
    premium: {
      pdf_pages: 25,
      documents: 15,
      concurrent_projects: 5,
      ai_requests: 100,
      topic_generation: 50
    },
    enterprise: {
      pdf_pages: 100,
      documents: 50,
      concurrent_projects: 20,
      ai_requests: 500,
      topic_generation: 200
    }
  };

  // Load usage stats from localStorage on component mount
  useEffect(() => {
    try {
      const storedStats = localStorage.getItem('usage_stats');
      if (storedStats) {
        setUsageStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  }, []);

  // Save usage stats to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(usageStats).length > 0) {
      localStorage.setItem('usage_stats', JSON.stringify(usageStats));
    }
  }, [usageStats]);

  // Get the user's current plan
  const userPlan: PlanType = currentUser?.subscription?.type || 'free';

  // Check if the user has reached the limit for a specific feature
  const hasReachedLimit = (featureKey: string): boolean => {
    const limit = planLimits[userPlan][featureKey] || 0;
    const usage = usageStats[featureKey] || 0;
    return usage >= limit;
  };

  // Get the remaining usage for a specific feature
  const getRemainingUsage = (featureKey: string): number => {
    const limit = planLimits[userPlan][featureKey] || 0;
    const usage = usageStats[featureKey] || 0;
    return Math.max(0, limit - usage);
  };

  // Check if the user has access to a specific feature
  const canUseFeature = (featureName: Feature): boolean => {
    if (!currentUser) return false;
    
    const userFeatures = currentUser.subscription?.features || [];
    return userFeatures.includes(featureName);
  };

  // Check if the user can access all modules
  const canAccessAllModules = (): boolean => {
    return userPlan === 'premium' || userPlan === 'enterprise';
  };

  // Increment usage for a specific feature
  const incrementUsage = (featureKey: string): void => {
    setUsageStats(prev => ({
      ...prev,
      [featureKey]: (prev[featureKey] || 0) + 1
    }));
  };

  // Reset usage stats for testing
  const resetUsageStats = (): void => {
    setUsageStats({});
    localStorage.removeItem('usage_stats');
  };

  return {
    userPlan,
    hasReachedLimit,
    getRemainingUsage,
    canUseFeature,
    canAccessAllModules,
    incrementUsage,
    resetUsageStats,
    usageStats
  };
}
