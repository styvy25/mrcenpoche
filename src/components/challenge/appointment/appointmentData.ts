
import { Appointment } from "@/components/quiz/types";

// Format date to string
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to create dates relative to the current date
const createRelativeDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDate(date);
};

export const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: "event-1",
    title: "Formation politique MRC",
    description: "Session d'introduction aux valeurs et principes du MRC",
    date: createRelativeDate(2),
    startTime: "14:00",
    endTime: "16:00",
    location: "En ligne",
    participant: {
      name: "Styvy-237",
      email: "styvy237@example.com"
    },
    status: "confirmed",
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij",
    duration: 120,
    participantsCount: 0,
    maxParticipants: 20,
    type: "public"
  },
  {
    id: "event-2",
    title: "Stratégies de mobilisation",
    description: "Comment mobiliser efficacement dans votre localité",
    date: createRelativeDate(4),
    startTime: "10:00",
    endTime: "12:00",
    location: "En ligne",
    participant: {
      name: "Styvy-237",
      email: "styvy237@example.com"
    },
    status: "confirmed",
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij",
    duration: 120,
    participantsCount: 5,
    maxParticipants: 15,
    type: "public"
  },
  {
    id: "event-3",
    title: "Communication politique",
    description: "Techniques de communication politique efficace",
    date: createRelativeDate(7),
    startTime: "15:00",
    endTime: "17:00",
    location: "En ligne",
    participant: {
      name: "Styvy-237",
      email: "styvy237@example.com"
    },
    status: "confirmed",
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij",
    duration: 120,
    participantsCount: 2,
    maxParticipants: 20,
    type: "public"
  }
];
