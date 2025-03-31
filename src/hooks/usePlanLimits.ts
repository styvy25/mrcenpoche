
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Feature, Plan } from '@/components/quiz/types';

interface PlanLimits {
  maxQuizzes: number;
  maxPdfs: number;
  maxChats: number;
  maxVideoDownloads: number;
  allowYoutubeAnalysis: boolean;
}

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    maxQuizzes: 3,
    maxPdfs: 2,
    maxChats: 10,
    maxVideoDownloads: 5,
    allowYoutubeAnalysis: false
  },
  standard: {
    maxQuizzes: 10,
    maxPdfs: 10,
    maxChats: 50,
    maxVideoDownloads: 15,
    allowYoutubeAnalysis: true
  },
  premium: {
    maxQuizzes: -1, // illimité
    maxPdfs: -1, // illimité
    maxChats: -1, // illimité
    maxVideoDownloads: -1, // illimité
    allowYoutubeAnalysis: true
  }
};

interface UsageStats {
  quizzesTaken: number;
  pdfsGenerated: number;
  chatMessages: number;
  videosDownloaded: number;
}

export const usePlanLimits = () => {
  const { currentUser } = useAuth();
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [usage, setUsage] = useState<UsageStats>({
    quizzesTaken: 0,
    pdfsGenerated: 0,
    chatMessages: 0,
    videosDownloaded: 0
  });

  // Chargement du plan et de l'utilisation à partir du localStorage
  useEffect(() => {
    const loadUsageData = () => {
      if (currentUser) {
        // Dans une application réelle, ces données viendraient du backend
        const storedPlan = localStorage.getItem(`plan_${currentUser.id}`) as Plan || 'free';
        const storedUsage = JSON.parse(localStorage.getItem(`usage_${currentUser.id}`) || '{}');
        
        setUserPlan(storedPlan);
        setUsage({
          quizzesTaken: storedUsage.quizzesTaken || 0,
          pdfsGenerated: storedUsage.pdfsGenerated || 0,
          chatMessages: storedUsage.chatMessages || 0,
          videosDownloaded: storedUsage.videosDownloaded || 0
        });
      } else {
        // Utilisateur anonyme
        const storedUsage = JSON.parse(localStorage.getItem('usage_anonymous') || '{}');
        
        setUserPlan('free');
        setUsage({
          quizzesTaken: storedUsage.quizzesTaken || 0,
          pdfsGenerated: storedUsage.pdfsGenerated || 0,
          chatMessages: storedUsage.chatMessages || 0,
          videosDownloaded: storedUsage.videosDownloaded || 0
        });
      }
    };

    loadUsageData();
  }, [currentUser]);

  // Sauvegarde de l'utilisation dans le localStorage
  const saveUsage = (newUsage: UsageStats) => {
    if (currentUser) {
      localStorage.setItem(`usage_${currentUser.id}`, JSON.stringify(newUsage));
    } else {
      localStorage.setItem('usage_anonymous', JSON.stringify(newUsage));
    }
  };

  // Vérifier si une fonctionnalité est disponible dans le plan actuel
  const canUseFeature = (feature: Feature): boolean => {
    const limits = PLAN_LIMITS[userPlan];
    
    switch (feature) {
      case 'pdfGeneration':
        return limits.maxPdfs === -1 || usage.pdfsGenerated < limits.maxPdfs;
      case 'quizzes':
        return limits.maxQuizzes === -1 || usage.quizzesTaken < limits.maxQuizzes;
      case 'aiChat':
      case 'maxChats':
        return limits.maxChats === -1 || usage.chatMessages < limits.maxChats;
      case 'videoDownload':
        return limits.maxVideoDownloads === -1 || usage.videosDownloaded < limits.maxVideoDownloads;
      case 'youtubeAnalysis':
        return limits.allowYoutubeAnalysis;
      default:
        return false;
    }
  };

  // Vérifier si une limite a été atteinte
  const hasReachedLimit = (feature: Feature): boolean => {
    return !canUseFeature(feature);
  };

  // Vérifier s'il y a une limite pour une fonctionnalité
  const hasLimit = (feature: Feature): boolean => {
    const limits = PLAN_LIMITS[userPlan];
    
    switch (feature) {
      case 'pdfGeneration':
        return limits.maxPdfs !== -1;
      case 'quizzes':
        return limits.maxQuizzes !== -1;
      case 'aiChat':
      case 'maxChats':
        return limits.maxChats !== -1;
      case 'videoDownload':
        return limits.maxVideoDownloads !== -1;
      case 'youtubeAnalysis':
        return !limits.allowYoutubeAnalysis;
      default:
        return true;
    }
  };

  // Obtenir le nombre d'utilisations restantes
  const getRemainingUsage = (feature: Feature): number => {
    const limits = PLAN_LIMITS[userPlan];
    
    switch (feature) {
      case 'pdfGeneration':
        return limits.maxPdfs === -1 ? -1 : limits.maxPdfs - usage.pdfsGenerated;
      case 'quizzes':
        return limits.maxQuizzes === -1 ? -1 : limits.maxQuizzes - usage.quizzesTaken;
      case 'aiChat':
      case 'maxChats':
        return limits.maxChats === -1 ? -1 : limits.maxChats - usage.chatMessages;
      case 'videoDownload':
        return limits.maxVideoDownloads === -1 ? -1 : limits.maxVideoDownloads - usage.videosDownloaded;
      default:
        return 0;
    }
  };

  // Incrémenter l'utilisation d'une fonctionnalité
  const incrementQuizzes = (): boolean => {
    if (canUseFeature('quizzes')) {
      const newUsage = { ...usage, quizzesTaken: usage.quizzesTaken + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);
      return true;
    }
    return false;
  };

  const incrementPdfGenerations = (): boolean => {
    if (canUseFeature('pdfGeneration')) {
      const newUsage = { ...usage, pdfsGenerated: usage.pdfsGenerated + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);
      return true;
    }
    return false;
  };

  const incrementChatMessages = (): boolean => {
    if (canUseFeature('maxChats')) {
      const newUsage = { ...usage, chatMessages: usage.chatMessages + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);
      return true;
    }
    return false;
  };

  const incrementVideoDownloads = (): boolean => {
    if (canUseFeature('videoDownload')) {
      const newUsage = { ...usage, videosDownloaded: usage.videosDownloaded + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);
      return true;
    }
    return false;
  };

  // Vérifier si l'utilisateur a une limite de chat
  const hasChatLimit = (): boolean => {
    return hasLimit('maxChats');
  };

  // Mettre à jour le plan de l'utilisateur
  const updateUserPlan = (plan: Plan) => {
    setUserPlan(plan);
    if (currentUser) {
      localStorage.setItem(`plan_${currentUser.id}`, plan);
    }
  };

  return {
    userPlan,
    usage,
    canUseFeature,
    hasReachedLimit,
    hasLimit,
    getRemainingUsage,
    incrementQuizzes,
    incrementPdfGenerations,
    incrementChatMessages,
    incrementVideoDownloads,
    hasChatLimit,
    updateUserPlan
  };
};
