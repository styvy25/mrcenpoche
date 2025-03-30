
import { useState, useEffect } from 'react';

// Simplified version for demo
export const usePlanLimits = () => {
  // Define feature limits
  const FREE_TIER_LIMITS = {
    maxChats: 20,
    maxDocuments: 5,
    maxQuizzes: 3,
    youtubeAnalyses: 5
  };

  const PREMIUM_TIER_LIMITS = {
    maxChats: -1, // Unlimited
    maxDocuments: -1, // Unlimited
    maxQuizzes: -1, // Unlimited
    youtubeAnalyses: -1 // Unlimited
  };

  // Get current usage from localStorage
  const getCurrentUsage = () => {
    try {
      const storedUsage = localStorage.getItem('mrc_usage');
      if (storedUsage) {
        return JSON.parse(storedUsage);
      }
    } catch (error) {
      console.error('Error getting usage stats:', error);
    }
    
    // Default usage
    return {
      chats: 0,
      documents: 0,
      quizzes: 0,
      youtubeAnalyses: 0
    };
  };

  // User tier
  const [isPremium, setIsPremium] = useState(false);
  const [usage, setUsage] = useState(getCurrentUsage());

  // Initialize on component mount
  useEffect(() => {
    // Check if user is premium (e.g., from user data or localstorage)
    const checkPremiumStatus = () => {
      const userData = localStorage.getItem('mrc_user_data');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setIsPremium(parsedData.isPremium || false);
        } catch (e) {
          console.error('Error parsing user data:', e);
          setIsPremium(false);
        }
      }
    };
    
    checkPremiumStatus();
  }, []);

  // Check if user has reached their limit for a feature
  const hasReachedLimit = (feature: keyof typeof FREE_TIER_LIMITS): boolean => {
    if (isPremium) return false; // Premium users have no limits
    
    const limit = FREE_TIER_LIMITS[feature];
    if (limit === -1) return false; // Unlimited
    
    return usage[feature] >= limit;
  };

  // Get remaining usage for a feature
  const getRemainingUsage = (feature: keyof typeof FREE_TIER_LIMITS): number => {
    if (isPremium) return -1; // Unlimited for premium users
    
    const limit = FREE_TIER_LIMITS[feature];
    if (limit === -1) return -1; // Unlimited
    
    return Math.max(0, limit - usage[feature]);
  };

  // Check if user can use a premium feature
  const canUseFeature = (feature: string): boolean => {
    return isPremium || feature === 'basic';
  };

  // Increment usage for a feature
  const incrementUsage = (feature: keyof typeof FREE_TIER_LIMITS): void => {
    if (isPremium) return; // Don't track for premium users
    
    const newUsage = {
      ...usage,
      [feature]: usage[feature] + 1
    };
    
    // Update state
    setUsage(newUsage);
    
    // Persist to localStorage
    try {
      localStorage.setItem('mrc_usage', JSON.stringify(newUsage));
    } catch (error) {
      console.error('Error saving usage stats:', error);
    }
  };

  // Specific increment functions for each feature
  const incrementChat = () => incrementUsage('maxChats');
  const incrementDocument = () => incrementUsage('maxDocuments');
  const incrementQuiz = () => incrementUsage('maxQuizzes');
  const incrementYoutubeAnalysis = () => incrementUsage('youtubeAnalyses');

  // Check if user can access all modules (premium feature)
  const canAccessAllModules = (): boolean => {
    return isPremium;
  };

  // Can analyze YouTube videos
  const canAnalyzeYoutube = (): boolean => {
    if (isPremium) return true;
    return !hasReachedLimit('youtubeAnalyses');
  };

  return {
    isPremium,
    hasReachedLimit,
    getRemainingUsage,
    canUseFeature,
    incrementUsage,
    incrementChat,
    incrementDocument,
    incrementQuiz,
    incrementYoutubeAnalysis,
    canAccessAllModules,
    canAnalyzeYoutube
  };
};
