
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { usePoints } from '@/hooks/usePoints';

interface UserLevelProps {
  showCard?: boolean;
  className?: string;
}

export const UserLevel: React.FC<UserLevelProps> = ({ 
  showCard = true,
  className = ""
}) => {
  const { isPremium, loading, plan } = useSubscription();
  const { points, level, nextLevelPoints, percentToNextLevel } = usePoints();
  
  if (!plan && !loading) return null;
  
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
              <div className="font-semibold">Niveau {level}</div>
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
            <span>{points} points</span>
            <span>{nextLevelPoints} points pour niveau {level + 1}</span>
          </div>
          
          <Progress value={percentToNextLevel} className="h-2" />
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-mrc-blue" />
              <span className="text-xs">
                {Math.max(0, nextLevelPoints - points)} points restants
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
