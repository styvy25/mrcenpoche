
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
        // If error is "No rows found", it's normal for a new user
        if (error.code === 'PGRST116') {
          console.log("No API keys found for this user");
          return null;
        }
        
        console.error("Error retrieving API keys:", error);
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
      // Check if user already has API keys
      const { data: existingData, error: checkError } = await supabase
        .from('api_keys_config')
        .select('id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      let result;
      
      if (!checkError && existingData) {
        // Update existing keys
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
        // Insert new keys
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
        console.error("Error saving API keys:", result.error);
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

// Ensure keys are persisted to both localStorage and Supabase
export const persistApiKeys = async (keys: ApiKeys): Promise<boolean> => {
  // Save to localStorage as a fallback for offline access
  saveToLocalStorage(keys);
  
  // For authenticated users, also save to Supabase for permanent storage
  const result = await saveToSupabase(keys);
  
  return result;
};

// Load keys with preference for Supabase data (more reliable)
export const loadApiKeys = async (): Promise<ApiKeys | null> => {
  // Try to get keys from Supabase first (authenticated storage)
  const supabaseKeys = await loadFromSupabase();
  
  if (supabaseKeys) {
    // Sync with local storage to ensure consistency
    saveToLocalStorage(supabaseKeys);
    return supabaseKeys;
  }
  
  // Fall back to localStorage if Supabase failed or user is not authenticated
  return loadFromLocalStorage();
};
