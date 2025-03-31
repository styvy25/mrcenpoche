import { useSubscription } from "./useSubscription";
import { useState, useEffect } from 'react';
import { canUseFeature, incrementFeatureUsage } from "@/services/paymentService";
import { Feature } from "./api-keys/types";

export interface UsePlanLimitsReturn {
  // General limits
  canAccessAllModules: () => boolean;
  canGeneratePdf: () => Promise<boolean>;
  canAccessAIChat: () => Promise<boolean>;
  canUseVideoAnalysis: () => Promise<boolean>;
  
  // Check if premium is required for this action
  isPremiumRequired: (feature: Feature) => boolean;
  
  // Keep track of used features
  trackFeatureUsage: (feature: Feature) => Promise<boolean>;
  
  // For loading states
  checkingAccess: boolean;
}

export function usePlanLimits(): UsePlanLimitsReturn {
  const { isPremium, isSubscriptionActive } = useSubscription();
  const [checkingAccess, setCheckingAccess] = useState(false);
  
  // Check if the feature requires premium
  const isPremiumRequired = (feature: Feature): boolean => {
    // List of features that require premium
    const premiumFeatures: Feature[] = [
      'PDF_EXPORT',
      'AI_CHAT',
      'VIDEO_ANALYSIS',
      'PREMIUM_MODULES'
    ];
    
    return premiumFeatures.includes(feature);
  };
  
  // Check if user can access all modules
  const canAccessAllModules = (): boolean => {
    return Boolean(isPremium && isSubscriptionActive);
  };
  
  // Check if user can generate PDFs
  const canGeneratePdf = async (): Promise<boolean> => {
    setCheckingAccess(true);
    try {
      // Premium users can always generate PDFs
      if (isPremium && isSubscriptionActive) {
        return true;
      }
      
      // Free users have limited access via feature limit check
      const hasAccess = await canUseFeature('PDF_EXPORT');
      return hasAccess;
    } catch (error) {
      console.error('Error checking PDF access:', error);
      return false;
    } finally {
      setCheckingAccess(false);
    }
  };
  
  // Check if user can access AI chat
  const canAccessAIChat = async (): Promise<boolean> => {
    setCheckingAccess(true);
    try {
      // Premium users can always use AI chat
      if (isPremium && isSubscriptionActive) {
        return true;
      }
      
      // Free users have limited access via feature limit check
      const hasAccess = await canUseFeature('AI_CHAT');
      return hasAccess;
    } catch (error) {
      console.error('Error checking AI chat access:', error);
      return false;
    } finally {
      setCheckingAccess(false);
    }
  };
  
  // Check if user can use video analysis
  const canUseVideoAnalysis = async (): Promise<boolean> => {
    setCheckingAccess(true);
    try {
      // Only premium users can use video analysis
      return Boolean(isPremium && isSubscriptionActive);
    } catch (error) {
      console.error('Error checking video analysis access:', error);
      return false;
    } finally {
      setCheckingAccess(false);
    }
  };
  
  // Track feature usage
  const trackFeatureUsage = async (feature: Feature): Promise<boolean> => {
    // Premium users don't need to track usage
    if (isPremium && isSubscriptionActive) {
      return true;
    }
    
    // For free users, increment feature usage in the database
    try {
      return await incrementFeatureUsage(feature);
    } catch (error) {
      console.error(`Error tracking ${feature} usage:`, error);
      return false;
    }
  };
  
  return {
    canAccessAllModules,
    canGeneratePdf,
    canAccessAIChat,
    canUseVideoAnalysis,
    isPremiumRequired,
    trackFeatureUsage,
    checkingAccess
  };
}
