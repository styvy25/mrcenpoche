
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface RosettaProgressProps {
  currentPhrase: number;
  totalPhrases: number;
}

const RosettaProgress: React.FC<RosettaProgressProps> = ({ currentPhrase, totalPhrases }) => {
  const progressPercentage = Math.round(((currentPhrase) / totalPhrases) * 100);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Apprentissage interactif des concepts clés</h3>
      <Progress value={progressPercentage} className="h-2" />
      <p className="text-sm text-gray-500 mt-1">
        {currentPhrase + 1} sur {totalPhrases} phrases
      </p>
    </div>
  );
};

export default RosettaProgress;
