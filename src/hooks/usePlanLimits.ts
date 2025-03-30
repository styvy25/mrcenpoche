
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Change from type to enum so it can be used as a value
export enum Feature {
  PDF_EXPORT = 'pdfExport',
  CHAT = 'aiChat',
  DOCUMENT_ANALYSIS = 'documentAnalysis',
  YOUTUBE_ANALYSIS = 'youtubeAnalysis',
  YOUTUBE_DOWNLOAD = 'youtubeDownload'
}

interface UsageLimits {
  maxChats: number;
  maxPdfGenerations: number;
  maxYoutubeAnalyses: number;
  maxYoutubeDownloads: number;
  maxDocumentsPerDay: number;
}

interface UsageCount {
  chats: number;
  pdfGenerations: number;
  youtubeAnalyses: number;
  youtubeDownloads: number;
  documentsToday: number;
}

export const usePlanLimits = () => {
  const { currentUser } = useAuth();
  const [usage, setUsage] = useState<UsageCount>({
    chats: 0,
    pdfGenerations: 0,
    youtubeAnalyses: 0,
    youtubeDownloads: 0,
    documentsToday: 0
  });
  
  // Define limits based on plan (free or premium)
  const isPremium = currentUser?.premium || false;
  
  const limits: UsageLimits = {
    maxChats: isPremium ? Infinity : 25,
    maxPdfGenerations: isPremium ? Infinity : 5,
    maxYoutubeAnalyses: isPremium ? Infinity : 10,
    maxYoutubeDownloads: isPremium ? Infinity : 3,
    maxDocumentsPerDay: isPremium ? Infinity : 10
  };
  
  // Load saved usage from localStorage on component mount
  useEffect(() => {
    const savedUsage = localStorage.getItem('usageLimits');
    if (savedUsage) {
      try {
        const parsedUsage = JSON.parse(savedUsage);
        setUsage(parsedUsage);
      } catch (e) {
        console.error("Error parsing usage data", e);
        // If error parsing, reset usage
        localStorage.setItem('usageLimits', JSON.stringify(usage));
      }
    }
  }, []);
  
  // Save usage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('usageLimits', JSON.stringify(usage));
  }, [usage]);
  
  const resetDailyLimits = () => {
    setUsage(prev => ({
      ...prev,
      documentsToday: 0
    }));
  };
  
  const incrementChatCount = () => {
    setUsage(prev => ({
      ...prev,
      chats: prev.chats + 1
    }));
  };
  
  const incrementPdfGenerations = () => {
    setUsage(prev => ({
      ...prev,
      pdfGenerations: prev.pdfGenerations + 1
    }));
  };
  
  const incrementYoutubeAnalysis = () => {
    setUsage(prev => ({
      ...prev,
      youtubeAnalyses: prev.youtubeAnalyses + 1
    }));
  };
  
  const incrementYoutubeDownloads = () => {
    setUsage(prev => ({
      ...prev,
      youtubeDownloads: prev.youtubeDownloads + 1
    }));
    return true;
  };
  
  const incrementDocumentsToday = () => {
    setUsage(prev => ({
      ...prev,
      documentsToday: prev.documentsToday + 1
    }));
  };
  
  // Renamed function to make it clearer
  const hasFeatureAccess = (feature: Feature): boolean => {
    if (isPremium) return true;
    
    switch (feature) {
      case Feature.CHAT:
        return usage.chats < limits.maxChats;
      case Feature.PDF_EXPORT:
        return usage.pdfGenerations < limits.maxPdfGenerations;
      case Feature.YOUTUBE_ANALYSIS:
        return usage.youtubeAnalyses < limits.maxYoutubeAnalyses;
      case Feature.YOUTUBE_DOWNLOAD:
        return usage.youtubeDownloads < limits.maxYoutubeDownloads;
      case Feature.DOCUMENT_ANALYSIS:
        return usage.documentsToday < limits.maxDocumentsPerDay;
      default:
        return false;
    }
  };
  
  // Maintain backwards compatibility with existing code
  const canUseFeature = hasFeatureAccess;
  
  const canGeneratePdf = (): boolean => {
    return hasFeatureAccess(Feature.PDF_EXPORT);
  };
  
  const canAnalyzeYoutube = (): boolean => {
    return hasFeatureAccess(Feature.YOUTUBE_ANALYSIS);
  };
  
  const canDownloadYoutube = (): boolean => {
    return hasFeatureAccess(Feature.YOUTUBE_DOWNLOAD);
  };
  
  const getRemainingUsage = (feature: Feature): number => {
    switch (feature) {
      case Feature.CHAT:
        return limits.maxChats - usage.chats;
      case Feature.PDF_EXPORT:
        return limits.maxPdfGenerations - usage.pdfGenerations;
      case Feature.YOUTUBE_ANALYSIS:
        return limits.maxYoutubeAnalyses - usage.youtubeAnalyses;
      case Feature.YOUTUBE_DOWNLOAD:
        return limits.maxYoutubeDownloads - usage.youtubeDownloads;
      case Feature.DOCUMENT_ANALYSIS:
        return limits.maxDocumentsPerDay - usage.documentsToday;
      default:
        return 0;
    }
  };
  
  // Add helper functions for chat-related functionality
  const hasReachedLimit = (limitType: 'maxChats' | 'maxPdfGenerations' | 'maxYoutubeAnalyses' | 'maxYoutubeDownloads' | 'maxDocumentsPerDay'): boolean => {
    return usage[limitType.replace('max', '').toLowerCase() as keyof UsageCount] >= limits[limitType];
  };
  
  const hasChatLimit = (): boolean => {
    return !isPremium;
  };
  
  // For compatibility with components that expect userPlan
  const userPlan = isPremium ? 'premium' : 'free';
  
  // Alias for incrementChatCount for components expecting this function name
  const incrementChatMessages = incrementChatCount;

  return {
    usage,
    limits,
    canUseFeature,
    canGeneratePdf,
    canAnalyzeYoutube,
    canDownloadYoutube,
    incrementChatCount,
    incrementPdfGenerations,
    incrementYoutubeAnalysis,
    incrementYoutubeDownloads,
    incrementDocumentsToday,
    incrementChatMessages,
    resetDailyLimits,
    getRemainingUsage,
    isPremium,
    hasFeatureAccess,
    hasReachedLimit,
    hasChatLimit,
    userPlan
  };
};
