
import { supabase } from "@/integrations/supabase/client";
import { ApiKeys } from "@/hooks/api-keys";

// Save API keys to Supabase
export const saveApiKeysToSupabase = async (keys: ApiKeys): Promise<boolean> => {
  try {
    // Check if logged in
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      console.log("Not logged in, saving to localStorage only");
      return false;
    }

    // Check if record already exists
    const { data: existingKeys } = await supabase
      .from("api_keys_config")
      .select("*")
      .eq("user_id", session.session.user.id)
      .single();

    if (existingKeys) {
      // Update existing record
      const { error } = await supabase
        .from("api_keys_config")
        .update({
          perplexity_key: keys.perplexity || null,
          youtube_key: keys.youtube || null,
          stripe_key: keys.stripe || null,
          updated_at: new Date()
        })
        .eq("user_id", session.session.user.id);

      if (error) {
        console.error("Error updating API keys:", error);
        return false;
      }
    } else {
      // Insert new record
      const { error } = await supabase.from("api_keys_config").insert({
        user_id: session.session.user.id,
        perplexity_key: keys.perplexity || null,
        youtube_key: keys.youtube || null,
        stripe_key: keys.stripe || null
      });

      if (error) {
        console.error("Error inserting API keys:", error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving API keys to Supabase:", error);
    return false;
  }
};

// Load API keys from Supabase
export const loadApiKeysFromSupabase = async (): Promise<ApiKeys | null> => {
  try {
    // Check if logged in
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      console.log("Not logged in, loading from localStorage");
      return null;
    }

    // Get API keys from Supabase
    const { data, error } = await supabase
      .from("api_keys_config")
      .select("perplexity_key, youtube_key, stripe_key")
      .eq("user_id", session.session.user.id)
      .single();

    if (error) {
      console.error("Error loading API keys:", error);
      return null;
    }

    return {
      perplexity: data.perplexity_key || "",
      youtube: data.youtube_key || "",
      stripe: data.stripe_key || ""
    };
  } catch (error) {
    console.error("Error loading API keys from Supabase:", error);
    return null;
  }
};

// Get API keys with fallback to default values
export const getApiKeysWithDefaults = async (): Promise<ApiKeys> => {
  try {
    let keys = await loadApiKeysFromSupabase();
    
    if (!keys) {
      keys = loadApiKeysFromLocalStorage();
    }
    
    // Set default values if keys are missing
    return {
      perplexity: keys?.perplexity || "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",
      youtube: keys?.youtube || "AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w",
      stripe: keys?.stripe || ""
    };
  } catch (error) {
    console.error("Error getting API keys with defaults:", error);
    return {
      perplexity: "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",
      youtube: "AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w",
      stripe: ""
    };
  }
};

// Helpers for localStorage
export const loadApiKeysFromLocalStorage = (): ApiKeys | null => {
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

export const saveApiKeysToLocalStorage = (keys: ApiKeys): void => {
  localStorage.setItem("api_keys", JSON.stringify(keys));
};

export interface VirtualMeeting {
  id: string; 
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
  meeting_url: string;
  host: string;
  participants: number;
  max_participants: number;
  image_url?: string;
}
