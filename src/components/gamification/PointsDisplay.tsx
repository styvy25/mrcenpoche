
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Star, Award, TrendingUp, Zap } from 'lucide-react';
import { usePoints } from '@/hooks/usePoints';
import { motion } from 'framer-motion';

const PointsDisplay = () => {
  const { points, level, nextLevelPoints, percentToNextLevel } = usePoints();

  const getLevelTitle = (level: number): string => {
    switch (level) {
      case 1: return "Débutant";
      case 2: return "Apprenti";
      case 3: return "Membre engagé";
      case 4: return "Militant actif";
      case 5: return "Coordinateur";
      case 6: return "Leader";
      case 7: return "Stratège";
      case 8: return "Vétéran";
      case 9: return "Expert";
      case 10: return "Maître";
      default: return level > 10 ? "Elite" : "Débutant";
    }
  };

  const renderLevelIcon = (level: number) => {
    if (level >= 8) return <Award className="h-5 w-5 text-purple-500" />;
    if (level >= 5) return <Star className="h-5 w-5 text-yellow-500" />;
    return <Zap className="h-5 w-5 text-blue-500" />;
  };

  const pointsContainerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${percentToNextLevel}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 }
    }
  };

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700"
      variants={pointsContainerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {renderLevelIcon(level)}
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Niveau {level} - {getLevelTitle(level)}
          </h3>
        </div>
        <motion.div 
          className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400"
          variants={numberVariants}
        >
          <TrendingUp className="h-4 w-4" />
          <span>{points} points</span>
        </motion.div>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Progression niveau {level+1}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {percentToNextLevel}%
          </div>
        </div>
        <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <Progress value={percentToNextLevel} className="h-2 rounded-full" />
        </div>
      </div>
      
      <div className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
        Encore {nextLevelPoints - points} points pour atteindre le niveau {level+1}
      </div>
    </motion.div>
  );
};

export default PointsDisplay;
