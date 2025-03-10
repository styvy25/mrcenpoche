
import { BadgeProps } from "./types";
import { CheckCircle, Award, Medal, Image, BookOpen, MapPin } from "lucide-react";
import React from "react";

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const percentage = (score / totalQuestions) * 100;
  const badges: BadgeProps[] = [];

  // Basic badges based on score percentage
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
      icon: React.createElement(Award, { className: "h-6 w-6 text-blue-500" }),
    });
  }

  if (percentage === 100) {
    badges.push({
      name: "Expert MRC",
      description: "Maîtrise parfaite du sujet",
      icon: React.createElement(Medal, { className: "h-6 w-6 text-mrc-red" }),
    });
  }

  // Add specific badges based on score and total questions
  if (score >= 5 && totalQuestions >= 10) {
    badges.push({
      name: "Explorateur Culturel",
      description: "Découverte approfondie de la culture camerounaise",
      icon: React.createElement(Image, { className: "h-6 w-6 text-purple-500" }),
    });
  }

  if (score >= 8 && totalQuestions >= 15) {
    badges.push({
      name: "Savant Géographe",
      description: "Excellente connaissance du territoire camerounais",
      icon: React.createElement(MapPin, { className: "h-6 w-6 text-yellow-500" }),
    });
  }

  if (score >= 15 && totalQuestions >= 20) {
    badges.push({
      name: "Érudit National",
      description: "Maîtrise exceptionnelle de l'histoire et des traditions",
      icon: React.createElement(BookOpen, { className: "h-6 w-6 text-mrc-green" }),
    });
  }

  return badges;
};
