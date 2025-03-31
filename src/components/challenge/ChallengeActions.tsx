
import React from 'react';
import { Button } from "@/components/ui/button";
import { Challenge } from './types';
import { PlayCircle, CheckCircle } from 'lucide-react';

export interface ChallengeActionsProps {
  challenge: Challenge;
  onStart?: () => void;
  onComplete?: () => void;
}

const ChallengeActions: React.FC<ChallengeActionsProps> = ({ 
  challenge, 
  onStart,
  onComplete
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      {!challenge.isCompleted && (
        <>
          {challenge.progress === 0 && (
            <Button 
              onClick={onStart}
              className="flex items-center gap-2"
            >
              <PlayCircle size={18} />
              Commencer
            </Button>
          )}
          
          {challenge.progress > 0 && challenge.progress < 100 && (
            <Button 
              onClick={onStart}
              className="flex items-center gap-2"
            >
              <PlayCircle size={18} />
              Continuer
            </Button>
          )}
          
          {challenge.progress >= 0 && (
            <Button 
              onClick={onComplete}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Marquer comme terminé
            </Button>
          )}
        </>
      )}
      
      {challenge.isCompleted && (
        <Button disabled className="flex items-center gap-2 opacity-60">
          <CheckCircle size={18} />
          Défi terminé
        </Button>
      )}
    </div>
  );
};

export default ChallengeActions;
