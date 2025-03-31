import { Challenge, Appointment, Event, ChallengeState } from './types';

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Quiz sur l\'histoire du MRC',
    description: 'Testez vos connaissances sur l\'histoire du MRC dans ce quiz.',
    type: 'daily', // Changed from 'quiz' to 'daily'
    points: 10,
    deadline: new Date(Date.now() + 86400000).toISOString(),
    isNew: true,
    isCompleted: false,
    image: '/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    progress: 0
  },
  {
    id: '2',
    title: 'Lecture du programme économique',
    description: 'Lisez les 5 chapitres du programme économique du MRC.',
    type: 'daily', // Changed from 'reading' to 'daily'
    points: 15,
    deadline: new Date(Date.now() + 172800000).toISOString(),
    isNew: true,
    isCompleted: false,
    difficulty: 'medium',
    estimatedTime: '15 minutes',
    progress: 0
  },
  {
    id: '3',
    title: 'Regardez le dernier discours',
    description: 'Visionnez le dernier discours du président Maurice Kamto.',
    type: 'weekly', // Changed from 'video' to 'weekly'
    points: 20,
    deadline: new Date(Date.now() + 259200000).toISOString(),
    isNew: false,
    isCompleted: false,
    image: '/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png',
    difficulty: 'easy',
    estimatedTime: '30 minutes',
    progress: 0
  },
  {
    id: '4',
    title: 'Exercice de communication',
    description: 'Pratiquez vos arguments en faveur du MRC face à différentes objections.',
    type: 'monthly', // Changed from 'practice' to 'monthly'
    points: 25,
    deadline: new Date(Date.now() + 345600000).toISOString(),
    isNew: false,
    isCompleted: false,
    difficulty: 'hard',
    estimatedTime: '45 minutes',
    progress: 0
  },
  {
    id: '5',
    title: 'Lecture des statuts du parti',
    description: 'Familiarisez-vous avec les statuts et le règlement intérieur du MRC.',
    type: 'monthly', // Changed from 'reading' to 'monthly'
    points: 15,
    deadline: new Date(Date.now() + 432000000).toISOString(),
    isNew: false,
    isCompleted: false,
    difficulty: 'medium',
    estimatedTime: '20 minutes',
    progress: 0
  }
];

export const appointments: Appointment[] = [
  {
    id: '101',
    title: 'Réunion de coordination',
    date: new Date(),
    time: '14:00',
    type: 'reunion',
    description: 'Point sur les actions à venir.',
    location: 'Siège du parti',
    participant: ['Maurice Kamto', 'Valentin Ndefrou'],
    isVirtual: false
  },
  {
    id: '102',
    title: 'Formation des nouveaux adhérents',
    date: new Date(Date.now() + 86400000),
    time: '10:00',
    type: 'formation',
    description: 'Présentation des valeurs et du programme du MRC.',
    location: 'En ligne',
    participant: [],
    isVirtual: true,
    link: 'https://meet.google.com/xyz'
  }
];

export const events: Event[] = [
  {
    id: '201',
    title: 'Meeting à Bafoussam',
    description: 'Grand rassemblement pour soutenir la candidature de Maurice Kamto.',
    date: new Date(Date.now() + 172800000),
    location: 'Place des fêtes de Bafoussam',
    image: '/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png',
    isVirtual: false,
    attendees: 5000
  },
  {
    id: '202',
    title: 'Webinaire sur la décentralisation',
    description: 'Discussion en ligne sur les enjeux de la décentralisation au Cameroun.',
    date: new Date(Date.now() + 259200000),
    location: 'En ligne',
    isVirtual: true,
    link: 'https://www.youtube.com/watch?v=abc',
    attendees: 200
  }
];

export const initialChallengeState: ChallengeState = {
  challenges,
  appointments: [], // Add your appointments here
  events: [], // Add your events here
  loading: false,
  error: null
};
