
import { BadgeProps } from "./types";
import { Award, Star, Medal, Trophy, Crown } from "lucide-react";

// Define badges with their criteria
const badges: BadgeProps[] = [
  {
    id: "beginner",
    name: "Débutant",
    description: "Vous avez complété votre premier quiz",
    icon: "Award",
    color: "text-blue-500"
  },
  {
    id: "intermediate",
    name: "Connaisseur",
    description: "Vous avez obtenu un score de 70% ou plus",
    icon: "Star",
    color: "text-green-500"
  },
  {
    id: "expert",
    name: "Expert",
    description: "Vous avez obtenu un score de 90% ou plus",
    icon: "Medal",
    color: "text-purple-500"
  },
  {
    id: "master",
    name: "Maître",
    description: "Vous avez obtenu un score parfait",
    icon: "Trophy",
    color: "text-yellow-500"
  },
  {
    id: "superstar",
    name: "Superstar",
    description: "Vous avez obtenu un score parfait en moins de 2 minutes",
    icon: "Crown",
    color: "text-red-500"
  }
];

// Function to calculate which badges a user has earned
export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const percentage = (score / totalQuestions) * 100;
  const earnedBadges: BadgeProps[] = [];
  
  // Always earn the beginner badge
  earnedBadges.push(badges[0]);
  
  // Score-based badges
  if (percentage >= 70) {
    earnedBadges.push(badges[1]);
  }
  
  if (percentage >= 90) {
    earnedBadges.push(badges[2]);
  }
  
  if (percentage === 100) {
    earnedBadges.push(badges[3]);
  }
  
  // Note: We can't calculate the superstar badge here since we don't track time
  
  return earnedBadges;
};

export default calculateEarnedBadges;
