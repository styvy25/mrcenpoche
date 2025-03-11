
import { useState, useEffect, useCallback } from "react";
import { ApiKeys, ApiKeyStatus } from "./types";
import { validateApiKeys } from "./validation";
import { loadFromSupabase, loadFromLocalStorage, saveToSupabase, saveToLocalStorage } from "./storage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Get auth status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      // Set up auth change listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setIsAuthenticated(!!session);
          if (event === 'SIGNED_IN') {
            // Reload keys when user signs in
            loadKeys();
          }
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);

  const loadKeys = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let apiKeys: ApiKeys | null = null;
      
      // If user is authenticated, try to load from Supabase first
      if (isAuthenticated) {
        apiKeys = await loadFromSupabase();
        
        if (apiKeys) {
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
      
      // Fall back to localStorage if not authenticated or Supabase fetch failed
      apiKeys = loadFromLocalStorage();
      
      if (apiKeys) {
        setKeys(apiKeys);
        setKeyStatus({
          perplexity: !!apiKeys.perplexity,
          youtube: !!apiKeys.youtube,
          stripe: !!apiKeys.stripe
        });
      }
    } catch (err) {
      console.error("Error loading API keys:", err);
      setError("Failed to load API keys");
      toast({
        title: "Erreur",
        description: "Impossible de charger les clés API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, toast]);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const saveKeys = async () => {
    setIsTesting(true);
    try {
      // Test all keys
      const validationResults = await validateApiKeys(
        keys.perplexity,
        keys.youtube,
        keys.stripe
      );

      setKeyStatus(validationResults);

      // Store in Supabase if authenticated
      if (isAuthenticated) {
        await saveToSupabase(keys);
      }

      // Store in localStorage as fallback
      saveToLocalStorage(keys);
      
      return {
        success: true,
        activeServices: [
          validationResults.perplexity && 'Perplexity',
          validationResults.youtube && 'YouTube',
          validationResults.stripe && 'Stripe'
        ].filter(Boolean)
      };
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les clés API",
        variant: "destructive",
      });
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
    loadKeys,
    isAuthenticated
  };
};
