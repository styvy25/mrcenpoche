
import { Appointment } from "../../components/quiz/types";

export const meetingsData: Appointment[] = [
  {
    id: "meet1",
    title: "Formation stratégie de campagne",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "10:00",
    type: "formation",
    description: "Apprenez à élaborer une stratégie de campagne efficace pour la prochaine élection locale",
    location: "Siège MRC Yaoundé",
    isVirtual: false,
    participantsCount: 12,
    maxParticipants: 20,
    duration: "120"
  },
  {
    id: "meet2",
    title: "Session questions-réponses avec Me Kamto",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: "18:00",
    type: "reunion",
    description: "Session virtuelle avec le président du MRC pour répondre à vos questions",
    isVirtual: true,
    link: "https://meet.google.com/mrc-session",
    participantsCount: 45,
    maxParticipants: 100,
    duration: "90"
  },
  {
    id: "meet3",
    title: "Atelier mobilisation de terrain",
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    time: "09:30",
    type: "formation",
    description: "Techniques pratiques pour mobiliser les électeurs à l'échelle locale",
    location: "Bureau régional MRC Douala",
    isVirtual: false,
    participantsCount: 8,
    maxParticipants: 15,
    duration: "180"
  }
];
