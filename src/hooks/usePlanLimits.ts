
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Feature, PlanType } from '@/types';

// Interface for usage limits
interface UsageLimits {
  [Feature.PDF_GENERATION]: number;
  [Feature.YOUTUBE_ANALYSIS]: number;
  [Feature.AI_CHAT]: number;
  [Feature.MAX_CHATS]: number;
  [Feature.VOICE_MESSAGES]: number;
  [Feature.ATTACHMENTS]: number;
  [Feature.CHAT]: number;
}

// Default limits for each plan
const DEFAULT_LIMITS: Record<PlanType, UsageLimits> = {
  [PlanType.FREE]: {
    [Feature.PDF_GENERATION]: 5,
    [Feature.YOUTUBE_ANALYSIS]: 3,
    [Feature.AI_CHAT]: 20,
    [Feature.MAX_CHATS]: 5,
    [Feature.VOICE_MESSAGES]: 10,
    [Feature.ATTACHMENTS]: 5,
    [Feature.CHAT]: 20
  },
  [PlanType.PREMIUM]: {
    [Feature.PDF_GENERATION]: 1000,
    [Feature.YOUTUBE_ANALYSIS]: 1000,
    [Feature.AI_CHAT]: 1000,
    [Feature.MAX_CHATS]: 1000,
    [Feature.VOICE_MESSAGES]: 1000,
    [Feature.ATTACHMENTS]: 1000,
    [Feature.CHAT]: 1000
  }
};

export const usePlanLimits = () => {
  const { currentUser } = useAuth();
  const [usage, setUsage] = useState<Partial<UsageLimits>>({});
  const userPlan = currentUser?.subscription?.plan || PlanType.FREE;

  // Load usage from Supabase
  useEffect(() => {
    const loadUsage = async () => {
      if (!currentUser) return;

      try {
        // Load PDF generation stats
        const { count: pdfCount } = await supabase
          .from('pdf_generation_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Load YouTube analysis stats
        const { count: youtubeCount } = await supabase
          .from('pdf_documents')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .eq('document_type', 'youtube_analysis')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Load AI chat stats
        const { count: chatCount } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        setUsage({
          [Feature.PDF_GENERATION]: pdfCount || 0,
          [Feature.YOUTUBE_ANALYSIS]: youtubeCount || 0,
          [Feature.AI_CHAT]: chatCount || 0,
          [Feature.CHAT]: chatCount || 0
        });
      } catch (error) {
        console.error("Error loading usage limits:", error);
      }
    };

    loadUsage();
  }, [currentUser]);

  // Get limit for a feature
  const getLimitForFeature = (feature: Feature): number => {
    return DEFAULT_LIMITS[userPlan as PlanType][feature as keyof UsageLimits] || 0;
  };

  // Check if a feature has a limit
  const hasLimit = (feature: Feature): boolean => {
    return userPlan === PlanType.FREE;
  };

  // Get current usage for a feature
  const getUsage = (feature: Feature): number => {
    return usage[feature as keyof UsageLimits] || 0;
  };

  // Check if limit has been reached
  const hasReachedLimit = (feature: Feature): boolean => {
    if (!hasLimit(feature)) return false;
    return getUsage(feature) >= getLimitForFeature(feature);
  };

  // Get remaining usage for a feature
  const getRemainingUsage = (feature: Feature): number => {
    if (!hasLimit(feature)) return 9999;
    return Math.max(0, getLimitForFeature(feature) - getUsage(feature));
  };

  // Check if user has access to a feature
  const hasFeatureAccess = (feature: Feature): boolean => {
    return !hasReachedLimit(feature);
  };

  // Increment PDF generations count
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
      console.error("Error incrementing PDF generations:", error);
      return false;
    }
  };

  // Increment YouTube analysis count
  const incrementYoutubeAnalysis = (): boolean => {
    if (!currentUser) return false;
    if (hasReachedLimit(Feature.YOUTUBE_ANALYSIS)) return false;

    setUsage(prev => ({
      ...prev,
      [Feature.YOUTUBE_ANALYSIS]: (prev[Feature.YOUTUBE_ANALYSIS] || 0) + 1
    }));
    
    return true;
  };

  // Increment chat messages count
  const incrementChatMessages = (): boolean => {
    if (!currentUser) return false;
    if (hasReachedLimit(Feature.CHAT)) return false;

    setUsage(prev => ({
      ...prev,
      [Feature.CHAT]: (prev[Feature.CHAT] || 0) + 1
    }));
    
    return true;
  };

  return {
    userPlan,
    getLimitForFeature,
    hasLimit,
    getUsage,
    hasFeatureAccess,
    incrementPdfGenerations,
    incrementYoutubeAnalysis,
    incrementChatMessages,
    hasReachedLimit,
    getRemainingUsage
  };
};
