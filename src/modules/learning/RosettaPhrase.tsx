
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Volume2, Repeat } from 'lucide-react';

interface Phrase {
  original: string;
  translation: string;
  audio?: string;
}

interface RosettaPhraseProps {
  phrase: Phrase;
  onCorrectAnswer: () => void;
}

const RosettaPhrase: React.FC<RosettaPhraseProps> = ({ phrase, onCorrectAnswer }) => {
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Play audio for current phrase
  const playAudio = () => {
    if (!phrase.audio) return;
    
    try {
      // Create audio instance safely
      const audio = new Audio(phrase.audio);
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    } catch (error) {
      console.error("Error creating audio element:", error);
    }
  };

  // Check user answer
  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === phrase.translation.toLowerCase().trim();
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
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
    <Card className="p-6 mb-6">
      <div className="flex items-center mb-4">
        <h4 className="text-lg font-medium">Phrase originale:</h4>
        {phrase.audio && (
          <Button variant="ghost" size="icon" onClick={playAudio} className="ml-2">
            <Volume2 className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <p className="text-xl mb-6 font-medium">{phrase.original}</p>
      
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
          <p>{phrase.translation}</p>
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
      </div>
    </Card>
  );
};

export default RosettaPhrase;
