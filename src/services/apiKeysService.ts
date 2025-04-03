
import { supabase } from "@/integrations/supabase/client";
import { ApiKeys } from "@/hooks/api-keys/types";

// Clés API par défaut (pour mode hors-ligne)
const DEFAULT_API_KEYS: ApiKeys = {
  perplexity: "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",
  youtube: "AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w",
  stripe: ""
};

// Obtenir les clés API (priorité: Supabase > localStorage > défaut)
export const getApiKeys = async (): Promise<ApiKeys> => {
  try {
    // 1. Vérifier si l'utilisateur est connecté
    const { data: sessionData } = await supabase.auth.getSession();
    
    // 2. Si connecté, essayer d'obtenir les clés de Supabase
    if (sessionData?.session) {
      const { data, error } = await supabase
        .from('api_keys_config')
        .select('perplexity_key, youtube_key, stripe_key')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (!error && data) {
        const keys: ApiKeys = {
          perplexity: data.perplexity_key || DEFAULT_API_KEYS.perplexity,
          youtube: data.youtube_key || DEFAULT_API_KEYS.youtube,
          stripe: data.stripe_key || DEFAULT_API_KEYS.stripe
        };
        
        // Sauvegarder dans localStorage pour accès plus rapide
        localStorage.setItem("api_keys", JSON.stringify(keys));
        return keys;
      }
    }
    
    // 3. Si pas connecté ou erreur, essayer localStorage
    const localStorageKeys = localStorage.getItem("api_keys");
    if (localStorageKeys) {
      try {
        const parsedKeys = JSON.parse(localStorageKeys);
        return {
          perplexity: parsedKeys.perplexity || DEFAULT_API_KEYS.perplexity,
          youtube: parsedKeys.youtube || DEFAULT_API_KEYS.youtube,
          stripe: parsedKeys.stripe || DEFAULT_API_KEYS.stripe
        };
      } catch (e) {
        console.error("Erreur de lecture des clés API du localStorage:", e);
      }
    }
    
    // 4. Utiliser les clés par défaut en dernier recours
    return DEFAULT_API_KEYS;
  } catch (error) {
    console.error("Erreur lors de la récupération des clés API:", error);
    return DEFAULT_API_KEYS;
  }
};

// Sauvegarder les clés API (à Supabase si connecté, sinon localStorage)
export const saveApiKeys = async (keys: ApiKeys): Promise<boolean> => {
  try {
    // Toujours sauvegarder en local
    localStorage.setItem("api_keys", JSON.stringify({
      perplexity: keys.perplexity || DEFAULT_API_KEYS.perplexity,
      youtube: keys.youtube || DEFAULT_API_KEYS.youtube,
      stripe: keys.stripe || DEFAULT_API_KEYS.stripe
    }));
    
    // Si connecté, sauvegarder sur Supabase
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      // Vérifier si l'enregistrement existe
      const { data: existingData } = await supabase
        .from('api_keys_config')
        .select('id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      let result;
      if (existingData) {
        // Mettre à jour
        result = await supabase
          .from('api_keys_config')
          .update({
            perplexity_key: keys.perplexity || DEFAULT_API_KEYS.perplexity,
            youtube_key: keys.youtube || DEFAULT_API_KEYS.youtube,
            stripe_key: keys.stripe || DEFAULT_API_KEYS.stripe
          })
          .eq('user_id', sessionData.session.user.id);
      } else {
        // Insérer
        result = await supabase
          .from('api_keys_config')
          .insert({
            user_id: sessionData.session.user.id,
            perplexity_key: keys.perplexity || DEFAULT_API_KEYS.perplexity,
            youtube_key: keys.youtube || DEFAULT_API_KEYS.youtube,
            stripe_key: keys.stripe || DEFAULT_API_KEYS.stripe
          });
      }
      
      if (result.error) {
        console.error("Erreur lors de la sauvegarde des clés API sur Supabase:", result.error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des clés API:", error);
    return false;
  }
};

// Initialiser les clés API au démarrage de l'application
export const initializeApiKeys = async (): Promise<void> => {
  try {
    await getApiKeys();
    console.log("Clés API initialisées avec succès");
  } catch (error) {
    console.error("Erreur lors de l'initialisation des clés API:", error);
  }
};

// Tester si une clé API est valide
export const isValidApiKey = (key: string | undefined): boolean => {
  return !!key && key.length > 10;
};
