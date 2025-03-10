
import { ReactNode } from "react";

export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Category {
  id: string;
  name: string;
  label?: string;
  questions: QuizQuestion[];
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  condition: (score: number, total: number) => boolean;
}

export type Badge = {
  id: string;
  name: string;
  description: string;
  unlockedAt: Date;
};

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  unlockedBadges: Badge[];
  date: Date;
}
