
import { supabase } from "@/integrations/supabase/client";

const LOCAL_STORAGE_KEY = "api_keys";

/**
 * Get YouTube API key from local storage or Supabase
 */
export const getYouTubeApiKey = async (): Promise<string | null> => {
  try {
    // First check local storage
    const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedKeys) {
      const parsedKeys = JSON.parse(storedKeys);
      if (parsedKeys.youtube) {
        return parsedKeys.youtube;
      }
    }

    // If not in local storage, try Supabase
    const { data, error } = await supabase
      .from('api_keys_config')
      .select('youtube_key')
      .single();

    if (error || !data) {
      console.error("Error fetching YouTube API key from Supabase:", error);
      return null;
    }

    // Save to local storage for future use
    if (data.youtube_key) {
      const keys = storedKeys ? JSON.parse(storedKeys) : {};
      keys.youtube = data.youtube_key;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keys));
      return data.youtube_key;
    }

    return null;
  } catch (error) {
    console.error("Error getting YouTube API key:", error);
    return null;
  }
};

/**
 * Save YouTube API key to local storage and optionally to Supabase
 */
export const saveYouTubeApiKey = async (apiKey: string, saveToSupabase: boolean = false): Promise<boolean> => {
  try {
    // Save to local storage
    const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
    const keys = storedKeys ? JSON.parse(storedKeys) : {};
    keys.youtube = apiKey;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keys));

    // Save to Supabase if requested
    if (saveToSupabase) {
      const { error } = await supabase.from('api_keys_config').upsert({
        youtube_key: apiKey,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

      if (error) {
        console.error("Error saving YouTube API key to Supabase:", error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving YouTube API key:", error);
    return false;
  }
};

/**
 * Get API keys with defaults
 */
export const getApiKeysWithDefaults = async () => {
  const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
  let keys = storedKeys ? JSON.parse(storedKeys) : {};
  
  // Try to get from Supabase if not in localStorage
  if (!keys.youtube || !keys.perplexity) {
    try {
      const { data, error } = await supabase
        .from('api_keys_config')
        .select('youtube_key, perplexity_key')
        .single();
      
      if (data && !error) {
        keys = {
          ...keys,
          youtube: keys.youtube || data.youtube_key,
          perplexity: keys.perplexity || data.perplexity_key
        };
        
        // Update localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keys));
      }
    } catch (error) {
      console.error("Error fetching API keys from Supabase:", error);
    }
  }
  
  return keys;
};
