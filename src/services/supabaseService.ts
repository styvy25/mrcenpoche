
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
