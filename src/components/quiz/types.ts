
import { LucideIcon } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  earnedAt?: Date;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: string[];
  wrongAnswers: string[];
  unlockedBadges?: BadgeProps[];
}

// Add Appointment related types that are missing
export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  organizer?: string;
  attendees?: string[];
  color?: string;
  isAllDay?: boolean;
}

export interface AppointmentRequest {
  title: string;
  date: Date;
  time: string;
  duration: number;
  description?: string;
  location?: string;
}

// Add missing Category type
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  questionCount: number;
}

// Add missing QuizState type
export interface QuizState {
  currentQuestion: number;
  selectedAnswers: number[];
  timeRemaining: number;
  isFinished: boolean;
  isStarted: boolean;
}

// Add missing Question type
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
}

// Add missing QuizUserStats type
export interface QuizUserStats {
  totalQuizzes: number;
  averageScore: number;
  bestCategory: string;
  totalPoints: number;
  rank: string;
  quizzesByCategory: Record<string, number>;
  badges: BadgeProps[];
}

