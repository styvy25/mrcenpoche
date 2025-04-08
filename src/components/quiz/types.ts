
export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
  imageSrc?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Category {
  id: string;
  name: string;
  label?: string;
  type?: string;
  icon?: string;
  description?: string;
  color?: string;
  questions: QuizQuestion[];
  badge?: string;
}

export interface QuizResult {
  score: number;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  correctAnswers?: number;
  timeSpent?: number;
  date?: Date;
}

export interface BadgeProps {
  id?: string;
  name: string;
  icon: any;
  description: string;
  unlocked: boolean;
  earnedAt?: Date;
  threshold?: number;
  category?: string;
  imageUrl?: string;
  condition?: (result: QuizResult) => boolean;
}

// Types for appointments and challenges
export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  link?: string;
  isVirtual?: boolean;
  duration?: string;
  maxParticipants?: number;
  participantsCount?: number;
  startTime?: string;
}

export interface AppointmentRequest {
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  startTime?: string;
}
