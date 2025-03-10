
import { LucideIcon } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  earnedBadges: string[];
  completedAt: Date;
}
