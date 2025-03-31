
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: string;
  text?: string; // Added for backward compatibility
  answers?: any; // Added for backward compatibility
  category?: string; // Added for category support
  imageSrc?: string; // Pour les questions avec images
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon | ReactNode;
  color?: string;
  earnedAt?: Date;
  category?: string; // Added for compatibility
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: string[] | number;
  wrongAnswers: string[];
  unlockedBadges?: BadgeProps[];
}

// Expanded Appointment type with all needed properties
export interface Appointment {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  description?: string;
  location?: string;
  organizer?: string;
  attendees?: string[];
  color?: string;
  isAllDay?: boolean;
  isVirtual?: boolean;
  link?: string;
  date?: Date | string;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: number;
  startTime?: string; // Add support for startTime
  endTime?: string; // Add support for endTime
  participant?: string; // Add participant property to fix errors
}

export interface AppointmentRequest {
  title: string;
  date: Date | string;
  time: string;
  duration: number;
  description?: string;
  location?: string;
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  type?: string;
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
  selectedAnswers: number[] | undefined[] | string[];
  timeRemaining?: number;
  isFinished?: boolean;
  isStarted?: boolean;
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
  correctAnswer: number | string;
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
  completedQuizzes?: number[] | number;
  correctAnswers?: number | number[];
  totalQuestions?: number;
  streakDays?: number;
  lastQuizDate?: Date;
}

// Définir les niveaux de difficulté
export type DifficultyLevel = "Débutant" | "Intermédiaire" | "Avancé";

// Définir les types de fonctionnalités pour les limites du plan
export type Feature = 
  "pdfGeneration" | 
  "quizzes" | 
  "aiChat" | 
  "videoDownload" | 
  "youtubeAnalysis" | 
  "maxChats";

// Définir les types de plan
export type Plan = "free" | "standard" | "premium";
