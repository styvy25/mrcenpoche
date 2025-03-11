
import { useState, useEffect } from "react";
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { testYouTubeApiKey, refreshYouTubeCache } from "@/components/assistant/services/youtube";

export interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

export interface ApiKeys {
  perplexity: string;
  youtube: string;
  stripe: string;
}

export const useApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeys>({
    perplexity: "",
    youtube: "",
    stripe: ""
  });
  
  const [keyStatus, setKeyStatus] = useState<ApiKeyStatus>({
    perplexity: false,
    youtube: false,
    stripe: false
  });
  
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem("api_keys");
      if (savedKeys) {
        const parsedKeys = JSON.parse(savedKeys);
        setKeys(parsedKeys);
        setKeyStatus({
          perplexity: !!parsedKeys.perplexity,
          youtube: !!parsedKeys.youtube,
          stripe: !!parsedKeys.stripe
        });
      }
    } catch (error) {
      console.error("Error loading API keys:", error);
    }
  }, []);

  const testStripeKey = async (key: string) => {
    return key.startsWith("sk_") || key.startsWith("pk_");
  };

  const saveKeys = async () => {
    setIsTesting(true);
    try {
      let perplexityStatus = false;
      let youtubeStatus = false;
      let stripeStatus = false;

      if (keys.perplexity) {
        perplexityStatus = await testPerplexityApiKey(keys.perplexity);
      }
      
      if (keys.youtube) {
        youtubeStatus = await testYouTubeApiKey(keys.youtube);
        if (youtubeStatus) {
          await refreshYouTubeCache(keys.youtube);
        }
      }
      
      if (keys.stripe) {
        stripeStatus = await testStripeKey(keys.stripe);
      }

      setKeyStatus({
        perplexity: perplexityStatus,
        youtube: youtubeStatus,
        stripe: stripeStatus
      });

      localStorage.setItem("api_keys", JSON.stringify(keys));
      
      return {
        success: true,
        activeServices: [
          perplexityStatus && 'Perplexity',
          youtubeStatus && 'YouTube',
          stripeStatus && 'Stripe'
        ].filter(Boolean)
      };
    } catch (error) {
      console.error("Error saving API keys:", error);
      return { success: false, error };
    } finally {
      setIsTesting(false);
    }
  };

  const updateKey = (service: keyof ApiKeys, value: string) => {
    setKeys(prev => ({ ...prev, [service]: value }));
  };

  return {
    keys,
    keyStatus,
    isTesting,
    updateKey,
    saveKeys
  };
};
