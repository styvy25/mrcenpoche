
import React from "react";
import { BadgeProps } from "../types";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

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
    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <Award className="h-5 w-5 text-blue-500 mr-2" />
        Badges débloqués
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {badges.map((badge) => {
          const isNew = newAchievements.includes(badge.id);
          const IconComponent = badge.icon || Award;
          
          return (
            <motion.div
              key={badge.id}
              initial={isNew ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: isNew ? 0.5 : 0, duration: 0.3 }}
              className={`bg-white rounded-md p-3 flex items-center ${
                isNew ? "border-2 border-yellow-400" : "border border-gray-200"
              }`}
            >
              <div className={`p-2 rounded-full bg-${badge.color || "blue"}-100 mr-3`}>
                {React.isValidElement(badge.icon) ? (
                  badge.icon
                ) : (
                  <IconComponent className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">
                  {badge.name}
                  {isNew && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Nouveau !
                    </span>
                  )}
                </p>
                {badge.description && (
                  <p className="text-xs text-gray-500">{badge.description}</p>
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
