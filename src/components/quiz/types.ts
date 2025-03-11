
// Original file content plus the addition of new needed types

export interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  timeSpent: number;
  badge?: string;
  unlockedBadges: BadgeProps[]; // Added this property
  date: Date;
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

// Add QuizQuestion interface
export interface QuizQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  threshold: number;
  category: string;
}

// Add BadgeProps interface
export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: {
    icon: React.ComponentType<any>;
    className: string;
  };
  condition?: (score: number, total: number) => boolean;
  earnedAt?: Date;
}

// Extend Category with questions property
export interface Category {
  id: string;
  name: string;
  badge: string;
  color: string;
  icon: string;
  description: string;
  label?: string;
  questions?: QuizQuestion[];
}

// Add AppointmentRequest interface
export interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  preferredDate: Date;
  topic: string;
  message?: string;
  type?: "private" | "public";
}

// Update Appointment interface with additional properties
export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  location: string;
  participant?: {
    name: string;
    email: string;
    phone?: string;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  isVirtual?: boolean;
  link?: string;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: number;
  type?: string;
}
