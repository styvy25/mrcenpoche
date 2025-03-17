
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
}

// Définition des limites par plan
const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    chatMessagesPerDay: 10,
    pdfGenerationsPerMonth: 3,
    accessAllModules: false,
    certificatesEnabled: false,
    webinarsAccess: false
  },
  premium: {
    chatMessagesPerDay: Infinity,
    pdfGenerationsPerMonth: Infinity,
    accessAllModules: true,
    certificatesEnabled: true,
    webinarsAccess: true
  },
  group: {
    chatMessagesPerDay: Infinity,
    pdfGenerationsPerMonth: Infinity,
    accessAllModules: true,
    certificatesEnabled: true,
    webinarsAccess: true
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

export function usePlanLimits() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [chatMessagesToday, setChatMessagesToday] = useState(0);
  const [pdfGenerationsThisMonth, setPdfGenerationsThisMonth] = useState(0);
  
  // Charger et initialiser les compteurs à partir du localStorage
  useEffect(() => {
    if (!user) return;
    
    // Chargement du plan utilisateur
    const savedPlan = localStorage.getItem(STORAGE_KEYS.USER_PLAN) as PlanType || 'free';
    setUserPlan(savedPlan);
    
    // Réinitialiser le compteur de messages quotidien si nécessaire
    const lastChatDate = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES_DATE);
    const today = new Date().toDateString();
    
    if (lastChatDate !== today) {
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY, '0');
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_DATE, today);
      setChatMessagesToday(0);
    } else {
      const count = parseInt(localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY) || '0', 10);
      setChatMessagesToday(count);
    }
    
    // Réinitialiser le compteur mensuel de génération PDF si nécessaire
    const lastPdfMonth = localStorage.getItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH_DATE);
    const currentMonth = new Date().toISOString().slice(0, 7); // Format YYYY-MM
    
    if (lastPdfMonth !== currentMonth) {
      localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH, '0');
      localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH_DATE, currentMonth);
      setPdfGenerationsThisMonth(0);
    } else {
      const count = parseInt(localStorage.getItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH) || '0', 10);
      setPdfGenerationsThisMonth(count);
    }
  }, [user]);
  
  // Vérifier si l'utilisateur peut envoyer un message chat
  const canSendChatMessage = () => {
    if (userPlan !== 'free') return true;
    
    return chatMessagesToday < PLAN_LIMITS.free.chatMessagesPerDay;
  };
  
  // Incrémenter le compteur de messages chat
  const incrementChatMessages = () => {
    if (!user) return false;
    
    if (!canSendChatMessage()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de messages quotidienne. Passez à l'offre premium pour un accès illimité.",
        variant: "destructive"
      });
      return false;
    }
    
    const newCount = chatMessagesToday + 1;
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES_TODAY, newCount.toString());
    setChatMessagesToday(newCount);
    return true;
  };
  
  // Vérifier si l'utilisateur peut générer un PDF
  const canGeneratePdf = () => {
    if (userPlan !== 'free') return true;
    
    return pdfGenerationsThisMonth < PLAN_LIMITS.free.pdfGenerationsPerMonth;
  };
  
  // Incrémenter le compteur de génération PDF
  const incrementPdfGenerations = () => {
    if (!user) return false;
    
    if (!canGeneratePdf()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de génération de PDF mensuelle. Passez à l'offre premium pour un accès illimité.",
        variant: "destructive"
      });
      return false;
    }
    
    const newCount = pdfGenerationsThisMonth + 1;
    localStorage.setItem(STORAGE_KEYS.PDF_GENERATIONS_MONTH, newCount.toString());
    setPdfGenerationsThisMonth(newCount);
    return true;
  };
  
  // Vérifier si l'utilisateur a accès à tous les modules
  const canAccessAllModules = () => {
    return userPlan !== 'free' || PLAN_LIMITS.free.accessAllModules;
  };
  
  // Vérifier si l'utilisateur a accès aux certificats
  const canAccessCertificates = () => {
    return userPlan !== 'free' || PLAN_LIMITS.free.certificatesEnabled;
  };
  
  // Mettre à jour le plan de l'utilisateur
  const updateUserPlan = (plan: PlanType) => {
    localStorage.setItem(STORAGE_KEYS.USER_PLAN, plan);
    setUserPlan(plan);
    
    toast({
      title: "Plan mis à jour",
      description: `Votre plan a été mis à jour vers ${plan === 'premium' ? 'Premium' : plan === 'group' ? 'Groupe' : 'Gratuit'}.`,
      variant: "default"
    });
  };
  
  // Obtenir les limites du plan actuel
  const getCurrentPlanLimits = (): PlanLimits => {
    return PLAN_LIMITS[userPlan];
  };
  
  // Statistiques d'utilisation
  const getUsageStats = () => {
    return {
      chatMessagesToday,
      chatMessagesLimit: PLAN_LIMITS[userPlan].chatMessagesPerDay,
      pdfGenerationsThisMonth,
      pdfGenerationsLimit: PLAN_LIMITS[userPlan].pdfGenerationsPerMonth,
      userPlan
    };
  };
  
  return {
    userPlan,
    updateUserPlan,
    canSendChatMessage,
    incrementChatMessages,
    canGeneratePdf,
    incrementPdfGenerations,
    canAccessAllModules,
    canAccessCertificates,
    getCurrentPlanLimits,
    getUsageStats
  };
}
