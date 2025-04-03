
export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
  imageSrc?: string;
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
}

export interface QuizResult {
  score: number;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
}

export interface BadgeProps {
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
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
}

export interface AppointmentRequest {
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
}
