
import React from "react";
import { BadgeProps } from "./types";
import { LucideIcon } from "lucide-react";

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return <p className="text-center p-3 text-sm sm:text-base sm:p-4">Aucun badge débloqué pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 sm:gap-3">
      {badges.map((badge) => {
        // Get the icon component from the badge
        const IconComponent = badge.icon;
        
        return (
          <div 
            key={badge.id} 
            className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className={`p-1.5 sm:p-2 rounded-full bg-${badge.color || 'blue'}-100 text-${badge.color || 'blue'}-600 flex-shrink-0`}>
              {IconComponent && <IconComponent size={16} className="sm:h-[18px] sm:w-[18px]" />}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-xs sm:text-sm md:text-base truncate">{badge.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizBadgesDisplay;
