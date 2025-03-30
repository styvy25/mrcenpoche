
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Medal, Trophy } from 'lucide-react';

interface QuizAchievementProps {
  type: 'streak' | 'perfect' | 'fast' | 'first' | 'master';
  title: string;
  description?: string;
  points?: number;
  isNew?: boolean;
  className?: string;
}

const QuizAchievement: React.FC<QuizAchievementProps> = ({
  type,
  title,
  description,
  points = 10,
  isNew = false,
  className = '',
}) => {
  // Map achievement types to icons and colors
  const achievementStyles = {
    streak: { icon: Star, color: 'text-amber-500', bg: 'bg-amber-100' },
    perfect: { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    fast: { icon: Award, color: 'text-green-500', bg: 'bg-green-100' },
    first: { icon: Award, color: 'text-blue-500', bg: 'bg-blue-100' },
    master: { icon: Medal, color: 'text-purple-500', bg: 'bg-purple-100' },
  };

  const style = achievementStyles[type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={isNew ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex items-center p-3 rounded-lg border ${style.bg} ${className}`}
    >
      <div className={`flex-shrink-0 p-2 rounded-full ${style.bg}`}>
        <Icon className={`h-6 w-6 ${style.color}`} />
      </div>
      <div className="ml-3 flex-1">
        <h4 className={`font-semibold ${style.color}`}>{title}</h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      {points > 0 && (
        <div className="flex-shrink-0 bg-white rounded-full px-2 py-1 text-xs font-semibold">
          +{points} pts
        </div>
      )}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Nouveau !
        </div>
      )}
    </motion.div>
  );
};

export default QuizAchievement;
