
/**
 * Service for managing YouTube API keys
 */

import { supabase } from "@/integrations/supabase/client";
import { getApiKeysWithDefaults } from "@/services/supabaseService";

// Get the YouTube API key from Supabase or localStorage with fallback to default
export const getYouTubeApiKey = async (): Promise<string> => {
  try {
    // Try to get the key from localStorage first
    const localApiKeys = localStorage.getItem("api_keys");
    if (localApiKeys) {
      const { youtube } = JSON.parse(localApiKeys);
      if (youtube) return youtube;
    }

    // If not in localStorage, try to get from Supabase if user is logged in
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      const { data, error } = await supabase
        .from('api_keys_config')
        .select('youtube_key')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching YouTube API key:", error);
      } else if (data && data.youtube_key) {
        // Update localStorage for faster access next time
        updateLocalStorageApiKey('youtube', data.youtube_key);
        return data.youtube_key;
      }
    }
    
    // Fallback to default key
    const defaultKey = 'AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w';
    updateLocalStorageApiKey('youtube', defaultKey);
    return defaultKey;
  } catch (error) {
    console.error("Error retrieving YouTube API key:", error);
    // Fallback to default key if any error occurs
    return 'AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w';
  }
};

// Save YouTube API key to both Supabase and localStorage
export const saveYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Always save to localStorage
    updateLocalStorageApiKey('youtube', apiKey);
    
    // Save to Supabase if user is logged in
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      // If not logged in, just save to localStorage is enough
      return true;
    }
    
    // Check if record exists
    const { data: existingData } = await supabase
      .from('api_keys_config')
      .select('id')
      .eq('user_id', sessionData.session.user.id)
      .single();
    
    let result;
    
    if (existingData) {
      // Update existing record
      result = await supabase
        .from('api_keys_config')
        .update({ youtube_key: apiKey })
        .eq('user_id', sessionData.session.user.id);
    } else {
      // Insert new record
      result = await supabase
        .from('api_keys_config')
        .insert({ 
          user_id: sessionData.session.user.id,
          youtube_key: apiKey 
        });
    }
    
    if (result.error) {
      console.error("Error saving YouTube API key:", result.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving YouTube API key:", error);
    return false;
  }
};

// Helper to update API keys in localStorage
const updateLocalStorageApiKey = (service: string, value: string) => {
  try {
    const apiKeys = JSON.parse(localStorage.getItem("api_keys") || "{}");
    apiKeys[service] = value;
    localStorage.setItem("api_keys", JSON.stringify(apiKeys));
  } catch (error) {
    console.error("Error updating localStorage API key:", error);
  }
};

// Get all API keys with default fallbacks
export const getApiKeys = async () => {
  return getApiKeysWithDefaults();
};
