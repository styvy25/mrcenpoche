
import { useState, useEffect } from 'react';

export enum Feature {
  Chat = 'chat',
  YouTube = 'youtube',
  PDFExport = 'pdfExport',
  VideoAnalysis = 'videoAnalysis',
  Quiz = 'quiz',
  AllModules = 'allModules',
  LiveStreaming = 'liveStreaming',
  PremiumContent = 'premiumContent'
}

interface UsageStats {
  chatMessages: number;
  youtubeSearches: number;
  pdfExports: number;
  videoAnalyses: number;
  quizzes: number;
}

interface PlanLimits {
  chatMessages: number;
  youtubeSearches: number;
  pdfExports: number;
  videoAnalyses: number;
  quizzes: number;
}

type UserPlan = 'free' | 'premium' | 'enterprise';

export function usePlanLimits() {
  const [isPremium, setIsPremium] = useState(false);
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [usageStats, setUsageStats] = useState<UsageStats>({
    chatMessages: 0,
    youtubeSearches: 0,
    pdfExports: 0,
    videoAnalyses: 0,
    quizzes: 0
  });

  // Define feature limits based on plan
  const planLimits: Record<UserPlan, PlanLimits> = {
    free: {
      chatMessages: 10,
      youtubeSearches: 5,
      pdfExports: 2,
      videoAnalyses: 1,
      quizzes: 3
    },
    premium: {
      chatMessages: 100,
      youtubeSearches: 50,
      pdfExports: 20,
      videoAnalyses: 10,
      quizzes: 30
    },
    enterprise: {
      chatMessages: Infinity,
      youtubeSearches: Infinity,
      pdfExports: Infinity,
      videoAnalyses: Infinity,
      quizzes: Infinity
    }
  };

  // Load usage data from localStorage on initialization
  useEffect(() => {
    try {
      const savedUsage = localStorage.getItem('usage_stats');
      const savedPremium = localStorage.getItem('is_premium');
      const savedPlan = localStorage.getItem('user_plan') as UserPlan;
      
      if (savedUsage) {
        setUsageStats(JSON.parse(savedUsage));
      }
      
      if (savedPremium) {
        setIsPremium(savedPremium === 'true');
      }
      
      if (savedPlan && ['free', 'premium', 'enterprise'].includes(savedPlan)) {
        setUserPlan(savedPlan);
      }
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  }, []);

  // Save usage data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('usage_stats', JSON.stringify(usageStats));
    localStorage.setItem('is_premium', isPremium.toString());
    localStorage.setItem('user_plan', userPlan);
  }, [usageStats, isPremium, userPlan]);

  // Check if user can use a specific feature
  const canUseFeature = (feature: Feature): boolean => {
    if (isPremium) return true;
    
    const currentLimits = planLimits[userPlan];
    
    switch (feature) {
      case Feature.Chat:
        return usageStats.chatMessages < currentLimits.chatMessages;
      case Feature.YouTube:
        return usageStats.youtubeSearches < currentLimits.youtubeSearches;
      case Feature.PDFExport:
        return usageStats.pdfExports < currentLimits.pdfExports;
      case Feature.VideoAnalysis:
        return usageStats.videoAnalyses < currentLimits.videoAnalyses;
      case Feature.Quiz:
        return usageStats.quizzes < currentLimits.quizzes;
      case Feature.AllModules:
      case Feature.LiveStreaming:
      case Feature.PremiumContent:
        return isPremium;
      default:
        return false;
    }
  };

  // Check if user has reached limit for a specific feature
  const hasReachedLimit = (feature: Feature): boolean => {
    return !canUseFeature(feature);
  };

  // Get remaining usage for a feature
  const getRemainingUsage = (feature: Feature): number => {
    const currentLimits = planLimits[userPlan];
    
    switch (feature) {
      case Feature.Chat:
        return Math.max(0, currentLimits.chatMessages - usageStats.chatMessages);
      case Feature.YouTube:
        return Math.max(0, currentLimits.youtubeSearches - usageStats.youtubeSearches);
      case Feature.PDFExport:
        return Math.max(0, currentLimits.pdfExports - usageStats.pdfExports);
      case Feature.VideoAnalysis:
        return Math.max(0, currentLimits.videoAnalyses - usageStats.videoAnalyses);
      case Feature.Quiz:
        return Math.max(0, currentLimits.quizzes - usageStats.quizzes);
      default:
        return 0;
    }
  };

  // Increment usage counters
  const incrementChatMessages = () => {
    setUsageStats(prev => ({
      ...prev,
      chatMessages: prev.chatMessages + 1
    }));
  };

  const incrementYouTubeSearches = () => {
    setUsageStats(prev => ({
      ...prev,
      youtubeSearches: prev.youtubeSearches + 1
    }));
  };

  const incrementPDFExports = () => {
    setUsageStats(prev => ({
      ...prev,
      pdfExports: prev.pdfExports + 1
    }));
  };

  const incrementVideoAnalyses = () => {
    setUsageStats(prev => ({
      ...prev,
      videoAnalyses: prev.videoAnalyses + 1
    }));
  };

  const incrementQuizzes = () => {
    setUsageStats(prev => ({
      ...prev,
      quizzes: prev.quizzes + 1
    }));
  };

  // Alias methods for other parts of the application
  const canGeneratePdf = () => canUseFeature(Feature.PDFExport);
  const incrementPdfGenerations = incrementPDFExports;
  const canAnalyzeYoutube = () => canUseFeature(Feature.VideoAnalysis);
  const incrementYoutubeAnalysis = incrementVideoAnalyses;
  const canAccessAllModules = () => canUseFeature(Feature.AllModules);
  const canTakeQuiz = () => canUseFeature(Feature.Quiz);
  const hasChatLimit = userPlan === 'free';

  // Update user plan
  const updateUserPlan = (plan: UserPlan) => {
    setUserPlan(plan);
    setIsPremium(plan !== 'free');
  };

  return {
    isPremium,
    userPlan,
    usageStats,
    canUseFeature,
    hasReachedLimit,
    getRemainingUsage,
    incrementChatMessages,
    incrementYouTubeSearches,
    incrementPDFExports,
    incrementVideoAnalyses,
    incrementQuizzes,
    hasChatLimit,
    canGeneratePdf,
    incrementPdfGenerations,
    canAnalyzeYoutube,
    incrementYoutubeAnalysis,
    canAccessAllModules,
    canTakeQuiz,
    updateUserPlan
  };
}
