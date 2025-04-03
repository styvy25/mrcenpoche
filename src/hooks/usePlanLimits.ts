
import { useSubscription } from './useSubscription';

interface PlanLimits {
  maxModules: number;
  maxQuizzes: number;
  maxAssistantMessages: number;
  hasAdvancedAnalytics: boolean;
  hasCommunityAccess: boolean;
  hasPersonalizedTraining: boolean;
}

export const usePlanLimits = (): PlanLimits => {
  // Mock the subscription data since we don't have access to the real implementation
  const mockIsBasic = false; // Assume premium user for testing
  
  // These would ideally come from the subscription hook
  // const { isBasic } = useSubscription();

  // Define limits based on subscription type
  if (mockIsBasic) {
    return {
      maxModules: 5,
      maxQuizzes: 3,
      maxAssistantMessages: 20,
      hasAdvancedAnalytics: false,
      hasCommunityAccess: false,
      hasPersonalizedTraining: false
    };
  }
  
  // Premium limits
  return {
    maxModules: Number.POSITIVE_INFINITY, // Unlimited
    maxQuizzes: Number.POSITIVE_INFINITY, // Unlimited
    maxAssistantMessages: Number.POSITIVE_INFINITY, // Unlimited
    hasAdvancedAnalytics: true,
    hasCommunityAccess: true,
    hasPersonalizedTraining: true
  };
};
