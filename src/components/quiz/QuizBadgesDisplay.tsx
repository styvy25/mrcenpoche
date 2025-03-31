
import React from "react";
import { BadgeProps } from "./types";

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-lg font-semibold mb-3">Badges gagnés</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {badges.map((badge) => {
          // Check if icon is available and render it properly
          const IconComponent = badge.icon && typeof badge.icon === 'object' && badge.icon.icon;
          
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm w-28"
            >
              {IconComponent && React.createElement(
                IconComponent, 
                { 
                  className: badge.icon?.className || "h-10 w-10 text-blue-500" 
                }
              )}
              <span className="text-sm font-medium mt-1 text-center">
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBadgesDisplay;
