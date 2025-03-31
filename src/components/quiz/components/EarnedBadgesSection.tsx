
import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import QuizAchievement from "../QuizAchievement";
import { BadgeProps } from "../types";

interface EarnedBadgesSectionProps {
  badges: BadgeProps[];
  newAchievements: string[];
}

const EarnedBadgesSection: React.FC<EarnedBadgesSectionProps> = ({ 
  badges, 
  newAchievements 
}) => {
  if (badges.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6"
    >
      <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
        <Award className="h-5 w-5 text-purple-500" />
        Badges débloqués
      </h3>
      <div className="space-y-2">
        {badges.map((badge) => (
          <QuizAchievement
            key={badge.id}
            type={badge.id.includes('perfect') ? 'perfect' : 
                  badge.id.includes('expert') ? 'master' : 
                  badge.id.includes('quick') ? 'fast' : 'streak'}
            title={badge.name}
            description={badge.description}
            isNew={newAchievements.includes(badge.id)}
            points={15}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EarnedBadgesSection;
