
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Challenge } from './types';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface ChallengeActionsProps {
  challenge: Challenge;
  onComplete?: (id: string) => void;
}

const ChallengeActions: React.FC<ChallengeActionsProps> = ({ 
  challenge,
  onComplete
}) => {
  const navigate = useNavigate();
  
  const isComplete = challenge.isCompleted;
  
  const currentProgress = challenge.progress || 0;
  const progressPercentage = Math.min(Math.max(challenge.progress || 0, 0), 100);
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete(challenge.id);
    }
  };
  
  const handleStart = () => {
    // Specific navigation based on challenge type
    switch (challenge.type) {
      case 'daily':
      case 'weekly':
      case 'monthly':
        if (challenge.type === 'daily' && challenge.title.includes('Quiz')) {
          navigate('/quiz');
        } else {
          navigate(`/modules`);
        }
        break;
      default:
        navigate('/modules');
    }
  };
  
  return (
    <div className="mt-4">
      {isComplete ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Complété</span>
          </div>
          <span className="text-sm text-gray-500">+{challenge.points} points</span>
        </div>
      ) : (
        <>
          <div className="mb-2 flex justify-between items-center text-xs text-gray-500">
            <span>Progression</span>
            <span>{currentProgress}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-3" />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleStart} 
              className="flex-1"
              variant={currentProgress > 0 ? "outline" : "default"}
            >
              {currentProgress > 0 ? "Continuer" : "Commencer"}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            
            {currentProgress > 0 && (
              <Button 
                onClick={handleComplete}
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                Terminer
                <CheckCircle size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeActions;
