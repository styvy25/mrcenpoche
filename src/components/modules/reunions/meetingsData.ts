// This file is now deprecated and will be replaced with our database service
import { VirtualMeeting } from '@/services/meetings/virtualMeetingsService';

// Keeping this as a fallback in case the API fails
export const UPCOMING_MEETINGS: VirtualMeeting[] = [
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
    title: "Atelier juridique",
    date: "2023-09-25",
    time: "17:30",
    duration: "1h",
    location: "Virtuel (Zoom)",
    organizer: "Département Juridique",
    status: "upcoming",
    attendees: 28,
    description: "Présentation des aspects juridiques à connaître pour la protection du vote."
  }
];

export const PAST_MEETINGS: VirtualMeeting[] = [
  {
    id: "4",
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
  {
    id: "5",
    title: "Formation communication politique",
    date: "2023-08-25",
    time: "19:00",
    duration: "1h30",
    location: "Virtuel (Teams)",
    organizer: "Département Communication",
    status: "completed",
    attendees: 78,
    recording: "https://example.com/recording/formation-comm"
  }
];
