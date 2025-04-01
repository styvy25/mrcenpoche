
import React from 'react';
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface TrainingHeaderProps {
  level: number;
  progressPercentage: number;
  currentPoints: number;
  pointsToNextLevel: number;
}

const TrainingHeader: React.FC<TrainingHeaderProps> = ({ 
  level, 
  progressPercentage, 
  currentPoints, 
  pointsToNextLevel 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-2">Formation politique immersive</h2>
      <p className="text-gray-300">Développez vos compétences politiques à travers des scénarios virtuels interactifs</p>
      
      <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className="bg-mrc-blue rounded-full p-2 h-10 w-10 flex items-center justify-center animate-pulse-border">
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-300">Niveau actuel: <span className="text-mrc-blue font-semibold">Militant niveau {level}</span></p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-mrc-blue to-mrc-green animate-gradient" 
                style={{ width: `${progressPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{currentPoints} XP / {pointsToNextLevel} XP pour le niveau suivant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingHeader;
