
import { supabase } from "@/integrations/supabase/client";
import { ApiKeys } from "@/hooks/api-keys/types";

export const loadApiKeysFromSupabase = async (): Promise<ApiKeys | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('api_keys_config')
      .select('youtube_key, perplexity_key, stripe_key')
      .eq('user_id', user.id)
      .single();
      
    if (error || !data) {
      console.error("Error loading API keys from Supabase:", error);
      return null;
    }
    
    return {
      youtube: data.youtube_key || null,
      perplexity: data.perplexity_key || null,
      stripe: data.stripe_key || null
    };
  } catch (error) {
    console.error("Error in loadApiKeysFromSupabase:", error);
    return null;
  }
};

export const saveApiKeysToSupabase = async (keys: ApiKeys): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    const { error } = await supabase.from('api_keys_config').upsert({
      user_id: user.id,
      youtube_key: keys.youtube,
      perplexity_key: keys.perplexity,
      stripe_key: keys.stripe,
      updated_at: new Date()
    });
    
    if (error) {
      console.error("Error saving API keys to Supabase:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in saveApiKeysToSupabase:", error);
    return false;
  }
};

export const getApiKeysWithDefaults = async () => {
  const storedKeys = localStorage.getItem('api_keys');
  let keys = storedKeys ? JSON.parse(storedKeys) : {};
  
  // Try to get from Supabase if not in localStorage
  if (!keys.youtube || !keys.perplexity) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('api_keys_config')
          .select('youtube_key, perplexity_key')
          .eq('user_id', user.id)
          .single();
        
        if (data && !error) {
          keys = {
            ...keys,
            youtube: keys.youtube || data.youtube_key,
            perplexity: keys.perplexity || data.perplexity_key
          };
          
          // Update localStorage
          localStorage.setItem('api_keys', JSON.stringify(keys));
        }
      }
    } catch (error) {
      console.error("Error fetching API keys from Supabase:", error);
    }
  }
  
  return keys;
};

export const getYouTubeApiKey = async (): Promise<string | null> => {
  // First check local storage
  const storedKeys = localStorage.getItem('api_keys');
  if (storedKeys) {
    const parsedKeys = JSON.parse(storedKeys);
    if (parsedKeys.youtube) {
      return parsedKeys.youtube;
    }
  }

  // If not in local storage, try Supabase
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('api_keys_config')
      .select('youtube_key')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error("Error fetching YouTube API key:", error);
      return null;
    }

    return data?.youtube_key || null;
  } catch (error) {
    console.error("Error getting YouTube API key:", error);
    return null;
  }
};
