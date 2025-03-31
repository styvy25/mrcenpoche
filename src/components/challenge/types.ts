
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'quiz' | 'reading' | 'video' | 'practice';
  points: number;
  deadline: string;
  isNew: boolean;
  isCompleted: boolean;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  progress: number;
}

export type AppointmentType = 'reunion' | 'formation' | 'evenement' | 'autre';

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: AppointmentType;
  description?: string;
  location?: string;
  participant?: string[];
  isVirtual?: boolean;
  link?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  image?: string;
  isVirtual: boolean;
  link?: string;
  attendees?: number;
}

export interface ChallengeState {
  challenges: Challenge[];
  appointments: Appointment[];
  events: Event[];
  loading: boolean;
  error: string | null;
}
