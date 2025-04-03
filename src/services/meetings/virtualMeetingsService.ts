
// Création du type VirtualMeeting pour résoudre les erreurs d'importation
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
  participantsCount?: number;
  maxParticipants?: number;
  link?: string;
}

// Mock data
const meetingsData: VirtualMeeting[] = [
  {
    id: "1",
    title: "Réunion des coordinateurs locaux",
    date: "2023-09-15",
    time: "18:00",
    duration: "1h30",
    location: "Virtuel (Zoom)",
    organizer: "Bureau National",
    status: "upcoming",
    attendees: 34,
    description: "Discussion sur les stratégies de mobilisation pour les élections à venir."
  },
  {
    id: "2",
    title: "Formation des délégués",
    date: "2023-09-20",
    time: "19:00",
    duration: "2h",
    location: "Virtuel (Teams)",
    organizer: "Département Formation",
    status: "upcoming",
    attendees: 56,
    description: "Formation sur le rôle et les responsabilités des délégués lors des élections."
  },
  {
    id: "3",
    title: "Assemblée générale mensuelle",
    date: "2023-08-30",
    time: "18:00", 
    duration: "2h",
    location: "Virtuel (Zoom)",
    organizer: "Bureau National",
    status: "completed",
    attendees: 112,
    recording: "https://example.com/recording/ag-aout"
  },
];

export const getVirtualMeetings = async (): Promise<VirtualMeeting[]> => {
  return meetingsData;
};

export const getUpcomingMeetings = async (): Promise<VirtualMeeting[]> => {
  return meetingsData.filter(meeting => meeting.status === 'upcoming');
};

export const getPastMeetings = async (): Promise<VirtualMeeting[]> => {
  return meetingsData.filter(meeting => meeting.status === 'completed');
};

export const joinVirtualMeeting = async (meetingId: string) => {
  // Simuler la participation à une réunion
  const meeting = meetingsData.find(m => m.id === meetingId);
    
  if (!meeting) {
    throw new Error("Meeting not found");
  }
    
  // Incrémenter le compteur de participants
  meeting.attendees += 1;
    
  return { success: true, meetingUrl: meeting.link || "https://example.com/meeting" };
};
