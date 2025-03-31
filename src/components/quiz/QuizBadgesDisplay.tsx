
import React from "react";
import { BadgeProps } from "./types";
import { LucideIcon } from "lucide-react";

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return <p>Aucun badge débloqué pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge) => {
        const IconComponent = badge.icon as LucideIcon;
        
        return (
          <div 
            key={badge.id} 
            className={`bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow`}
          >
            <div className={`p-2 rounded-full bg-${badge.color}-100 text-${badge.color}-600`}>
              {IconComponent && <IconComponent className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="font-medium">{badge.name}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizBadgesDisplay;
