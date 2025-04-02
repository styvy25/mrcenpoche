
import { supabase } from "@/integrations/supabase/client";

export interface VirtualMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'completed';
  attendees: number;
  description?: string;
  recording?: string;
}

export const fetchVirtualMeetings = async (status?: 'upcoming' | 'completed'): Promise<VirtualMeeting[]> => {
  try {
    let query = supabase
      .from('virtual_meetings')
      .select('*');
      
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('date', { ascending: status === 'upcoming' });
    
    if (error) {
      console.error("Error fetching virtual meetings:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Failed to fetch virtual meetings:", error);
    return [];
  }
};

export const getUpcomingMeetings = async (): Promise<VirtualMeeting[]> => {
  return fetchVirtualMeetings('upcoming');
};

export const getPastMeetings = async (): Promise<VirtualMeeting[]> => {
  return fetchVirtualMeetings('completed');
};
