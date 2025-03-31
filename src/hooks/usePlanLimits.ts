
import { useState, useEffect } from 'react';
import { Feature, Plan } from '@/components/quiz/types';

interface PlanLimits {
  [key: string]: {
    [key in Feature]?: number;
  }
}

const DEFAULT_LIMITS: PlanLimits = {
  free: {
    pdfGeneration: 5,
    quizzes: 10,
    aiChat: 20,
    videoDownload: 3,
    youtubeAnalysis: 5
  },
  standard: {
    pdfGeneration: 20,
    quizzes: 50,
    aiChat: 100,
    videoDownload: 15,
    youtubeAnalysis: 25
  },
  premium: {
    pdfGeneration: -1, // unlimited
    quizzes: -1, // unlimited
    aiChat: -1, // unlimited
    videoDownload: -1, // unlimited
    youtubeAnalysis: -1 // unlimited
  }
};

export const usePlanLimits = () => {
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [usage, setUsage] = useState<{[key in Feature]?: number}>({
    pdfGeneration: 0,
    quizzes: 0,
    aiChat: 3,
    videoDownload: 0,
    youtubeAnalysis: 0
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

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    getRemainingUsage,
    hasReachedLimit,
    incrementUsage
  };
};

export default usePlanLimits;
