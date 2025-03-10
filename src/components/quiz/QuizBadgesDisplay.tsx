
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeProps } from "./types";

const QuizBadgesDisplay = ({ badges }: { badges: BadgeProps[] }) => (
  <div className="flex flex-wrap justify-center gap-4">
    {badges.map((badge, index) => (
      <div key={index} className="flex flex-col items-center">
        {badge.icon}
        <Badge className="mt-2">{badge.name}</Badge>
        <p className="text-sm text-gray-500">{badge.description}</p>
      </div>
    ))}
  </div>
);

export default QuizBadgesDisplay;
