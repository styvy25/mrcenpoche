
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

// Types for feature usage stats
export type Feature = 
  | 'pdfExport' 
  | 'offlineMode' 
  | 'maxChats' 
  | 'maxDocuments' 
  | 'maxQuizzes'
  | 'youtubeAnalysis';

export interface UsageStats {
  chats: number;
  documents: number;
  quizzes: number;
  pdfExports: number;
  youtubeAnalyses: number;
}

interface PlanLimits {
  maxChats: number;
  maxDocuments: number;
  maxQuizzes: number;
  maxPdfExports: number;
  maxYoutubeAnalyses: number;
  features: Feature[];
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    maxChats: 10,
    maxDocuments: 3,
    maxQuizzes: 5,
    maxPdfExports: 2,
    maxYoutubeAnalyses: 1,
    features: ['maxChats', 'maxDocuments', 'maxQuizzes']
  },
  premium: {
    maxChats: Infinity,
    maxDocuments: Infinity,
    maxQuizzes: Infinity,
    maxPdfExports: Infinity,
    maxYoutubeAnalyses: Infinity,
    features: ['pdfExport', 'offlineMode', 'maxChats', 'maxDocuments', 'maxQuizzes', 'youtubeAnalysis']
  }
};

export function usePlanLimits() {
  const { currentUser } = useAuth();
  const userPlan = currentUser?.subscription?.plan || 'free';
  const [usageStats, setUsageStats] = useState<UsageStats>(() => {
    const storedStats = localStorage.getItem('usage_stats');
    return storedStats ? JSON.parse(storedStats) : {
      chats: 0,
      documents: 0,
      quizzes: 0,
      pdfExports: 0,
      youtubeAnalyses: 0
    };
  });

  // Save usage stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('usage_stats', JSON.stringify(usageStats));
  }, [usageStats]);

  // Check if a specific feature limit has been reached
  const hasReachedLimit = (featureKey: string) => {
    const limits = PLAN_LIMITS[userPlan];
    if (!limits) return true;

    switch (featureKey) {
      case 'maxChats':
        return usageStats.chats >= limits.maxChats;
      case 'maxDocuments':
        return usageStats.documents >= limits.maxDocuments;
      case 'maxQuizzes':
        return usageStats.quizzes >= limits.maxQuizzes;
      case 'pdfExport':
        return usageStats.pdfExports >= limits.maxPdfExports;
      case 'youtubeAnalysis':
        return usageStats.youtubeAnalyses >= limits.maxYoutubeAnalyses;
      default:
        return false;
    }
  };

  // Get remaining usage amount for a specific feature
  const getRemainingUsage = (featureKey: string) => {
    const limits = PLAN_LIMITS[userPlan];
    if (!limits) return 0;

    switch (featureKey) {
      case 'maxChats':
        return Math.max(0, limits.maxChats - usageStats.chats);
      case 'maxDocuments':
        return Math.max(0, limits.maxDocuments - usageStats.documents);
      case 'maxQuizzes':
        return Math.max(0, limits.maxQuizzes - usageStats.quizzes);
      case 'pdfExport':
        return Math.max(0, limits.maxPdfExports - usageStats.pdfExports);
      case 'youtubeAnalysis':
        return Math.max(0, limits.maxYoutubeAnalyses - usageStats.youtubeAnalyses);
      default:
        return 0;
    }
  };

  // Check if user can use a specific feature
  const canUseFeature = (featureName: Feature) => {
    const limits = PLAN_LIMITS[userPlan];
    if (!limits) return false;
    
    if (userPlan === 'premium') return true;
    return limits.features.includes(featureName);
  };

  // Increment usage counter for a feature
  const incrementUsage = (featureKey: string) => {
    setUsageStats(prev => {
      switch (featureKey) {
        case 'maxChats':
          return { ...prev, chats: prev.chats + 1 };
        case 'maxDocuments':
          return { ...prev, documents: prev.documents + 1 };
        case 'maxQuizzes':
          return { ...prev, quizzes: prev.quizzes + 1 };
        case 'pdfExport':
          return { ...prev, pdfExports: prev.pdfExports + 1 };
        case 'youtubeAnalysis':
          return { ...prev, youtubeAnalyses: prev.youtubeAnalyses + 1 };
        default:
          return prev;
      }
    });
  };

  // Reset all usage statistics
  const resetUsageStats = () => {
    setUsageStats({
      chats: 0,
      documents: 0,
      quizzes: 0,
      pdfExports: 0,
      youtubeAnalyses: 0
    });
  };

  // Check if user can access all modules
  const canAccessAllModules = () => {
    return userPlan === 'premium';
  };

  // Helper functions to make the API more convenient
  const hasChatLimit = () => {
    return userPlan === 'free';
  };

  const canGeneratePdf = () => {
    return canUseFeature('pdfExport') && !hasReachedLimit('pdfExport');
  };

  const canAnalyzeYoutube = () => {
    return canUseFeature('youtubeAnalysis') && !hasReachedLimit('youtubeAnalysis');
  };

  const canTakeQuiz = () => {
    return !hasReachedLimit('maxQuizzes');
  };

  // Specialized increment functions for each feature type
  const incrementChatMessages = () => incrementUsage('maxChats');
  const incrementPdfGenerations = () => incrementUsage('pdfExport');
  const incrementYoutubeAnalysis = () => incrementUsage('youtubeAnalysis');
  const incrementQuizzes = () => incrementUsage('maxQuizzes');

  // Function to update user plan (for payment integration)
  const updateUserPlan = (newPlan: 'free' | 'premium') => {
    // In a real app, this would interact with a backend
    // For now, we'll just store it in localStorage
    localStorage.setItem('user_plan', newPlan);
    // Force a refresh
    window.location.reload();
  };

  return {
    userPlan,
    hasReachedLimit,
    getRemainingUsage,
    canUseFeature,
    canAccessAllModules,
    incrementUsage,
    resetUsageStats,
    usageStats,
    // Additional helper functions
    hasChatLimit,
    canGeneratePdf,
    canAnalyzeYoutube,
    canTakeQuiz,
    // Specialized increment functions
    incrementChatMessages,
    incrementPdfGenerations,
    incrementYoutubeAnalysis,
    incrementQuizzes,
    // Plan update function
    updateUserPlan
  };
}
