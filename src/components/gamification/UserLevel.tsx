
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface UserLevelProps {
  showCard?: boolean;
  className?: string;
}

export const UserLevel: React.FC<UserLevelProps> = ({ 
  showCard = true,
  className = ""
}) => {
  const { userPoints, loading, isPremium } = useSubscription();
  
  if (!userPoints && !loading) return null;
  
  // Calculate progress to next level
  const currentPoints = userPoints?.points || 0;
  const currentLevel = userPoints?.level || 1;
  const pointsToNextLevel = currentLevel * 100;
  const previousLevelPoints = (currentLevel - 1) * 100;
  const progress = Math.floor(((currentPoints - previousLevelPoints) / (pointsToNextLevel - previousLevelPoints)) * 100);
  
  const content = (
    <div className={className}>
      {loading ? (
        <>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-8 w-full rounded-full" />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className={`h-5 w-5 ${isPremium ? 'text-yellow-500' : 'text-gray-400'}`} />
              <div className="font-semibold">Niveau {currentLevel}</div>
            </div>
            <Badge variant={isPremium ? "default" : "outline"} className={isPremium ? "bg-gradient-to-r from-yellow-500 to-amber-500" : ""}>
              {isPremium ? (
                <>
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </>
              ) : "Gratuit"}
            </Badge>
          </div>
          
          <div className="flex justify-between text-xs mb-1">
            <span>{currentPoints} points</span>
            <span>{pointsToNextLevel} points pour niveau {currentLevel + 1}</span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-mrc-blue" />
              <span className="text-xs">
                {Math.max(0, pointsToNextLevel - currentPoints)} points restants
              </span>
            </div>
            {isPremium && (
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-medium">+50% de points</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
  
  if (!showCard) return content;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progression</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default UserLevel;
