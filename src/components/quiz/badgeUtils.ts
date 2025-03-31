
import { Trophy, Medal, Star, Award, BookOpen, Zap } from "lucide-react";
import { BadgeProps, QuizResult } from "./types";

// Helper functions to check badge conditions
const getScorePercentage = (result: QuizResult): number => {
  return (result.correctAnswers / result.totalQuestions) * 100;
};

// Define badges
export const BADGES: BadgeProps[] = [
  {
    id: "perfect-score",
    name: "Score Parfait",
    description: "Obtenir un score de 100%",
    imageUrl: "/badges/perfect-score.png",
    threshold: 100,
    category: "achievement",
    icon: { icon: Trophy, className: "h-10 w-10 text-yellow-500" },
    condition: (result: QuizResult) => getScorePercentage(result) === 100
  },
  {
    id: "expert",
    name: "Expert",
    description: "Obtenir un score d'au moins 90%",
    imageUrl: "/badges/expert.png",
    threshold: 90,
    category: "achievement",
    icon: { icon: Medal, className: "h-10 w-10 text-blue-500" },
    condition: (result: QuizResult) => getScorePercentage(result) >= 90
  },
  {
    id: "advanced",
    name: "Avancé",
    description: "Obtenir un score d'au moins 75%",
    imageUrl: "/badges/advanced.png",
    threshold: 75,
    category: "achievement",
    icon: { icon: Star, className: "h-10 w-10 text-green-500" },
    condition: (result: QuizResult) => getScorePercentage(result) >= 75
  },
  {
    id: "intermediate",
    name: "Intermédiaire",
    description: "Obtenir un score d'au moins 60%",
    imageUrl: "/badges/intermediate.png",
    threshold: 60,
    category: "achievement",
    icon: { icon: Award, className: "h-10 w-10 text-purple-500" },
    condition: (result: QuizResult) => getScorePercentage(result) >= 60
  },
  {
    id: "beginner",
    name: "Débutant",
    description: "Compléter un quiz",
    imageUrl: "/badges/beginner.png",
    threshold: 0,
    category: "achievement",
    icon: { icon: BookOpen, className: "h-10 w-10 text-indigo-500" },
    condition: (result: QuizResult) => true
  },
  {
    id: "quick-thinker",
    name: "Esprit Rapide",
    description: "Terminer un quiz en moins de 2 minutes",
    imageUrl: "/badges/quick-thinker.png",
    threshold: 120,
    category: "speed",
    icon: { icon: Zap, className: "h-10 w-10 text-amber-500" },
    condition: (result: QuizResult) => result.timeSpent < 120
  }
];

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  // Create a mock result to check badges
  const mockResult: QuizResult = {
    correctAnswers: score,
    totalQuestions: totalQuestions,
    score: (score / totalQuestions) * 100,
    timeSpent: 0, // We don't have actual time data here
    date: new Date()
  };

  // Filter badges that meet the condition
  return BADGES.filter(badge => {
    if (badge.condition) {
      return badge.condition(mockResult);
    }
    return false;
  }).map(badge => ({
    ...badge,
    earnedAt: new Date()
  }));
};
