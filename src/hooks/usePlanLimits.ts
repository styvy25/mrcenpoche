import { useState, useEffect } from 'react';
import { useSubscription } from './useSubscription';
import { canUseFeature, incrementFeatureUsage } from '@/services/paymentService';
import { useToast } from './use-toast';
import { Feature } from './api-keys/types';

interface FeatureLimits {
  canUsePdfExport: boolean;
  canUseAiChat: boolean;
  canUseVideoAnalysis: boolean;
  canUseModules: boolean;
  checkAndUseFeature: (feature: Feature) => Promise<boolean>;
}

export const usePlanLimits = (): FeatureLimits => {
  const { subscription, isPremium } = useSubscription();
  const [canUsePdfExport, setCanUsePdfExport] = useState<boolean>(false);
  const [canUseAiChat, setCanUseAiChat] = useState<boolean>(false);
  const [canUseVideoAnalysis, setCanUseVideoAnalysis] = useState<boolean>(false);
  const [canUseModules, setCanUseModules] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // If user is premium, they can use all features
    if (isPremium) {
      setCanUsePdfExport(true);
      setCanUseAiChat(true);
      setCanUseVideoAnalysis(true);
      setCanUseModules(true);
      return;
    }

    // Otherwise, check each feature individually
    const checkFeatures = async () => {
      try {
        const [pdfExport, aiChat, videoAnalysis, modules] = await Promise.all([
          canUseFeature(Feature.PDF_EXPORT),
          canUseFeature(Feature.AI_CHAT),
          canUseFeature(Feature.VIDEO_ANALYSIS),
          canUseFeature(Feature.PREMIUM_MODULES)
        ]);

        setCanUsePdfExport(pdfExport);
        setCanUseAiChat(aiChat);
        setCanUseVideoAnalysis(videoAnalysis);
        setCanUseModules(modules);
      } catch (error) {
        console.error('Error checking feature limits:', error);
      }
    };

    checkFeatures();
  }, [subscription, isPremium]);

  const checkAndUseFeature = async (feature: Feature): Promise<boolean> => {
    try {
      // Premium users can always use features
      if (isPremium) return true;

      // For free users, check and increment usage counter
      const canUse = await canUseFeature(feature);
      
      if (!canUse) {
        toast({
          title: "Limite atteinte",
          description: "Vous avez atteint la limite d'utilisation pour cette fonctionnalité. Passez au plan Premium pour un accès illimité.",
          variant: "destructive",
        });
        return false;
      }

      // Increment usage counter
      await incrementFeatureUsage(feature);
      
      // Check specific feature
      if (feature === Feature.PDF_EXPORT) {
        setCanUsePdfExport(await canUseFeature(Feature.PDF_EXPORT));
      } else if (feature === Feature.AI_CHAT) {
        setCanUseAiChat(await canUseFeature(Feature.AI_CHAT));
      }
      
      return true;
    } catch (error) {
      console.error('Error using feature:', error);
      return false;
    }
  };

  return {
    canUsePdfExport,
    canUseAiChat,
    canUseVideoAnalysis,
    canUseModules,
    checkAndUseFeature
  };
};
