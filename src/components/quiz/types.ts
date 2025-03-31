
import { LucideIcon } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: string;
  text?: string; // Added for backward compatibility
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  earnedAt?: Date;
  category?: string; // Added for compatibility
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: string[];
  wrongAnswers: string[];
  unlockedBadges?: BadgeProps[];
}

// Expanded Appointment type with all needed properties
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
  isVirtual?: boolean;
  link?: string;
  date?: Date;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: number;
}

export interface AppointmentRequest {
  title: string;
  date: Date;
  time: string;
  duration: number;
  description?: string;
  location?: string;
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
}

// Expanded Category type with all required properties
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  questionCount: number;
  questions?: QuizQuestion[];
  label?: string;
}

// Expanded QuizState type with all required properties
export interface QuizState {
  currentQuestion: number;
  selectedAnswers: number[];
  timeRemaining: number;
  isFinished: boolean;
  isStarted: boolean;
  score?: number;
  showFeedback?: boolean;
  isCorrect?: boolean;
  quizCompleted?: boolean;
}

// Add Question type with backwards compatibility for answers field
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
  answers?: any;
}

// Expanded QuizUserStats type
export interface QuizUserStats {
  totalQuizzes: number;
  averageScore: number;
  bestCategory: string;
  totalPoints: number;
  rank: string;
  quizzesByCategory: Record<string, number>;
  badges: BadgeProps[];
  completedQuizzes?: number[];
  correctAnswers?: number;
  totalQuestions?: number;
  streakDays?: number;
  lastQuizDate?: Date;
}
