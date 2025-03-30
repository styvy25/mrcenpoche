
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export type Feature = 
  | 'pdfExport' 
  | 'aiChat' 
  | 'documentAnalysis' 
  | 'youtubeAnalysis'
  | 'youtubeDownload';

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
  };
  
  const incrementDocumentsToday = () => {
    setUsage(prev => ({
      ...prev,
      documentsToday: prev.documentsToday + 1
    }));
  };
  
  const canUseFeature = (feature: Feature): boolean => {
    if (isPremium) return true;
    
    switch (feature) {
      case 'aiChat':
        return usage.chats < limits.maxChats;
      case 'pdfExport':
        return usage.pdfGenerations < limits.maxPdfGenerations;
      case 'youtubeAnalysis':
        return usage.youtubeAnalyses < limits.maxYoutubeAnalyses;
      case 'youtubeDownload':
        return usage.youtubeDownloads < limits.maxYoutubeDownloads;
      case 'documentAnalysis':
        return usage.documentsToday < limits.maxDocumentsPerDay;
      default:
        return false;
    }
  };
  
  const canGeneratePdf = (): boolean => {
    return canUseFeature('pdfExport');
  };
  
  const canAnalyzeYoutube = (): boolean => {
    return canUseFeature('youtubeAnalysis');
  };
  
  const canDownloadYoutube = (): boolean => {
    return canUseFeature('youtubeDownload');
  };
  
  const getRemainingUsage = (feature: Feature): number => {
    switch (feature) {
      case 'aiChat':
        return limits.maxChats - usage.chats;
      case 'pdfExport':
        return limits.maxPdfGenerations - usage.pdfGenerations;
      case 'youtubeAnalysis':
        return limits.maxYoutubeAnalyses - usage.youtubeAnalyses;
      case 'youtubeDownload':
        return limits.maxYoutubeDownloads - usage.youtubeDownloads;
      case 'documentAnalysis':
        return limits.maxDocumentsPerDay - usage.documentsToday;
      default:
        return 0;
    }
  };

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
    resetDailyLimits,
    getRemainingUsage,
    isPremium
  };
};
