
import { useCallback, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

// Features that can be limited by plan
type Feature = 'youtubeSearch' | 'pdfExport' | 'videoAnalysis' | 'chatMessages';

export function usePlanLimits() {
  const { currentUser } = useAuth();
  const [usageStats, setUsageStats] = useState({
    chatMessages: 0,
    youtubeSearches: 0,
    pdfExports: 0,
    videoAnalyses: 0
  });

  // Check if the user is on a premium plan
  const isPremium = currentUser?.subscription?.plan === 'premium';

  // Feature limits based on plan
  const limits = {
    free: {
      chatMessages: 50,
      youtubeSearches: 5,
      pdfExports: 3,
      videoAnalyses: 2
    },
    premium: {
      chatMessages: Infinity,
      youtubeSearches: Infinity,
      pdfExports: Infinity,
      videoAnalyses: Infinity
    }
  };

  // Get the user's current plan
  const plan = isPremium ? 'premium' : 'free';

  // Check if the user can use a feature based on their usage and plan limits
  const canUseFeature = useCallback((feature: Feature): boolean => {
    if (!currentUser) return false;
    
    switch (feature) {
      case 'youtubeSearch':
        return usageStats.youtubeSearches < limits[plan].youtubeSearches;
      case 'pdfExport':
        return usageStats.pdfExports < limits[plan].pdfExports;
      case 'videoAnalysis':
        return usageStats.videoAnalyses < limits[plan].videoAnalyses;
      case 'chatMessages':
        return usageStats.chatMessages < limits[plan].chatMessages;
      default:
        return false;
    }
  }, [currentUser, usageStats, plan, limits]);

  // Increment the usage count for a feature
  const incrementChatMessages = useCallback(() => {
    setUsageStats(prev => ({
      ...prev,
      chatMessages: prev.chatMessages + 1
    }));
  }, []);

  const incrementYouTubeSearches = useCallback(() => {
    setUsageStats(prev => ({
      ...prev,
      youtubeSearches: prev.youtubeSearches + 1
    }));
  }, []);

  const incrementPDFExports = useCallback(() => {
    setUsageStats(prev => ({
      ...prev,
      pdfExports: prev.pdfExports + 1
    }));
  }, []);

  const incrementVideoAnalyses = useCallback(() => {
    setUsageStats(prev => ({
      ...prev,
      videoAnalyses: prev.videoAnalyses + 1
    }));
  }, []);

  return {
    isPremium,
    usageStats,
    canUseFeature,
    incrementChatMessages,
    incrementYouTubeSearches,
    incrementPDFExports,
    incrementVideoAnalyses
  };
}

export default usePlanLimits;
