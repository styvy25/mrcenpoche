
import { supabase } from "@/integrations/supabase/client";
import { VirtualMeeting } from "./meetings/virtualMeetingsService";
import { TrainingScenario } from "./training/trainingScenarioService";

/**
 * Fetches virtual meetings based on status
 */
export const fetchMeetingsFromSupabase = async (status?: 'upcoming' | 'completed'): Promise<VirtualMeeting[]> => {
  try {
    let query = supabase.from('virtual_meetings').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Supabase error fetching meetings:", error);
      throw error;
    }
    
    return data as VirtualMeeting[];
  } catch (error) {
    console.error("Failed to fetch virtual meetings from Supabase:", error);
    return [];
  }
};

/**
 * Fetches training scenarios from Supabase
 */
export const fetchScenariosFromSupabase = async (): Promise<TrainingScenario[]> => {
  try {
    const { data, error } = await supabase
      .from('training_scenarios')
      .select('*');
    
    if (error) {
      console.error("Supabase error fetching scenarios:", error);
      throw error;
    }
    
    return data as TrainingScenario[];
  } catch (error) {
    console.error("Failed to fetch training scenarios from Supabase:", error);
    return [];
  }
};

/**
 * Update training scenario progress in Supabase
 */
export const updateScenarioProgressInSupabase = async (id: string, completed: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('training_scenarios')
      .update({ completed })
      .eq('id', id);
    
    if (error) {
      console.error("Supabase error updating scenario progress:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to update scenario progress in Supabase:", error);
  }
};

/**
 * Save API keys to Supabase
 */
export const saveApiKeysToSupabase = async (keys: {
  perplexity?: string;
  youtube?: string;
  stripe?: string;
}): Promise<boolean> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData?.session) {
      console.warn("User not authenticated, can't save to Supabase");
      return false;
    }
    
    const { error } = await supabase
      .from('api_keys_config')
      .upsert({
        user_id: sessionData.session.user.id,
        perplexity_key: keys.perplexity || null,
        youtube_key: keys.youtube || null,
        stripe_key: keys.stripe || null,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'user_id' 
      });
    
    if (error) {
      console.error("Supabase error saving API keys:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return false;
  }
};

/**
 * Load API keys from Supabase
 */
export const loadApiKeysFromSupabase = async (): Promise<{
  perplexity: string;
  youtube: string;
  stripe: string;
} | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData?.session) {
      console.warn("User not authenticated, can't load from Supabase");
      return null;
    }
    
    const { data, error } = await supabase
      .from('api_keys_config')
      .select('perplexity_key, youtube_key, stripe_key')
      .eq('user_id', sessionData.session.user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error("Supabase error loading API keys:", error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    return {
      perplexity: data.perplexity_key || "",
      youtube: data.youtube_key || "",
      stripe: data.stripe_key || ""
    };
  } catch (error) {
    console.error("Error loading from Supabase:", error);
    return null;
  }
};
