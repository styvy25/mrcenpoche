
import { Appointment } from "../../quiz/types";

// Mock topics for appointment requests
export const TOPICS = [
  "Histoire du MRC",
  "Stratégies de mobilisation",
  "Communication politique",
  "Organisation de campagne",
  "Enjeux politiques actuels",
  "Autre (préciser)"
];

// Mock upcoming appointments data
export const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    title: "Formation sur les techniques de mobilisation",
    description: "Atelier pour apprendre à mobiliser efficacement dans votre localité",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    duration: 120,
    status: "confirmed",
    participantsCount: 12,
    maxParticipants: 25,
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "apt-2",
    title: "Principes fondamentaux du MRC",
    description: "Une introduction complète à l'idéologie et aux valeurs du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    duration: 90,
    status: "confirmed",
    participantsCount: 8,
    maxParticipants: 30,
    isVirtual: false,
    location: "Siège MRC, Yaoundé"
  },
  {
    id: "apt-3",
    title: "Stratégies de communication politique",
    description: "Comment communiquer efficacement les idées du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    duration: 60,
    status: "confirmed",
    participantsCount: 15,
    maxParticipants: 20,
    isVirtual: true,
    link: "https://zoom.us/j/123456789"
  }
];
