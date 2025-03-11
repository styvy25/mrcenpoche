
import { useState, useEffect } from "react";
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { testYouTubeApiKey, refreshYouTubeCache } from "@/components/assistant/services/youtube";
import { supabase } from "@/integrations/supabase/client";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is authenticated
  const isAuthenticated = !!supabase.auth.getSession();

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let apiKeys: ApiKeys;
      
      // If user is authenticated, try to load from Supabase first
      if (isAuthenticated) {
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData?.session) {
            const response = await fetch('/api/manage-api-keys', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionData.session.access_token}`
              },
              body: JSON.stringify({ action: 'get' })
            });
            
            const result = await response.json();
            
            if (result.success && result.data) {
              apiKeys = result.data;
              
              // Update key status based on presence of keys
              setKeyStatus({
                perplexity: !!apiKeys.perplexity,
                youtube: !!apiKeys.youtube,
                stripe: !!apiKeys.stripe
              });
              
              setKeys(apiKeys);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.error("Error fetching from Supabase:", err);
          // Fall back to localStorage if fetching from Supabase fails
        }
      }
      
      // Fall back to localStorage if not authenticated or Supabase fetch failed
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
        console.error("Error loading API keys from localStorage:", error);
      }
    } catch (err) {
      console.error("Error loading API keys:", err);
      setError("Failed to load API keys");
    } finally {
      setIsLoading(false);
    }
  };

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

      // Store in Supabase if authenticated
      if (isAuthenticated) {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session) {
          const response = await fetch('/api/manage-api-keys', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionData.session.access_token}`
            },
            body: JSON.stringify({ 
              action: 'save',
              keys: keys
            })
          });
          
          const result = await response.json();
          
          if (!result.success) {
            console.error("Error saving to Supabase:", result.error);
            throw new Error(result.error || "Failed to save to Supabase");
          }
        }
      }

      // Store in localStorage as fallback
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
    isLoading,
    error,
    updateKey,
    saveKeys,
    loadKeys
  };
};
