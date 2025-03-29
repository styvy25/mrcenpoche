
import { useState, useEffect } from 'react';

// Types for plan management
export type PlanType = 'free' | 'premium';

export interface PlanLimits {
  chatMessages: {
    daily: number;
    used: number;
  };
  pdfGenerations: {
    daily: number;
    used: number;
  };
  quizAttempts: {
    daily: number;
    used: number;
  };
}

// Define the limits for each plan
const PLAN_DEFINITIONS = {
  free: {
    chatMessages: {
      daily: 10,
    },
    pdfGenerations: {
      daily: 3,
    },
    quizAttempts: {
      daily: 5,
    }
  },
  premium: {
    chatMessages: {
      daily: 100,
    },
    pdfGenerations: {
      daily: 30,
    },
    quizAttempts: {
      daily: 50,
    }
  }
};

// Hook for managing user plan limits
export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [limits, setLimits] = useState<PlanLimits>({
    chatMessages: {
      daily: PLAN_DEFINITIONS.free.chatMessages.daily,
      used: 0
    },
    pdfGenerations: {
      daily: PLAN_DEFINITIONS.free.pdfGenerations.daily,
      used: 0
    },
    quizAttempts: {
      daily: PLAN_DEFINITIONS.free.quizAttempts.daily,
      used: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user plan and usage from localStorage
  useEffect(() => {
    const loadPlanData = () => {
      try {
        const savedPlan = localStorage.getItem('userPlan');
        const savedLimits = localStorage.getItem('userLimits');
        
        // Check if saved data exists and was stored today
        const today = new Date().toDateString();
        const lastUpdated = localStorage.getItem('limitsLastUpdated');
        
        if (savedPlan) {
          setUserPlan(savedPlan as PlanType);
        }
        
        if (savedLimits && lastUpdated && lastUpdated === today) {
          setLimits(JSON.parse(savedLimits));
        } else {
          // Reset usage counts if it's a new day
          const planType = savedPlan as PlanType || 'free';
          setLimits({
            chatMessages: {
              daily: PLAN_DEFINITIONS[planType].chatMessages.daily,
              used: 0
            },
            pdfGenerations: {
              daily: PLAN_DEFINITIONS[planType].pdfGenerations.daily,
              used: 0
            },
            quizAttempts: {
              daily: PLAN_DEFINITIONS[planType].quizAttempts.daily,
              used: 0
            }
          });
          
          // Update last updated date
          localStorage.setItem('limitsLastUpdated', today);
        }
      } catch (error) {
        console.error('Error loading plan data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlanData();
  }, []);

  // Save limits to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('userPlan', userPlan);
      localStorage.setItem('userLimits', JSON.stringify(limits));
      localStorage.setItem('limitsLastUpdated', new Date().toDateString());
    }
  }, [limits, userPlan, isLoading]);

  // Update user plan (e.g., when upgrading to premium)
  const updateUserPlan = async (newPlan: PlanType): Promise<boolean> => {
    try {
      setUserPlan(newPlan);
      
      // Update limits based on new plan
      setLimits(prev => ({
        chatMessages: {
          daily: PLAN_DEFINITIONS[newPlan].chatMessages.daily,
          used: prev.chatMessages.used
        },
        pdfGenerations: {
          daily: PLAN_DEFINITIONS[newPlan].pdfGenerations.daily,
          used: prev.pdfGenerations.used
        },
        quizAttempts: {
          daily: PLAN_DEFINITIONS[newPlan].quizAttempts.daily,
          used: prev.quizAttempts.used
        }
      }));
      
      return true;
    } catch (error) {
      console.error('Error updating user plan:', error);
      return false;
    }
  };

  // Check if user can use a feature based on their plan
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    return limits[feature].used < limits[feature].daily;
  };

  // Generic function to increment a counter for a specific feature
  const incrementFeatureUsage = (feature: keyof PlanLimits): boolean => {
    if (canUseFeature(feature)) {
      setLimits(prev => ({
        ...prev,
        [feature]: {
          ...prev[feature],
          used: prev[feature].used + 1
        }
      }));
      return true;
    }
    return false;
  };

  // Check if user has reached limit for specific features
  const hasChatLimit = (): boolean => {
    return userPlan === 'free';
  };

  const hasPdfLimit = (): boolean => {
    return userPlan === 'free';
  };

  const hasQuizLimit = (): boolean => {
    return userPlan === 'free';
  };

  // Feature-specific increment functions
  const incrementChatMessages = (): boolean => {
    return incrementFeatureUsage('chatMessages');
  };

  const incrementPdfGenerations = (): boolean => {
    return incrementFeatureUsage('pdfGenerations');
  };

  const incrementQuizzes = (): boolean => {
    return incrementFeatureUsage('quizAttempts');
  };

  // Additional functions for specific features
  const canSendChatMessage = (): boolean => {
    return canUseFeature('chatMessages');
  };

  const canGeneratePdf = (): boolean => {
    return canUseFeature('pdfGenerations');
  };

  const canTakeQuiz = (): boolean => {
    return canUseFeature('quizAttempts');
  };

  const canAccessAllModules = (): boolean => {
    return userPlan === 'premium';
  };

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    hasChatLimit,
    hasPdfLimit,
    hasQuizLimit,
    incrementChatMessages,
    incrementPdfGenerations,
    incrementQuizzes,
    canSendChatMessage,
    canGeneratePdf,
    canTakeQuiz,
    canAccessAllModules
  };
};
