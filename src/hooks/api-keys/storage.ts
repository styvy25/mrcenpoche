
import { supabase } from "@/integrations/supabase/client";
import { ApiKeys } from "./types";

export const loadFromSupabase = async (): Promise<ApiKeys | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase
        .from('api_keys_config')
        .select('perplexity_key, youtube_key, stripe_key')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (error) {
        // Si l'erreur est "No rows found", c'est normal pour un nouvel utilisateur
        if (error.code === 'PGRST116') {
          console.log("Pas de clés API trouvées pour cet utilisateur");
          return null;
        }
        
        console.error("Erreur lors de la récupération des clés API:", error);
        return null;
      }
      
      return {
        perplexity: data.perplexity_key || "",
        youtube: data.youtube_key || "",
        stripe: data.stripe_key || ""
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching from Supabase:", err);
    return null;
  }
};

export const loadFromLocalStorage = (): ApiKeys | null => {
  try {
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      return JSON.parse(savedKeys);
    }
    return null;
  } catch (error) {
    console.error("Error loading API keys from localStorage:", error);
    return null;
  }
};

export const saveToSupabase = async (keys: ApiKeys): Promise<boolean> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      // Vérifier si l'utilisateur a déjà des clés API
      const { data: existingData, error: checkError } = await supabase
        .from('api_keys_config')
        .select('id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      let result;
      
      if (!checkError && existingData) {
        // Mettre à jour les clés existantes
        result = await supabase
          .from('api_keys_config')
          .update({
            perplexity_key: keys.perplexity || null,
            youtube_key: keys.youtube || null,
            stripe_key: keys.stripe || null,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', sessionData.session.user.id);
      } else {
        // Insérer de nouvelles clés
        result = await supabase
          .from('api_keys_config')
          .insert({
            user_id: sessionData.session.user.id,
            perplexity_key: keys.perplexity || null,
            youtube_key: keys.youtube || null,
            stripe_key: keys.stripe || null
          });
      }
      
      if (result.error) {
        console.error("Erreur lors de la sauvegarde des clés API:", result.error);
        return false;
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return false;
  }
};

export const saveToLocalStorage = (keys: ApiKeys): void => {
  localStorage.setItem("api_keys", JSON.stringify(keys));
};
