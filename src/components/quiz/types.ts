
export interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string | number;
  explanation?: string;
  question?: string; // Added for backward compatibility
  imageSrc?: string; // For displaying images with questions
  difficulty?: string; // For indicating difficulty level
  category?: string; // For categorizing questions
}

export interface Category {
  id: string;
  name: string;
  label: string;
  icon?: string;
  description?: string;
  color?: string;
  questions: QuizQuestion[];
  badge?: string; // Added to support badges in categories
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  category: string;
  correctAnswers: number;
  incorrectAnswers: number;
  timestamp?: Date;
  timeSpent?: number; // For tracking time spent on quiz
  date?: Date; // For tracking when quiz was taken
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  iconType: string;
  earned?: boolean;
  date?: string;
  gradient?: string;
  imageUrl?: string; // For badge images
  threshold?: number;
  category?: string;
  earnedAt?: Date;
  icon?: {
    icon: any;
    className?: string;
  };
  condition?: (result: QuizResult) => boolean;
}

export interface BadgeSummary {
  earned: BadgeProps[];
  available: BadgeProps[];
}

// Add Appointment types to fix related errors
export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: AppointmentType;
  description?: string;
  location?: string;
  participants?: string[];
  isVirtual?: boolean;
  link?: string;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: string;
}

export type AppointmentType = 'reunion' | 'formation' | 'evenement' | 'autre';

export interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  time: string;
  type: AppointmentType;
  topic: string;
  message?: string;
  preferredDate?: Date;
}
