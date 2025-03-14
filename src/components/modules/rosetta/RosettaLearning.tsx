
import React, { useState } from 'react';
import RosettaPhrase from '@/modules/learning/RosettaPhrase';
import RosettaProgress from '@/modules/learning/RosettaProgress';
import RosettaControls from '@/modules/learning/RosettaControls';

interface Phrase {
  original: string;
  translation: string;
  audio?: string;
}

interface RosettaLearningProps {
  moduleId: string;
  onComplete: () => void;
}

const RosettaLearning: React.FC<RosettaLearningProps> = ({ moduleId, onComplete }) => {
  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  // Sample phrases based on module
  const phrases: Phrase[] = [
    {
      original: "Le MRC est un parti politique camerounais.",
      translation: "The MRC is a Cameroonian political party.",
    },
    {
      original: "Maurice Kamto est le président du MRC.",
      translation: "Maurice Kamto is the president of the MRC.",
    },
    {
      original: "La mobilisation citoyenne est essentielle pour le changement.",
      translation: "Citizen mobilization is essential for change.",
    },
    {
      original: "Le développement durable est une priorité pour le Cameroun.",
      translation: "Sustainable development is a priority for Cameroon.",
    },
    {
      original: "La jeunesse représente l'avenir du pays.",
      translation: "Youth represents the future of the country.",
    }
  ];

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
