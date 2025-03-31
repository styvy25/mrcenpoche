
import { Award, Trophy, Star, Zap, BookOpen } from "lucide-react";
import { BadgeProps, QuizResult } from "./types";

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const percentage = (score / totalQuestions) * 100;
  const earnedBadges: BadgeProps[] = [];

  // Perfect Score Badge
  if (percentage === 100) {
    earnedBadges.push({
      id: "perfect-score",
      name: "Score Parfait",
      description: "Vous avez répondu correctement à toutes les questions!",
      icon: Trophy,
      color: "yellow",
    });
  }

  // Expert Badge
  if (percentage >= 90) {
    earnedBadges.push({
      id: "expert",
      name: "Expert",
      description: "Vous maîtrisez ce sujet!",
      icon: Star,
      color: "blue",
    });
  }
  
  // Good Performance Badge
  else if (percentage >= 70) {
    earnedBadges.push({
      id: "good-performance",
      name: "Bonne Performance",
      description: "Bonne connaissance du sujet.",
      icon: Award,
      color: "green",
    });
  }
  
  // Quick learner - for anyone who completes a quiz
  earnedBadges.push({
    id: "quiz-complete",
    name: "Quiz Terminé",
    description: "Vous avez terminé un quiz!",
    icon: BookOpen,
    color: "purple",
  });

  return earnedBadges;
};
