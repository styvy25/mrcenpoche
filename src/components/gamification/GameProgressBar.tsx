
import React from 'react';
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification, LEVELS } from "@/services/gamificationService";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";

interface GameProgressBarProps {
  showPoints?: boolean;
  showLevel?: boolean;
  className?: string;
}

const GameProgressBar: React.FC<GameProgressBarProps> = ({ 
  showPoints = true, 
  showLevel = true,
  className = ""
}) => {
  const { currentUser } = useAuth();
  const { points, level } = useGamification(currentUser?.id || 'anonymous');
  
  // Calcul de la progression vers le niveau suivant
  const nextLevel = LEVELS.find(l => l.level === level.level + 1);
  const prevLevelPoints = level.pointsRequired;
  const nextLevelPoints = nextLevel ? nextLevel.pointsRequired : level.pointsRequired * 2;
  const pointsForNextLevel = nextLevelPoints - prevLevelPoints;
  const currentProgress = points - prevLevelPoints;
  const progressPercentage = Math.round((currentProgress / pointsForNextLevel) * 100);
  
  return (
    <div className={`${className}`}>
      {showLevel && (
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">Niveau {level.level}</span>
          </div>
          {nextLevel && (
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Niv. {nextLevel.level}</span>
              <Star className="h-3 w-3 text-gray-400 ml-1" />
            </div>
          )}
        </div>
      )}
      
      <div className="relative">
        <Progress value={progressPercentage} className="h-2" />
        
        {showPoints && (
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>{points} pts</span>
            {nextLevel && <span>{nextLevelPoints} pts</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameProgressBar;
