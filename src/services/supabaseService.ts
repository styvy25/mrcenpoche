
import { supabase } from "@/integrations/supabase/client";
import { VirtualMeeting } from "./meetings/virtualMeetingsService";

// Fetch training scenarios from Supabase
export const fetchScenariosFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('training_scenarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching scenarios from Supabase:', error);
    return [];
  }
};

// Update scenario progress in Supabase
export const updateScenarioProgressInSupabase = async (scenarioId: string, completed: boolean) => {
  try {
    const { data, error } = await supabase
      .from('training_scenarios')
      .update({ completed })
      .eq('id', scenarioId)
      .select();

    if (error) {
      throw error;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error updating scenario progress in Supabase:', error);
    return null;
  }
};

// Fetch virtual meetings from Supabase
export const fetchMeetingsFromSupabase = async (): Promise<VirtualMeeting[]> => {
  try {
    const { data, error } = await supabase
      .from('virtual_meetings')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      throw error;
    }

    // Ensure that the date field is properly formatted as a string
    return (data || []).map((meeting) => ({
      ...meeting,
      date: typeof meeting.date === 'object' ? new Date(meeting.date).toISOString() : meeting.date
    }));
  } catch (error) {
    console.error('Error fetching meetings from Supabase:', error);
    return [];
  }
};

// Save API keys to Supabase
export const saveApiKeysToSupabase = async (keys: { 
  youtube?: string; 
  perplexity?: string; 
  stripe?: string; 
}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('api_keys_config')
      .upsert({
        user_id: user.id,
        youtube_key: keys.youtube,
        perplexity_key: keys.perplexity,
        stripe_key: keys.stripe,
        updated_at: new Date().toISOString()
      })
      .select();
      
    if (error) {
      throw error;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error saving API keys to Supabase:', error);
    return null;
  }
};

// Load API keys from Supabase
export const loadApiKeysFromSupabase = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('api_keys_config')
      .select('*')
      .eq('user_id', user.id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // No record found
        return null;
      }
      throw error;
    }
    
    return {
      youtube: data.youtube_key,
      perplexity: data.perplexity_key,
      stripe: data.stripe_key
    };
  } catch (error) {
    console.error('Error loading API keys from Supabase:', error);
    return null;
  }
};
