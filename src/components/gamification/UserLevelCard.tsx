
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Trophy } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification, LEVELS } from "@/services/gamificationService";

interface UserLevelCardProps {
  compact?: boolean;
}

const UserLevelCard: React.FC<UserLevelCardProps> = ({ compact = false }) => {
  const { currentUser } = useAuth();
  const { points, level, badges } = useGamification(currentUser?.id || 'anonymous');
  
  // Calcul de la progression vers le niveau suivant
  const nextLevel = LEVELS.find(l => l.level === level.level + 1);
  const prevLevelPoints = level.pointsRequired;
  const nextLevelPoints = nextLevel ? nextLevel.pointsRequired : level.pointsRequired * 2;
  const pointsForNextLevel = nextLevelPoints - prevLevelPoints;
  const currentProgress = points - prevLevelPoints;
  const progressPercentage = Math.round((currentProgress / pointsForNextLevel) * 100);
  
  if (compact) {
    return (
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="font-semibold">{level.title} Niv.{level.level}</span>
        </div>
        <div className="text-sm font-medium">{points} pts</div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          Niveau {level.level}: {level.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>{points} points</span>
            {nextLevel && (
              <span className="text-gray-500">Prochain niveau: {nextLevelPoints - points} points restants</span>
            )}
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between items-center mt-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-blue-500 mr-1" />
              <span>{level.title}</span>
            </div>
            {nextLevel && (
              <div className="flex items-center text-gray-500">
                <span>{nextLevel.title}</span>
                <Star className="h-4 w-4 ml-1" />
              </div>
            )}
          </div>
          
          <div className="flex items-center mt-1">
            <Award className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm">{badges.length} badges obtenus</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLevelCard;
