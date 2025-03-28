
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from "@/integrations/supabase/client";

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
        // First try to load from Supabase if the user is logged in
        if (user?.id) {
          const { data, error } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single();
            
          if (data && !error) {
            // Convert the plan_type to our PlanType
            const planType = data.plan_type as PlanType;
            if (Object.keys(PLAN_LIMITS).includes(planType)) {
              setUserPlan(planType);
              setLimits(PLAN_LIMITS[planType]);
              localStorage.setItem(STORAGE_KEYS.USER_PLAN, planType);
              setIsLoading(false);
              return;
            }
          }
        }
        
        // Try to load from localStorage as fallback
        const savedPlan = localStorage.getItem(STORAGE_KEYS.USER_PLAN) as PlanType;
        if (savedPlan && Object.keys(PLAN_LIMITS).includes(savedPlan)) {
          setUserPlan(savedPlan);
          setLimits(PLAN_LIMITS[savedPlan]);
        } else {
          // If no plan is saved, set to 'free'
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

  // Update the user's plan
  const updateUserPlan = async (newPlan: PlanType) => {
    if (!Object.keys(PLAN_LIMITS).includes(newPlan)) {
      toast({
        title: "Erreur",
        description: `Plan non reconnu: ${newPlan}`,
        variant: "destructive",
      });
      return false;
    }

    try {
      // Update in Supabase if logged in
      if (user?.id) {
        const { error } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: user.id,
            plan_type: newPlan,
            status: 'active',
            start_date: new Date().toISOString(),
            // For premium plans, set end date to 1 month from now
            end_date: newPlan !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null
          });
          
        if (error) {
          throw error;
        }
      }
      
      // Update in localStorage
      localStorage.setItem(STORAGE_KEYS.USER_PLAN, newPlan);
      setUserPlan(newPlan);
      setLimits(PLAN_LIMITS[newPlan]);
      
      toast({
        title: "Plan mis à jour",
        description: `Votre plan a été mis à jour vers ${newPlan}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error updating user plan:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre plan",
        variant: "destructive",
      });
      return false;
    }
  };

  // Check if the user can use a specific feature
  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    return !!limits[feature];
  };

  // Check if the user has reached the daily chat message limit
  const hasChatLimit = (): boolean => {
    return limits.chatMessagesPerDay !== Infinity;
  };

  // Get the number of chat messages used today
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

  // Increment the chat message counter
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

  // Get the number of PDFs generated this month
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

  // Check if the user can generate a PDF
  const canGeneratePdf = (): boolean => {
    if (userPlan !== 'free') return true;
    
    const generationsThisMonth = getPdfGenerationsThisMonth();
    return generationsThisMonth < limits.pdfGenerationsPerMonth;
  };

  // Increment the PDF generations counter
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
  
  // Check if the user can access all modules
  const canAccessAllModules = (): boolean => {
    return limits.accessAllModules;
  };

  // Get all usage statistics
  const getUsageStats = (): UsageStats => {
    return {
      userPlan,
      chatMessagesLimit: limits.chatMessagesPerDay,
      chatMessagesToday: getChatMessagesUsedToday(),
      pdfGenerationsLimit: limits.pdfGenerationsPerMonth,
      pdfGenerationsThisMonth: getPdfGenerationsThisMonth()
    };
  };

  // Check if the user can send a chat message
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
