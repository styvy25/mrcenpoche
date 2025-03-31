
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
