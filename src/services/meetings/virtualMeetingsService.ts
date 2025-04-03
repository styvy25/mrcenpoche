
import { fetchMeetingsFromSupabase } from "../supabaseService";

export const getMeetings = async () => {
  try {
    const meetings = await fetchMeetingsFromSupabase();
    return meetings;
  } catch (error) {
    console.error("Error getting meetings:", error);
    return [];
  }
};
