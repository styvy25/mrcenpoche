
import React from "react";
import { BadgeProps } from "../types";
import QuizBadgesDisplay from "../QuizBadgesDisplay";

interface BadgesSectionProps {
  earnedBadges: BadgeProps[];
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ earnedBadges }) => {
  if (!earnedBadges || earnedBadges.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-semibold mb-4">Badges débloqués</h3>
      <QuizBadgesDisplay badges={earnedBadges} />
    </div>
  );
};

export default BadgesSection;
