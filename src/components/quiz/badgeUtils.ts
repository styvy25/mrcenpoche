
import { Trophy, Medal, Award, BookCheck, Brain, Star } from "lucide-react";
import { BadgeProps, QuizResult } from "./types";

// Helper function to represent icon components as strings
const createIcon = (Icon: any, className: string) => ({
  icon: Icon,
  className: className
});

export const badges: BadgeProps[] = [
  {
    id: "perfect-score",
    name: "Score parfait",
    description: "Obtenir 100% à un quiz",
    imageUrl: "",
    threshold: 100,
    category: "achievement",
    icon: createIcon(Trophy, "h-8 w-8 text-yellow-500"),
    condition: (result: QuizResult) => result.correctAnswers === result.totalQuestions,
  },
  {
    id: "advanced",
    name: "Niveau avancé",
    description: "Obtenir plus de 90% à un quiz difficile",
    imageUrl: "",
    threshold: 90,
    category: "achievement",
    icon: createIcon(Medal, "h-8 w-8 text-blue-500"),
    condition: (result: QuizResult) => (result.score > 90),
  },
  {
    id: "strong-start",
    name: "Bon début",
    description: "Obtenir plus de 80% à votre premier quiz",
    imageUrl: "",
    threshold: 80,
    category: "achievement",
    icon: createIcon(Award, "h-8 w-8 text-green-500"),
    condition: (result: QuizResult) => (result.score > 80),
  },
  {
    id: "fast-learner",
    name: "Apprentissage rapide",
    description: "Terminer un quiz en moins de 2 minutes avec un bon score",
    imageUrl: "",
    threshold: 70,
    category: "achievement",
    icon: createIcon(BookCheck, "h-8 w-8 text-purple-500"),
    condition: (result: QuizResult) => (result.score > 70 && result.timeSpent < 120),
  },
  {
    id: "knowledge-master",
    name: "Maître du savoir",
    description: "Obtenir plus de 85% sur 5 quiz différents",
    imageUrl: "",
    threshold: 85,
    category: "achievement",
    icon: createIcon(Brain, "h-8 w-8 text-indigo-500"),
    condition: (result: QuizResult) => (result.score > 85),
  },
  {
    id: "perfect-memory",
    name: "Mémoire parfaite",
    description: "Répondre correctement à toutes les questions de mémoire",
    imageUrl: "",
    threshold: 95,
    category: "achievement",
    icon: createIcon(Star, "h-8 w-8 text-amber-500"),
    condition: (result: QuizResult) => (result.correctAnswers >= result.totalQuestions - 1),
  },
];

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const result: QuizResult = {
    score: (score / totalQuestions) * 100,
    correctAnswers: score,
    totalQuestions: totalQuestions,
    timeSpent: 0
  };
  return badges.filter(badge => badge.condition && badge.condition(result));
};
