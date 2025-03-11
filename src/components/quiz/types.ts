
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
  id?: string;
  userId?: string;
  requestType?: string;
  status?: string;
  requestDate?: Date;
  details?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: Date;
  topic?: string;
  message?: string;
  type?: "private" | "public";
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  type?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration?: number;
  status?: string;
  participantsCount?: number;
  maxParticipants?: number;
  isVirtual?: boolean;
  link?: string;
  location?: string;
}
