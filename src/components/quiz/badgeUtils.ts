
import { BadgeProps } from "./types";
import { CheckCircle, Award, Medal } from "lucide-react";
import React from "react";

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const percentage = (score / totalQuestions) * 100;
  const badges: BadgeProps[] = [];

  if (percentage >= 50) {
    badges.push({
      name: "Apprenti Militant",
      description: "Connaissances de base acquises",
      icon: React.createElement(CheckCircle, { className: "h-6 w-6 text-green-500" }),
    });
  }

  if (percentage >= 75) {
    badges.push({
      name: "Militant Engagé",
      description: "Bonne compréhension des enjeux",
      icon: React.createElement(CheckCircle, { className: "h-6 w-6 text-blue-500" }),
    });
  }

  if (percentage === 100) {
    badges.push({
      name: "Expert MRC",
      description: "Maîtrise parfaite du sujet",
      icon: React.createElement(CheckCircle, { className: "h-6 w-6 text-mrc-red" }),
    });
  }

  return badges;
};
