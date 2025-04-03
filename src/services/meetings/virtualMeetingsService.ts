import { fetchMeetingsFromSupabase } from "../supabaseService";

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

// Static data for virtual meetings as fallback
const staticVirtualMeetings: VirtualMeeting[] = [
  {
    id: "1",
    title: "Réunion stratégique régionale",
    date: "2023-11-15",
    time: "14:00",
    duration: "1h30",
    location: "Zoom",
    organizer: "Bureau National",
    status: "upcoming",
    attendees: 45,
    description: "Discussion sur la stratégie électorale pour les régions du Nord. Préparation aux prochaines échéances et analyse des forces en présence."
  },
  {
    id: "2",
    title: "Formation des responsables locaux",
    date: "2023-11-20",
    time: "10:00",
    duration: "2h",
    location: "Google Meet",
    organizer: "Département de Formation",
    status: "upcoming",
    attendees: 30,
    description: "Formation destinée aux coordinateurs locaux. Techniques de mobilisation et outils de gestion d'équipe."
  },
  {
    id: "3",
    title: "Débriefing campagne Ouest",
    date: "2023-10-25",
    time: "15:00",
    duration: "1h",
    location: "Teams",
    organizer: "Direction de Campagne",
    status: "completed",
    attendees: 28,
    description: "Analyse des résultats de la dernière campagne dans l'Ouest. Identification des forces et faiblesses pour améliorer nos prochaines actions.",
    recording: "https://example.com/recordings/debriefing-ouest"
  },
  {
    id: "4",
    title: "Préparation aux élections municipales",
    date: "2023-12-01",
    time: "09:30",
    duration: "3h",
    location: "Zoom",
    organizer: "Maurice Kamto",
    status: "upcoming",
    attendees: 120,
    description: "Sessions de préparation aux prochaines échéances électorales. Programme détaillé et stratégie de campagne pour les municipales."
  },
  {
    id: "5",
    title: "Atelier communication digitale",
    date: "2023-10-30",
    time: "13:00",
    duration: "2h",
    location: "Discord",
    organizer: "Équipe Communication",
    status: "completed",
    attendees: 55,
    description: "Formation aux outils de communication numérique. Utilisation efficace des réseaux sociaux et création de contenu engageant.",
    recording: "https://example.com/recordings/atelier-digital"
  }
];

export const fetchVirtualMeetings = async (status?: 'upcoming' | 'completed'): Promise<VirtualMeeting[]> => {
  try {
    // Try to fetch from Supabase first
    const supabaseMeetings = await fetchMeetingsFromSupabase(status);
    
    // If we got meetings from Supabase, return those
    if (supabaseMeetings && supabaseMeetings.length > 0) {
      return supabaseMeetings;
    }
    
    // Otherwise, fall back to static data
    return new Promise((resolve) => {
      setTimeout(() => {
        if (status) {
          resolve(staticVirtualMeetings.filter(meeting => meeting.status === status));
        } else {
          resolve(staticVirtualMeetings);
        }
      }, 300);
    });
  } catch (error) {
    console.error("Failed to fetch virtual meetings:", error);
    
    // On error, return filtered static data
    if (status) {
      return staticVirtualMeetings.filter(meeting => meeting.status === status);
    }
    return staticVirtualMeetings;
  }
};

export const getUpcomingMeetings = async (): Promise<VirtualMeeting[]> => {
  return fetchVirtualMeetings('upcoming');
};

export const getPastMeetings = async (): Promise<VirtualMeeting[]> => {
  return fetchVirtualMeetings('completed');
};
