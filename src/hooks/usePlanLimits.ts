
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/auth/AuthContext';

// Types de plans disponibles
export type PlanType = 'free' | 'premium' | 'group';

// Structure définissant les limites pour chaque plan
export interface PlanLimits {
  chatMessagesPerDay: number;
  pdfGenerationsPerMonth: number;
  accessAllModules: boolean;
  certificatesEnabled: boolean;
  webinarsAccess: boolean;
  livestreamingEnabled: boolean;
}

// Définition des limites par plan
const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    chatMessagesPerDay: 10,
    pdfGenerationsPerMonth: 3,
    accessAllModules: false,
    certificatesEnabled: false,
    webinarsAccess: false,
    livestreamingEnabled: false
  },
  premium: {
    chatMessagesPerDay: Infinity,
    pdfGenerationsPerMonth: Infinity,
    accessAllModules: true,
    certificatesEnabled: true,
    webinarsAccess: true,
    livestreamingEnabled: true
  },
  group: {
    chatMessagesPerDay: Infinity,
    pdfGenerationsPerMonth: Infinity,
    accessAllModules: true,
    certificatesEnabled: true,
    webinarsAccess: true,
    livestreamingEnabled: true
  }
};

// Clés localStorage pour le suivi de l'utilisation
const STORAGE_KEYS = {
  CHAT_MESSAGES_TODAY: 'mrc_chat_messages_today',
  CHAT_MESSAGES_DATE: 'mrc_chat_messages_date',
  PDF_GENERATIONS_MONTH: 'mrc_pdf_generations_month',
  PDF_GENERATIONS_MONTH_DATE: 'mrc_pdf_generations_month_date',
  USER_PLAN: 'mrc_user_plan'
};

// Interface pour les statistiques d'utilisation
interface UsageStats {
  userPlan: PlanType;
  chatMessagesLimit: number;
  chatMessagesToday: number;
  pdfGenerationsLimit: number;
  pdfGenerationsThisMonth: number;
}

export function usePlanLimits() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [limits, setLimits] = useState<PlanLimits>(PLAN_LIMITS.free);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserPlan = async () => {
      try {
        // Essayer de charger depuis localStorage d'abord
        const savedPlan = localStorage.getItem(STORAGE_KEYS.USER_PLAN) as PlanType;
        if (savedPlan && Object.keys(PLAN_LIMITS).includes(savedPlan)) {
          setUserPlan(savedPlan);
          setLimits(PLAN_LIMITS[savedPlan]);
        } else {
          // Si aucun plan n'est sauvegardé, définir sur 'free'
          setUserPlan('free');
          setLimits(PLAN_LIMITS.free);
        }
      } catch (error) {
        console.error('Error loading user plan:', error);
        setUserPlan('free');
        setLimits(PLAN_LIMITS.free);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPlan();
  }, [user]);

  // Mettre à jour le plan de l'utilisateur
  const updateUserPlan = (newPlan: PlanType) => {
    if (!Object.keys(PLAN_LIMITS).includes(newPlan)) {
      toast({
        title: "Erreur",
        description: `Plan non reconnu: ${newPlan}`,
        variant: "destructive",
      });
      return false;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.USER_PLAN, newPlan);
      setUserPlan(newPlan);
      setLimits(PLAN_LIMITS[newPlan]);
      
      toast({
        title: "Plan mis à jour",
        description: `Votre plan a été mis à jour vers ${newPlan}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre plan",
        variant: "destructive",
      });
      return false;
    }
  };

  // Vérifier si l'utilisateur peut utiliser une fonctionnalité spécifique
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    return !!limits[feature];
  };

  // Vérifier si l'utilisateur a atteint la limite quotidienne de messages de chat
  const hasChatLimit = (): boolean => {
    return limits.chatMessagesPerDay !== Infinity;
  };

  // Obtenir le nombre de messages de chat utilisés aujourd'hui
  const getChatMessagesUsedToday = (): number => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES_DATE);
    
    if (savedDate !== today) {
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_DATE, today);
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY, '0');
      return 0;
    }
    
    return parseInt(localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY) || '0');
  };

  // Incrémenter le compteur de messages de chat
  const incrementChatMessages = (): boolean => {
    const usedToday = getChatMessagesUsedToday();
    
    if (usedToday >= limits.chatMessagesPerDay) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de messages. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY, (usedToday + 1).toString());
    return true;
  };

  // Obtenir le nombre de PDF générés ce mois-ci
  const getPdfGenerationsThisMonth = (): number => {
    const currentMonth = new Date().getMonth() + '-' + new Date().getFullYear();
    const savedMonth = localStorage.getItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH_DATE);
    
    if (savedMonth !== currentMonth) {
      localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH_DATE, currentMonth);
      localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH, '0');
      return 0;
    }
    
    return parseInt(localStorage.getItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH) || '0');
  };

  // Vérifier si l'utilisateur peut générer un PDF
  const canGeneratePdf = (): boolean => {
    if (userPlan !== 'free') return true;
    
    const generationsThisMonth = getPdfGenerationsThisMonth();
    return generationsThisMonth < limits.pdfGenerationsPerMonth;
  };

  // Incrémenter le compteur de générations de PDF
  const incrementPdfGenerations = (): boolean => {
    if (userPlan !== 'free') return true;
    
    const generationsThisMonth = getPdfGenerationsThisMonth();
    
    if (generationsThisMonth >= limits.pdfGenerationsPerMonth) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite mensuelle de générations PDF. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH, (generationsThisMonth + 1).toString());
    return true;
  };
  
  // Vérifier si l'utilisateur peut accéder à tous les modules
  const canAccessAllModules = (): boolean => {
    return limits.accessAllModules;
  };

  // Récupérer toutes les statistiques d'utilisation
  const getUsageStats = (): UsageStats => {
    return {
      userPlan,
      chatMessagesLimit: limits.chatMessagesPerDay,
      chatMessagesToday: getChatMessagesUsedToday(),
      pdfGenerationsLimit: limits.pdfGenerationsPerMonth,
      pdfGenerationsThisMonth: getPdfGenerationsThisMonth()
    };
  };

  // Vérifier si l'utilisateur peut envoyer un message dans le chat
  const canSendChatMessage = (): boolean => {
    if (userPlan !== 'free') return true;
    return getChatMessagesUsedToday() < limits.chatMessagesPerDay;
  };

  return {
    userPlan,
    limits,
    isLoading,
    updateUserPlan,
    canUseFeature,
    hasChatLimit,
    getChatMessagesUsedToday,
    incrementChatMessages,
    getPdfGenerationsThisMonth,
    canGeneratePdf,
    incrementPdfGenerations,
    canAccessAllModules,
    getUsageStats,
    canSendChatMessage
  };
}

export default usePlanLimits;
