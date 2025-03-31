
import { ApiKeys } from "./types";
import { supabase } from "@/integrations/supabase/client";

export const loadApiKeys = async (): Promise<ApiKeys | null> => {
  try {
    // First, try to load from Supabase if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { action: 'get' }
      });
      
      if (!error && data?.success) {
        console.log("API keys loaded from Supabase");
        return data.data as ApiKeys;
      }
    }
    
    // Fallback to localStorage if Supabase fails or user is not authenticated
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      return JSON.parse(savedKeys);
    }
    return null;
  } catch (error) {
    console.error("Error loading API keys:", error);
    return null;
  }
};

export const persistApiKeys = async (keys: ApiKeys): Promise<boolean> => {
  try {
    // First, try to save to Supabase if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { 
          action: 'save',
          keys
        }
      });
      
      if (!error && data?.success) {
        console.log("API keys saved to Supabase");
        // Also save to localStorage as a backup
        localStorage.setItem("api_keys", JSON.stringify(keys));
        return true;
      }
    }
    
    // Fallback to localStorage if Supabase fails or user is not authenticated
    localStorage.setItem("api_keys", JSON.stringify(keys));
    return true;
  } catch (error) {
    console.error("Error persisting API keys:", error);
    
    // Last resort fallback - try localStorage even if there was an error
    try {
      localStorage.setItem("api_keys", JSON.stringify(keys));
      return true;
    } catch {
      return false;
    }
  }
};

// Function to refresh YouTube cache
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('refresh-youtube-cache', {
      body: { apiKey }
    });
    
    return !error && !!data?.success;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};
