
import { LucideIcon } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface Category {
  id: string;
  name: string;
  label?: string;
  color?: string;
  questions: QuizQuestion[];
}

export interface QuizSection {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  sections: QuizSection[];
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number; // in minutes
}

export interface BadgeIconType {
  icon: LucideIcon;
  className: string;
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: BadgeIconType;
  condition: (score: number, totalQuestions: number) => boolean;
  earnedAt?: Date;
}

export interface QuizResult {
  id?: string;
  quizId?: string;
  score: number;
  totalQuestions: number;
  timeTaken?: number; // in seconds
  earnedBadges?: string[];
  completedAt?: Date;
  correctAnswers?: number;
  unlockedBadges?: any[];
  date?: Date;
}

export interface BadgesDisplayProps {
  badges: BadgeProps[];
}

// Appointment types for challenge features
export interface AppointmentRequest {
  id: string;
  userId: string;
  requestType: string;
  status: string;
  requestDate: Date;
  details: string;
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
}

export interface Appointment {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  location?: string;
  description?: string;
  date?: Date;
  isVirtual?: boolean;
  link?: string;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: number;
  status?: string;
}
