
import React from "react";
import { BadgeProps, QuizResult } from "./types";
import { Award, Trophy, Zap, Target, Flag, Medal } from "lucide-react";

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const badges: BadgeProps[] = [];
  const percentage = (score / totalQuestions) * 100;

  // Perfect score badge
  if (percentage === 100) {
    badges.push({
      id: "perfect-score",
      name: "Score Parfait",
      description: "Vous avez obtenu un score parfait!",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      color: "yellow",
      earnedAt: new Date(),
    });
  }

  // Expert badge (80%+)
  if (percentage >= 80) {
    badges.push({
      id: "expert-badge",
      name: "Expert",
      description: "Vous avez démontré une expertise dans ce domaine!",
      icon: <Award className="h-5 w-5 text-blue-500" />,
      color: "blue",
      earnedAt: new Date(),
    });
  }

  // Good knowledge badge (60%+)
  if (percentage >= 60 && percentage < 80) {
    badges.push({
      id: "good-knowledge",
      name: "Bonne Connaissance",
      description: "Vous avez une bonne connaissance du sujet!",
      icon: <Medal className="h-5 w-5 text-green-500" />,
      color: "green",
      earnedAt: new Date(),
    });
  }

  // First try badge
  badges.push({
    id: "first-attempt",
    name: "Premier Essai",
    description: "Vous avez terminé votre premier quiz!",
    icon: <Flag className="h-5 w-5 text-purple-500" />,
    color: "purple",
    earnedAt: new Date(),
  });

  // Challenge badge (for difficult quizzes)
  if (totalQuestions >= 10 && percentage >= 70) {
    badges.push({
      id: "challenger",
      name: "Challenger",
      description: "Vous avez relevé un défi difficile!",
      icon: <Target className="h-5 w-5 text-red-500" />,
      color: "red",
      earnedAt: new Date(),
    });
  }

  return badges;
};

export const getBadgesByCategory = (category: string): BadgeProps[] => {
  // Implementation for category-specific badges
  return [
    {
      id: `${category}-mastery`,
      name: `Maîtrise ${category}`,
      description: `Vous avez maîtrisé la catégorie ${category}`,
      icon: <Zap className="h-5 w-5 text-indigo-500" />,
      color: "indigo",
      earnedAt: new Date(),
    }
  ];
};
