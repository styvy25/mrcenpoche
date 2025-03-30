
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

// For match-related functionality
export interface MatchPlayer {
  id: string;
  name: string;
  avatar?: string;
  score?: number;
}

export interface Match {
  id: string;
  category: string;
  createdAt: Date;
  players: MatchPlayer[];
  status: 'pending' | 'active' | 'completed';
  questions?: QuizQuestion[];
  winner?: string;
}
