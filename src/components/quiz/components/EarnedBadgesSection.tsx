
import React from "react";
import { BadgeProps } from "../types";
import { motion } from "framer-motion";
import { Award, LucideIcon } from "lucide-react";

interface EarnedBadgesSectionProps {
  badges: BadgeProps[];
  newAchievements: string[];
}

const EarnedBadgesSection: React.FC<EarnedBadgesSectionProps> = ({ 
  badges, 
  newAchievements 
}) => {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 sm:mt-3 bg-blue-50 p-2 sm:p-3 rounded-lg">
      <h3 className="font-semibold text-sm sm:text-base flex items-center">
        <Award className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mr-1 sm:mr-2" />
        Badges débloqués
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
        {badges.map((badge) => {
          const isNew = newAchievements.includes(badge.id);
          const IconComponent = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              initial={isNew ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: isNew ? 0.5 : 0, duration: 0.3 }}
              className={`bg-white rounded-md p-1.5 sm:p-2 flex items-center ${
                isNew ? "border-2 border-yellow-400" : "border border-gray-200"
              }`}
            >
              <div className={`p-1 sm:p-1.5 rounded-full bg-${badge.color || "blue"}-100 mr-1.5 sm:mr-2 flex-shrink-0`}>
                {IconComponent && <IconComponent size={14} className="text-blue-500 sm:h-4 sm:w-4" />}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[10px] sm:text-xs truncate">
                  {badge.name}
                  {isNew && (
                    <span className="ml-1 text-[8px] sm:text-[10px] bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded-full inline-block">
                      Nouveau !
                    </span>
                  )}
                </p>
                {badge.description && (
                  <p className="text-[8px] sm:text-[10px] text-gray-500 line-clamp-1">{badge.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EarnedBadgesSection;
