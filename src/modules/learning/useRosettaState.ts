
import { useState } from 'react';
import { Phrase, getSamplePhrases } from './RosettaData';

interface RosettaStateProps {
  moduleId: string;
  onComplete: () => void;
}

export function useRosettaState({ moduleId, onComplete }: RosettaStateProps) {
  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const phrases = getSamplePhrases(moduleId);

  // Move to next phrase
  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
    } else {
      setCompleted(true);
      onComplete();
    }
  };

  // Handle correct answer
  const handleCorrectAnswer = () => {
    nextPhrase();
  };

  return {
    currentPhrase,
    completed,
    phrases,
    nextPhrase,
    handleCorrectAnswer
  };
}
