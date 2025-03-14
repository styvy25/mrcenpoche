
import React from 'react';
import RosettaPhrase from '@/modules/learning/RosettaPhrase';
import RosettaProgress from '@/modules/learning/RosettaProgress';
import RosettaControls from '@/modules/learning/RosettaControls';
import { useRosettaState } from '@/modules/learning/useRosettaState';

interface RosettaLearningProps {
  moduleId: string;
  onComplete: () => void;
}

const RosettaLearning: React.FC<RosettaLearningProps> = ({ moduleId, onComplete }) => {
  const { 
    currentPhrase, 
    phrases, 
    handleCorrectAnswer, 
    nextPhrase 
  } = useRosettaState({ moduleId, onComplete });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <RosettaProgress 
        currentPhrase={currentPhrase} 
        totalPhrases={phrases.length} 
      />
      
      <RosettaPhrase 
        phrase={phrases[currentPhrase]} 
        onCorrectAnswer={handleCorrectAnswer} 
      />
      
      <RosettaControls onNext={nextPhrase} />
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Complétez toutes les phrases pour terminer l'exercice
        </p>
      </div>
    </div>
  );
};

export default RosettaLearning;
