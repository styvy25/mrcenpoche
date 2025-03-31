
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Flame, Calendar } from 'lucide-react';
import { Challenge } from './types';
import { formatDeadline, getDifficultyColor } from './challengeUtils';
import { Progress } from '@/components/ui/progress';
import ChallengeActions from './ChallengeActions';

interface ChallengeContentProps {
  challenge: Challenge;
  onComplete?: () => void;
}

const ChallengeContent: React.FC<ChallengeContentProps> = ({ 
  challenge,
  onComplete
}) => {
  const difficultyColor = getDifficultyColor(challenge.difficulty);
  
  return (
    <Card className="h-full flex flex-col">
      {challenge.image && (
        <div className="rounded-t-lg overflow-hidden h-48 bg-gray-200">
          <img 
            src={challenge.image} 
            alt={challenge.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className={`flex-1 flex flex-col ${challenge.image ? 'pt-4' : 'pt-6'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-mrc-blue/10 text-mrc-blue">
            {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
          </span>
          
          <span className={`text-xs font-medium ${difficultyColor} flex items-center`}>
            <Flame size={12} className="mr-1" />
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
          
          <span className="text-xs text-gray-500 flex items-center ml-auto">
            <Clock size={12} className="mr-1" />
            {challenge.estimatedTime}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-1">
          {challenge.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <Calendar size={12} />
            <span>Avant le {formatDeadline(challenge.deadline)}</span>
          </div>
          
          {!challenge.isCompleted && challenge.progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>Progression</span>
                <span>{challenge.progress}%</span>
              </div>
              <Progress value={challenge.progress} className="h-1.5" />
            </div>
          )}
          
          <ChallengeActions 
            challenge={challenge} 
            onComplete={onComplete ? () => onComplete() : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeContent;
