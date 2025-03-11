
export interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  timeSpent: number;
  badge?: string;
  unlockedBadges?: any[]; // Add this property
  date?: Date; // Add this property
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  explanation?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  threshold: number;
  category: string;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  participant?: {
    name: string;
    email: string;
    phone?: string;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed" | "scheduled";
  isVirtual?: boolean;
  link?: string;
  duration?: number;
  participantsCount?: number;
  maxParticipants?: number;
  type?: string;
}

export interface Category {
  id: string;
  name: string;
  badge: string;
  color: string;
  icon: string;
  description: string;
  label?: string;
  questions?: QuizQuestion[]; // Add this to support the code
}

// Extended types for the quiz functionality
export interface QuizQuestion {
  id: string;
  text: string;
  question: string; // The actual question text
  options: string[]; // Add this to support the code
  answers: Answer[];
  correctAnswer: string | number; // ID of the correct answer - support both string and number
  explanation?: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  threshold: number;
  category: string;
  icon?: any; // Change to any to support the complex icon structure
  earnedAt?: Date;
  condition?: (result: QuizResult) => boolean;
  colorClass?: string; // Add this to support QuizResult
}

export interface AppointmentRequest {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  participant?: {
    name: string;
    email: string;
    phone?: string;
  };
  name?: string; // Add these fields to match the form data
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  preferredDate?: Date;
  type?: string;
}
