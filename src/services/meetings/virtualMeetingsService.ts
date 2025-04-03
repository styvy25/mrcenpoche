
import { supabase } from "../supabaseClient";
import { meetingsData } from "./mockMeetingsData";

// Mock function to replace fetchMeetingsFromSupabase
export const fetchMeetingsFromSupabase = async () => {
  return { data: meetingsData, error: null };
};

export const getVirtualMeetings = async () => {
  try {
    const { data, error } = await fetchMeetingsFromSupabase();
    
    if (error) {
      throw new Error(`Error fetching meetings: ${error.message}`);
    }
    
    return data || [];
  } catch (error) {
    console.error("Failed to fetch virtual meetings:", error);
    return [];
  }
};

export const joinVirtualMeeting = async (meetingId: string) => {
  try {
    // Find the meeting to get its URL
    const meeting = meetingsData.find(m => m.id === meetingId);
    
    if (!meeting) {
      throw new Error("Meeting not found");
    }
    
    // Update participants count
    const { error } = await supabase
      .from("virtual_meetings")
      .update({ participants: (meeting.participantsCount || 0) + 1 })
      .eq("id", meetingId);
    
    if (error) {
      throw new Error(`Error joining meeting: ${error.message}`);
    }
    
    return { success: true, meetingUrl: meeting.link };
  } catch (error) {
    console.error("Failed to join virtual meeting:", error);
    return { success: false, error: "Failed to join meeting" };
  }
};
