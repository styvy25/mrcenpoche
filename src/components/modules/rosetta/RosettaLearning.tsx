
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Repeat, Share2, Volume2 } from 'lucide-react';

// Import components (these should exist in a properly refactored solution)
import RosettaPhrase from '@/modules/learning/RosettaPhrase';
import RosettaProgress from '@/modules/learning/RosettaProgress';
import RosettaControls from '@/modules/learning/RosettaControls';
import { useRosettaState } from '@/modules/learning/useRosettaState';
import { rosettaPhrases, Language } from '@/modules/learning/RosettaData';

const RosettaLearning = () => {
  const {
    currentPhrase,
    currentPhraseIndex,
    selectedLanguage,
    progress,
    completed,
    isAudioPlaying,
    playAudio,
    nextPhrase,
    previousPhrase,
    markCompleted,
    resetProgress,
    changeLanguage
  } = useRosettaState();

  useEffect(() => {
    // Initialize audio elements for playback
    const audioElements = document.querySelectorAll('audio');
    return () => {
      // Cleanup audio elements
      audioElements.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  if (!currentPhrase) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Chargement des phrases...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Apprentissage linguistique</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => changeLanguage('en')}>
              {selectedLanguage === 'en' ? '🇬🇧' : '🇬🇧'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => changeLanguage('fr')}>
              {selectedLanguage === 'fr' ? '🇫🇷' : '🇫🇷'}
            </Button>
          </div>
        </CardTitle>
        <RosettaProgress 
          progress={progress} 
          currentIndex={currentPhraseIndex} 
          totalPhrases={rosettaPhrases.length} 
        />
      </CardHeader>

      <CardContent className="pt-4">
        <RosettaPhrase 
          phrase={currentPhrase} 
          language={selectedLanguage as Language} 
          playAudio={playAudio}
          isPlaying={isAudioPlaying}
        />
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <RosettaControls
          onPrevious={previousPhrase}
          onNext={nextPhrase}
          onReset={resetProgress}
          onComplete={markCompleted}
          isFirstPhrase={currentPhraseIndex === 0}
          isLastPhrase={currentPhraseIndex === rosettaPhrases.length - 1}
          isCompleted={completed}
        />
      </CardFooter>
    </Card>
  );
};

export default RosettaLearning;
