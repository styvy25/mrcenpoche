
import React from "react";
import { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  label?: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
  imageSrc?: string;
  difficulty?: string;
  text?: string; // Ajout de cette propriété pour compatibilité
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  showFeedback: boolean;
  isCorrect: boolean;
  quizCompleted: boolean;
  selectedAnswers: string[];
}

export interface BadgeIcon {
  icon: LucideIcon;
  className?: string;
}

export interface BadgeProps {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  threshold?: number;
  category?: string;
  icon?: BadgeIcon;
  earnedAt?: Date;
  color?: string;
  condition?: (result: QuizResult) => boolean;
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent?: number;
  unlockedBadges?: BadgeProps[];
  date: Date;
}

export interface QuizResultProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  result?: QuizResult;
}

export interface QuizAchievementType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: any) => boolean;
}

export interface QuizUserStats {
  completedQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  streakDays: number;
  lastQuizDate?: Date;
  badges: BadgeProps[];
}

// Pour match-related functionality
export interface MatchPlayer {
  id: string;
  name: string;
  avatar?: string;
  score?: number;
  correctAnswers?: number;
  totalAnswers?: number;
}

export interface Match {
  id: string;
  title: string;
  category: string;
  createdAt: Date;
  participants: MatchPlayer[];
  status: 'pending' | 'active' | 'completed';
  questions?: QuizQuestion[];
  creator?: string;
  winner?: string;
  inviteLink?: string;
}

// Types pour les appointments
export interface Appointment {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  participant: {
    name: string;
    email: string;
    phone?: string;
  };
  status: 'pending' | 'confirmed' | 'scheduled' | 'completed' | 'cancelled';
  isVirtual: boolean;
  link?: string;
  duration: number;
  participantsCount: number;
  maxParticipants: number;
  type: 'public' | 'private' | 'event' | 'meeting' | 'training';
}

export interface AppointmentRequest {
  preferredDate?: Date;
  topic?: string;
  message?: string;
  name?: string;
  email?: string;
  phone?: string;
  type?: 'public' | 'private' | 'event' | 'meeting' | 'training';
  date?: Date;
  time?: string;
  duration?: number;
  reason?: string;
  notes?: string;
  contactMethod?: 'email' | 'phone' | 'video';
  contactInfo?: string;
}

// Types spécifiques pour les messages dans l'application
export interface Message {
  timestamp: Date;
  id: string;
  content: string;
  senderId: string;
  type: 'text' | 'image' | 'audio' | 'video';
  mediaUrl?: string;
  sender?: string;
  text?: string;
}

// Types pour les features de l'application
export type Feature = 
  'youtubeAnalysis' | 
  'pdfGeneration' | 
  'pdfCorrection' | 
  'chatAssistant' | 
  'quizzes' | 
  'challenges' | 
  'maxChats';

// Types pour les plans d'abonnement
export type Plan = 'free' | 'basic' | 'premium' | 'enterprise';
