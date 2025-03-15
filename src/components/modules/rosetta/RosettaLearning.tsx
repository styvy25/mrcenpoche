
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Volume2, Repeat, ChevronRight } from 'lucide-react';

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
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<number>(0);
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

  // Play audio for current phrase
  const playAudio = () => {
    if (!phrases[currentPhrase].audio) return;
    
    try {
      // Create audio instance safely
      const audio = new Audio(phrases[currentPhrase].audio);
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    } catch (error) {
      console.error("Error creating audio element:", error);
    }
  };

  // Check user answer
  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === phrases[currentPhrase].translation.toLowerCase().trim();
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        nextPhrase();
      }, 1500);
    }
  };

  // Move to next phrase
  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setShowTranslation(false);
      setUserAnswer('');
      setIsCorrect(null);
      setProgress(Math.round(((currentPhrase + 1) / phrases.length) * 100));
    } else {
      setCompleted(true);
      onComplete();
    }
  };

  // Show translation
  const revealTranslation = () => {
    setShowTranslation(true);
  };

  // Reset current phrase
  const repeatPhrase = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowTranslation(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Apprentissage interactif des concepts clés</h3>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500 mt-1">
          {currentPhrase + 1} sur {phrases.length} phrases
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center mb-4">
          <h4 className="text-lg font-medium">Phrase originale:</h4>
          {phrases[currentPhrase].audio && (
            <Button variant="ghost" size="icon" onClick={playAudio} className="ml-2">
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <p className="text-xl mb-6 font-medium">{phrases[currentPhrase].original}</p>
        
        <div className="mb-4">
          <label htmlFor="translation" className="block text-sm font-medium mb-2">
            Votre traduction:
          </label>
          <input
            id="translation"
            type="text"
            className="w-full p-3 border rounded-md"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Entrez votre traduction..."
            disabled={isCorrect === true}
          />
        </div>
        
        {isCorrect === true && (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Correct! Bien joué!</span>
          </div>
        )}
        
        {isCorrect === false && (
          <div className="flex items-center text-red-600 mb-4">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Incorrect. Essayez encore ou consultez la traduction.</span>
          </div>
        )}
        
        {showTranslation && (
          <div className="bg-gray-100 p-3 rounded-md mb-4 dark:bg-gray-800">
            <p className="font-medium">Traduction correcte:</p>
            <p>{phrases[currentPhrase].translation}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Button 
            onClick={checkAnswer} 
            disabled={!userAnswer || isCorrect === true}
          >
            Vérifier
          </Button>
          <Button 
            variant="outline" 
            onClick={revealTranslation}
            disabled={showTranslation}
          >
            Voir la traduction
          </Button>
          <Button 
            variant="outline" 
            onClick={repeatPhrase}
            disabled={isCorrect === true}
          >
            <Repeat className="h-4 w-4 mr-1" />
            Recommencer
          </Button>
          <Button 
            variant="default" 
            onClick={nextPhrase}
            className="ml-auto"
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Complétez toutes les phrases pour terminer l'exercice
        </p>
      </div>
    </div>
  );
};

export default RosettaLearning;
