
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export enum Feature {
  PDF_GENERATION = 'pdfGeneration',
  YOUTUBE_ANALYSIS = 'youtubeAnalysis',
  AI_CHAT = 'aiChat',
  PREMIUM_MODULES = 'premiumModules',
  MAX_CHATS = 'maxChats',
  VOICE_MESSAGES = 'voiceMessages',
  ATTACHMENTS = 'attachments'
}

export enum Plan {
  FREE = 'free',
  PREMIUM = 'premium'
}

// Interface pour les limites d'utilisation
interface UsageLimits {
  [Feature.PDF_GENERATION]: number;
  [Feature.YOUTUBE_ANALYSIS]: number;
  [Feature.AI_CHAT]: number;
  [Feature.MAX_CHATS]: number;
  [Feature.VOICE_MESSAGES]: number;
  [Feature.ATTACHMENTS]: number;
}

// Limites par défaut pour chaque plan
const DEFAULT_LIMITS: Record<Plan, UsageLimits> = {
  [Plan.FREE]: {
    [Feature.PDF_GENERATION]: 5,
    [Feature.YOUTUBE_ANALYSIS]: 3,
    [Feature.AI_CHAT]: 20,
    [Feature.MAX_CHATS]: 5,
    [Feature.VOICE_MESSAGES]: 10,
    [Feature.ATTACHMENTS]: 5
  },
  [Plan.PREMIUM]: {
    [Feature.PDF_GENERATION]: 1000,
    [Feature.YOUTUBE_ANALYSIS]: 1000,
    [Feature.AI_CHAT]: 1000,
    [Feature.MAX_CHATS]: 1000,
    [Feature.VOICE_MESSAGES]: 1000,
    [Feature.ATTACHMENTS]: 1000
  }
};

export const usePlanLimits = () => {
  const { currentUser } = useAuth();
  const [usage, setUsage] = useState<Partial<UsageLimits>>({});
  const userPlan = currentUser?.subscription?.plan || Plan.FREE;

  // Charger l'utilisation actuelle depuis Supabase
  useEffect(() => {
    const loadUsage = async () => {
      if (!currentUser) return;

      try {
        // Chargement des statistiques de PDF
        const { count: pdfCount } = await supabase
          .from('pdf_generation_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Chargement des analyses YouTube
        const { count: youtubeCount } = await supabase
          .from('pdf_documents')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .eq('document_type', 'youtube_analysis')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Chargement des chats IA
        const { count: chatCount } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        setUsage({
          [Feature.PDF_GENERATION]: pdfCount || 0,
          [Feature.YOUTUBE_ANALYSIS]: youtubeCount || 0,
          [Feature.AI_CHAT]: chatCount || 0
        });
      } catch (error) {
        console.error("Erreur lors du chargement des limites d'utilisation:", error);
      }
    };

    loadUsage();
  }, [currentUser]);

  // Obtenir la limite pour une fonctionnalité
  const getLimitForFeature = (feature: Feature): number => {
    return DEFAULT_LIMITS[userPlan][feature as keyof UsageLimits] || 0;
  };

  // Vérifier si la fonctionnalité a une limite
  const hasLimit = (feature: Feature): boolean => {
    return userPlan === Plan.FREE;
  };

  // Obtenir l'utilisation actuelle pour une fonctionnalité
  const getUsage = (feature: Feature): number => {
    return usage[feature as keyof UsageLimits] || 0;
  };

  // Vérifier si une limite a été atteinte
  const hasReachedLimit = (feature: Feature): boolean => {
    if (!hasLimit(feature)) return false;
    return getUsage(feature) >= getLimitForFeature(feature);
  };

  // Obtenir l'utilisation restante pour une fonctionnalité
  const getRemainingUsage = (feature: Feature): number => {
    if (!hasLimit(feature)) return 9999;
    return Math.max(0, getLimitForFeature(feature) - getUsage(feature));
  };

  // Vérifier si l'utilisateur peut générer un PDF
  const canGeneratePdf = (): boolean => {
    return !hasReachedLimit(Feature.PDF_GENERATION);
  };

  // Vérifier si l'utilisateur peut analyser YouTube
  const canAnalyzeYoutube = (): boolean => {
    return !hasReachedLimit(Feature.YOUTUBE_ANALYSIS);
  };

  // Vérifier si l'utilisateur a accès à tous les modules
  const canAccessAllModules = (): boolean => {
    return userPlan === Plan.PREMIUM;
  };

  // Incrémenter l'utilisation de PDF
  const incrementPdfGenerations = async (): Promise<boolean> => {
    if (!currentUser) return false;
    if (hasReachedLimit(Feature.PDF_GENERATION)) return false;

    try {
      const { data } = await supabase.rpc('increment_pdf_generations', {
        user_id: currentUser.id
      });
      
      if (data) {
        setUsage(prev => ({
          ...prev,
          [Feature.PDF_GENERATION]: (prev[Feature.PDF_GENERATION] || 0) + 1
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur lors de l'incrémentation des générations de PDF:", error);
      return false;
    }
  };

  // Incrémenter l'utilisation des analyses YouTube
  const incrementYoutubeAnalysis = (): boolean => {
    if (!currentUser) return false;
    if (hasReachedLimit(Feature.YOUTUBE_ANALYSIS)) return false;

    setUsage(prev => ({
      ...prev,
      [Feature.YOUTUBE_ANALYSIS]: (prev[Feature.YOUTUBE_ANALYSIS] || 0) + 1
    }));
    
    return true;
  };

  // Vérifier si l'utilisateur a une limite de chat
  const hasChatLimit = (): boolean => {
    return userPlan === Plan.FREE;
  };

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    canGeneratePdf,
    canAnalyzeYoutube,
    canAccessAllModules,
    incrementPdfGenerations,
    incrementYoutubeAnalysis,
    hasReachedLimit,
    getRemainingUsage,
    hasChatLimit
  };
};
