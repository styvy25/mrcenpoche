
import { useState, useEffect } from 'react';

export type Plan = 'free' | 'standard' | 'premium';

export enum Feature {
  PdfGeneration = 'pdfGeneration',
  Quizzes = 'quizzes',
  AiChat = 'aiChat',
  VideoDownload = 'videoDownload',
  YoutubeAnalysis = 'youtubeAnalysis'
}

interface PlanLimits {
  [key: string]: {
    [key in Feature]?: number;
  }
}

const DEFAULT_LIMITS: PlanLimits = {
  free: {
    [Feature.PdfGeneration]: 5,
    [Feature.Quizzes]: 10,
    [Feature.AiChat]: 20,
    [Feature.VideoDownload]: 3,
    [Feature.YoutubeAnalysis]: 5
  },
  standard: {
    [Feature.PdfGeneration]: 20,
    [Feature.Quizzes]: 50,
    [Feature.AiChat]: 100,
    [Feature.VideoDownload]: 15,
    [Feature.YoutubeAnalysis]: 25
  },
  premium: {
    [Feature.PdfGeneration]: -1, // unlimited
    [Feature.Quizzes]: -1, // unlimited
    [Feature.AiChat]: -1, // unlimited
    [Feature.VideoDownload]: -1, // unlimited
    [Feature.YoutubeAnalysis]: -1 // unlimited
  }
};

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [usage, setUsage] = useState<{[key in Feature]?: number}>({
    [Feature.PdfGeneration]: 0,
    [Feature.Quizzes]: 0,
    [Feature.AiChat]: 3,
    [Feature.VideoDownload]: 0,
    [Feature.YoutubeAnalysis]: 0
  });

  useEffect(() => {
    // Simuler le chargement des données utilisateur
    const loadUserData = async () => {
      // Ici, vous appelleriez normalement votre API
      // Pour l'instant, on utilise des données simulées
      const userData = {
        plan: localStorage.getItem('userPlan') as Plan || 'free',
        usage: JSON.parse(localStorage.getItem('userUsage') || '{}')
      };
      
      setUserPlan(userData.plan);
      setUsage(userData.usage);
    };
    
    loadUserData();
  }, []);

  const getLimitForFeature = (feature: Feature): number => {
    return DEFAULT_LIMITS[userPlan]?.[feature] ?? -1;
  };

  const hasLimit = (feature: Feature): boolean => {
    const limit = getLimitForFeature(feature);
    return limit !== -1;
  };

  const getUsage = (feature: Feature): number => {
    return usage[feature] || 0;
  };

  const getRemainingUsage = (feature: Feature): number => {
    const limit = getLimitForFeature(feature);
    const currentUsage = getUsage(feature);
    
    if (limit === -1) return -1; // unlimited
    return Math.max(0, limit - currentUsage);
  };

  const hasReachedLimit = (feature: Feature): boolean => {
    const limit = getLimitForFeature(feature);
    const currentUsage = getUsage(feature);
    
    if (limit === -1) return false; // unlimited
    return currentUsage >= limit;
  };

  const incrementUsage = async (feature: Feature, amount: number = 1): Promise<boolean> => {
    if (hasReachedLimit(feature)) return false;
    
    const newUsage = {
      ...usage,
      [feature]: (usage[feature] || 0) + amount
    };
    
    setUsage(newUsage);
    
    // Simuler la mise à jour dans la base de données
    localStorage.setItem('userUsage', JSON.stringify(newUsage));
    
    return true;
  };

  // Méthodes additionnelles utiles
  const canGeneratePdf = (): boolean => !hasReachedLimit(Feature.PdfGeneration);
  const incrementPdfGenerations = (): Promise<boolean> => incrementUsage(Feature.PdfGeneration);
  
  const hasFeatureAccess = (feature: Feature): boolean => !hasReachedLimit(feature);
  const incrementChatMessages = (): Promise<boolean> => incrementUsage(Feature.AiChat);
  
  const canAccessAllModules = (): boolean => userPlan === 'premium';
  const canAnalyzeYoutube = (): boolean => !hasReachedLimit(Feature.YoutubeAnalysis);
  const incrementYoutubeAnalysis = (): Promise<boolean> => incrementUsage(Feature.YoutubeAnalysis);
  
  const updateUserPlan = (plan: Plan): void => {
    setUserPlan(plan);
    localStorage.setItem('userPlan', plan);
  };

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    getRemainingUsage,
    hasReachedLimit,
    incrementUsage,
    // Fonctions supplémentaires
    canGeneratePdf,
    incrementPdfGenerations,
    hasFeatureAccess,
    incrementChatMessages,
    canAccessAllModules,
    canAnalyzeYoutube,
    incrementYoutubeAnalysis,
    updateUserPlan
  };
};

export default usePlanLimits;
