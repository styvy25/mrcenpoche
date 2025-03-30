
import { useState, useCallback } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

// Define the feature types
export type Feature = 'maxChats' | 'maxPdfs' | 'maxModules' | 'maxVideos' | 'maxTests';
export type PlanType = 'free' | 'premium';

export function usePlanLimits() {
  const { isAuthenticated, user } = useAuth();
  const [userPlan, setUserPlan] = useState<PlanType>(
    isAuthenticated && user?.subscription?.type === 'premium' ? 'premium' : 'free'
  );
  
  // Function to check if the user is premium
  const isPremium = userPlan === 'premium';
  
  // Store usage in localStorage
  const getUsageFromStorage = useCallback(() => {
    try {
      const storedUsage = localStorage.getItem('usage_stats');
      if (storedUsage) {
        return JSON.parse(storedUsage);
      }
      return {
        chatMessages: 0,
        pdfGenerations: 0,
        moduleAccess: 0,
        videoAnalysis: 0,
        testsCompleted: 0,
        lastReset: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return {
        chatMessages: 0,
        pdfGenerations: 0,
        moduleAccess: 0,
        videoAnalysis: 0,
        testsCompleted: 0,
        lastReset: new Date().toISOString()
      };
    }
  }, []);
  
  // Function to save usage to localStorage
  const saveUsageToStorage = useCallback((usage: any) => {
    try {
      localStorage.setItem('usage_stats', JSON.stringify(usage));
    } catch (error) {
      console.error('Error saving usage stats:', error);
    }
  }, []);
  
  // Get usage stats
  const getUsageStats = useCallback(() => {
    const usage = getUsageFromStorage();
    
    // Check if we need to reset (e.g., monthly)
    const lastResetDate = new Date(usage.lastReset);
    const currentDate = new Date();
    
    if (currentDate.getMonth() !== lastResetDate.getMonth() || 
        currentDate.getFullYear() !== lastResetDate.getFullYear()) {
      const resetUsage = {
        chatMessages: 0,
        pdfGenerations: 0,
        moduleAccess: 0,
        videoAnalysis: 0,
        testsCompleted: 0,
        lastReset: currentDate.toISOString()
      };
      saveUsageToStorage(resetUsage);
      return {
        ...resetUsage,
        userPlan
      };
    }
    
    return {
      ...usage,
      userPlan
    };
  }, [getUsageFromStorage, saveUsageToStorage, userPlan]);
  
  // Define limits based on plan
  const getLimits = useCallback(() => {
    if (isPremium) {
      return {
        maxChats: Infinity,
        maxPdfs: Infinity,
        maxModules: Infinity,
        maxVideos: Infinity,
        maxTests: Infinity
      };
    }
    
    return {
      maxChats: 50,
      maxPdfs: 10,
      maxModules: 2,
      maxVideos: 5,
      maxTests: 20
    };
  }, [isPremium]);
  
  // Check if user has reached limit for a feature
  const hasReachedLimit = useCallback((feature: Feature) => {
    if (isPremium) return false;
    
    const usage = getUsageStats();
    const limits = getLimits();
    
    switch (feature) {
      case 'maxChats':
        return usage.chatMessages >= limits.maxChats;
      case 'maxPdfs':
        return usage.pdfGenerations >= limits.maxPdfs;
      case 'maxModules':
        return usage.moduleAccess >= limits.maxModules;
      case 'maxVideos':
        return usage.videoAnalysis >= limits.maxVideos;
      case 'maxTests':
        return usage.testsCompleted >= limits.maxTests;
      default:
        return false;
    }
  }, [isPremium, getUsageStats, getLimits]);
  
  // Get remaining usage for a feature
  const getRemainingUsage = useCallback((feature: Feature) => {
    const usage = getUsageStats();
    const limits = getLimits();
    
    switch (feature) {
      case 'maxChats':
        return Math.max(0, limits.maxChats - usage.chatMessages);
      case 'maxPdfs':
        return Math.max(0, limits.maxPdfs - usage.pdfGenerations);
      case 'maxModules':
        return Math.max(0, limits.maxModules - usage.moduleAccess);
      case 'maxVideos':
        return Math.max(0, limits.maxVideos - usage.videoAnalysis);
      case 'maxTests':
        return Math.max(0, limits.maxTests - usage.testsCompleted);
      default:
        return 0;
    }
  }, [getUsageStats, getLimits]);
  
  // Increment chat messages
  const incrementChatMessages = useCallback(() => {
    if (isPremium) return true;
    
    const usage = getUsageStats();
    const limits = getLimits();
    
    if (usage.chatMessages >= limits.maxChats) {
      return false;
    }
    
    usage.chatMessages += 1;
    saveUsageToStorage(usage);
    return true;
  }, [isPremium, getUsageStats, getLimits, saveUsageToStorage]);
  
  // Increment PDF generations
  const incrementPdfGenerations = useCallback(() => {
    if (isPremium) return true;
    
    const usage = getUsageStats();
    const limits = getLimits();
    
    if (usage.pdfGenerations >= limits.maxPdfs) {
      return false;
    }
    
    usage.pdfGenerations += 1;
    saveUsageToStorage(usage);
    return true;
  }, [isPremium, getUsageStats, getLimits, saveUsageToStorage]);

  // Increment YouTube analysis
  const incrementYoutubeAnalysis = useCallback(() => {
    if (isPremium) return true;
    
    const usage = getUsageStats();
    const limits = getLimits();
    
    if (usage.videoAnalysis >= limits.maxVideos) {
      return false;
    }
    
    usage.videoAnalysis += 1;
    saveUsageToStorage(usage);
    return true;
  }, [isPremium, getUsageStats, getLimits, saveUsageToStorage]);
  
  // Increment quizzes
  const incrementQuizzes = useCallback(() => {
    if (isPremium) return true;
    
    const usage = getUsageStats();
    const limits = getLimits();
    
    if (usage.testsCompleted >= limits.maxTests) {
      return false;
    }
    
    usage.testsCompleted += 1;
    saveUsageToStorage(usage);
    return true;
  }, [isPremium, getUsageStats, getLimits, saveUsageToStorage]);
  
  // Check if user has module access
  const canAccessModule = useCallback((moduleId: string) => {
    if (isPremium) return true;
    
    // Free modules (always accessible)
    const freeModules = ['module-1', 'module-2'];
    if (freeModules.includes(moduleId)) {
      return true;
    }
    
    return !hasReachedLimit('maxModules');
  }, [isPremium, hasReachedLimit]);
  
  // Check if user can access all modules
  const canAccessAllModules = useCallback(() => {
    return isPremium || !hasReachedLimit('maxModules');
  }, [isPremium, hasReachedLimit]);
  
  // Check if user has access to a particular feature
  const hasChatLimit = useCallback(() => {
    return !isPremium;
  }, [isPremium]);
  
  // Check if user can send chat message
  const canSendChatMessage = useCallback(() => {
    return isPremium || !hasReachedLimit('maxChats');
  }, [isPremium, hasReachedLimit]);
  
  // Check if user can analyze YouTube videos
  const canAnalyzeYoutube = useCallback(() => {
    return isPremium || !hasReachedLimit('maxVideos');
  }, [isPremium, hasReachedLimit]);
  
  // Check if user can take quizzes
  const canTakeQuiz = useCallback(() => {
    return isPremium || !hasReachedLimit('maxTests');
  }, [isPremium, hasReachedLimit]);
  
  // Check if user can use a premium feature
  const canUseFeature = useCallback((feature: string) => {
    switch (feature) {
      case 'offlineMode':
        return isPremium;
      case 'chatWithFiles':
        return isPremium;
      case 'apiAccess':
        return isPremium;
      case 'premiumSupport':
        return isPremium;
      case 'generatePdf':
        return isPremium || !hasReachedLimit('maxPdfs');
      case 'pdfExport':
        return isPremium;
      default:
        return false;
    }
  }, [isPremium, hasReachedLimit]);
  
  // Check if user can generate PDFs
  const canGeneratePdf = useCallback(() => {
    return isPremium || !hasReachedLimit('maxPdfs');
  }, [isPremium, hasReachedLimit]);
  
  // Update user plan
  const updateUserPlan = useCallback((newPlan: PlanType) => {
    setUserPlan(newPlan);
  }, []);
  
  return {
    isPremium,
    userPlan,
    updateUserPlan,
    hasReachedLimit,
    getRemainingUsage,
    incrementChatMessages,
    incrementPdfGenerations,
    incrementYoutubeAnalysis,
    incrementQuizzes,
    canAccessModule,
    canAccessAllModules,
    hasChatLimit,
    canUseFeature,
    canGeneratePdf,
    canSendChatMessage,
    canAnalyzeYoutube,
    canTakeQuiz,
    getUsageStats
  };
}
