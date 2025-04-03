
import { fetchMeetingsFromSupabase } from "../supabaseService";

export interface VirtualMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location?: string;
  organizer?: string;
  host?: string;
  status?: string;
  attendees?: number;
  participants?: number;
  description?: string;
  recording?: string;
  meeting_url?: string;
  image_url?: string;
  max_participants?: number;
}

export const getMeetings = async (): Promise<VirtualMeeting[]> => {
  try {
    const meetings = await fetchMeetingsFromSupabase();
    return meetings;
  } catch (error) {
    console.error("Error getting meetings:", error);
    return [];
  }
};

// Filter meetings by upcoming or past status
export const getUpcomingMeetings = async (): Promise<VirtualMeeting[]> => {
  const allMeetings = await getMeetings();
  const today = new Date();
  
  // Filter meetings that are today or in the future
  return allMeetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= today;
  });
};

export const getPastMeetings = async (): Promise<VirtualMeeting[]> => {
  const allMeetings = await getMeetings();
  const today = new Date();
  
  // Filter meetings that are in the past
  return allMeetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate < today;
  });
};
