
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Language, Phrase, rosettaPhrases } from '@/modules/learning/RosettaData';
import { Play, SkipBack, SkipForward, Check, RefreshCw, Volume2 } from 'lucide-react';

// Component for displaying progress
const RosettaProgress = ({ currentIndex, totalPhrases }: { currentIndex: number; totalPhrases: number }) => {
  const progressValue = ((currentIndex + 1) / totalPhrases) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Phrase {currentIndex + 1} sur {totalPhrases}</span>
        <span>{Math.round(progressValue)}% complété</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
};

// Component for displaying the phrase
const PhraseDisplay = ({ phrase, selectedLanguage }: { phrase: Phrase; selectedLanguage: Language }) => {
  return (
    <div className="text-center space-y-6 my-8">
      <div className="text-3xl font-bold text-primary">{phrase[selectedLanguage]}</div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.values(Language).map((lang) => (
          lang !== selectedLanguage && (
            <Card key={lang} className="bg-secondary/20">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1 capitalize">{lang}</div>
                <div className="font-medium">{phrase[lang]}</div>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>
  );
};

// Component for navigation controls
const RosettaControls = ({ 
  onNext, 
  isFirstPhrase, 
  isLastPhrase
}: { 
  onNext: () => void; 
  isFirstPhrase: boolean; 
  isLastPhrase: boolean;
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button 
        variant="outline" 
        size="icon" 
        disabled={isFirstPhrase}
        onClick={() => {}}
      >
        <SkipBack className="h-4 w-4" />
      </Button>
      
      <Button onClick={onNext}>
        {isLastPhrase ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Terminer
          </>
        ) : (
          <>
            <SkipForward className="mr-2 h-4 w-4" />
            Suivant
          </>
        )}
      </Button>
      
      <Button variant="outline" size="icon" onClick={() => {}}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

const RosettaLearning = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [phrases] = useState<Phrase[]>(rosettaPhrases);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.FRENCH);
  
  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleCorrectAnswer = () => {
    nextPhrase();
  };
  
  const isFirstPhrase = currentPhrase === 0;
  const isLastPhrase = currentPhrase === phrases.length - 1;
  
  return (
    <div className="w-full max-w-xl mx-auto bg-background rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Rosetta Learning - Apprendre les langues camerounaises</h2>
      
      <div className="mb-6">
        <RosettaProgress 
          currentIndex={currentPhrase} 
          totalPhrases={phrases.length} 
        />
      </div>
      
      <PhraseDisplay 
        phrase={phrases[currentPhrase]} 
        selectedLanguage={selectedLanguage} 
      />
      
      <RosettaControls 
        onNext={nextPhrase}
        isFirstPhrase={isFirstPhrase}
        isLastPhrase={isLastPhrase}
      />
      
      {completed && (
        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Félicitations!</h3>
          <p className="text-green-700 dark:text-green-400">Vous avez terminé cette session d'apprentissage.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => setCompleted(false)}
          >
            Recommencer
          </Button>
        </div>
      )}
    </div>
  );
};

export default RosettaLearning;
