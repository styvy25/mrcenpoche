
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Mic, Check, Play, BookOpen, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RosettaLearningProps {
  moduleId: string | number;
  lessonContent: string;
  onComplete: () => void;
}

interface LearningItem {
  id: number;
  originalText: string;
  translation: string;
  audioUrl?: string;
}

const RosettaLearning: React.FC<RosettaLearningProps> = ({ 
  moduleId, 
  lessonContent,
  onComplete 
}) => {
  const [activeTab, setActiveTab] = useState("learn");
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [userTranscript, setUserTranscript] = useState("");
  const [learningItems, setLearningItems] = useState<LearningItem[]>([]);
  const { toast } = useToast();

  // Process lesson content to create learning items
  useEffect(() => {
    if (!lessonContent) return;
    
    // Simple example to extract sentences from content
    // In a real implementation, this would be more sophisticated
    const sentences = lessonContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 10 && s.length < 100)
      .slice(0, 8);
    
    const items: LearningItem[] = sentences.map((sentence, idx) => ({
      id: idx + 1,
      originalText: sentence,
      translation: sentence, // In real app, this would be a translation
      audioUrl: undefined // Would be real audio URLs in production
    }));
    
    setLearningItems(items);
  }, [lessonContent]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore - WebkitSpeechRecognition is not in TS types
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'fr-FR';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setUserTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setUserTranscript("");
      setIsListening(true);
      recognition.start();
    } else {
      toast({
        title: "Fonctionnalité non disponible",
        description: "La reconnaissance vocale n'est pas prise en charge par votre navigateur.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      
      // Compare user's speech to original
      checkPronunciation();
    }
  };

  const playAudio = () => {
    toast({
      title: "Lecture audio",
      description: "Cette fonctionnalité sera disponible prochainement.",
    });
    
    // In a real implementation, this would play the audio file
    // const audio = new Audio(learningItems[currentIndex]?.audioUrl);
    // audio.play();
  };

  const checkPronunciation = () => {
    // In a real implementation, this would use NLP to check pronunciation
    // For now, we'll just simulate success with a random score
    const score = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    toast({
      title: score > 80 ? "Excellente prononciation!" : "Bonne tentative",
      description: `Vous avez obtenu ${score}% de précision.`,
    });
    
    // Move to next item if score is good enough
    if (score > 70 && currentIndex < learningItems.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        updateProgress(currentIndex + 1);
      }, 1500);
    }
  };

  const updateProgress = (index: number) => {
    const newProgress = Math.floor(((index + 1) / learningItems.length) * 100);
    setProgress(newProgress);
    
    if (newProgress >= 100) {
      toast({
        title: "Module terminé!",
        description: "Félicitations! Vous avez complété ce module d'apprentissage.",
      });
      onComplete();
    }
  };

  const handleNext = () => {
    if (currentIndex < learningItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      updateProgress(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      updateProgress(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setProgress(0);
  };

  const currentItem = learningItems[currentIndex];

  if (!currentItem) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Chargement du contenu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Apprentissage Interactif</h3>
        <Button variant="outline" size="sm" onClick={handleRestart}>
          <RotateCw className="h-4 w-4 mr-2" />
          Recommencer
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="learn" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Apprendre</span>
          </TabsTrigger>
          <TabsTrigger value="listen" className="flex items-center gap-1">
            <Volume2 className="h-4 w-4" />
            <span>Écouter</span>
          </TabsTrigger>
          <TabsTrigger value="speak" className="flex items-center gap-1">
            <Mic className="h-4 w-4" />
            <span>Parler</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="learn" className="space-y-4">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <p className="text-xl mb-4">{currentItem.originalText}</p>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <p className="text-lg text-gray-600 dark:text-gray-400">{currentItem.translation}</p>
          </Card>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Précédent
            </Button>
            <Button
              onClick={handleNext}
            >
              {currentIndex === learningItems.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="listen" className="space-y-4">
          <Card className="p-6 flex flex-col items-center bg-white dark:bg-gray-800">
            <p className="text-xl mb-8">{currentItem.originalText}</p>
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full"
              onClick={playAudio}
            >
              <Play className="h-8 w-8" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Cliquez sur le bouton pour écouter la prononciation
            </p>
          </Card>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Précédent
            </Button>
            <Button
              onClick={handleNext}
            >
              {currentIndex === learningItems.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="speak" className="space-y-4">
          <Card className="p-6 flex flex-col items-center bg-white dark:bg-gray-800">
            <p className="text-xl mb-8">{currentItem.originalText}</p>
            
            {isListening ? (
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                onClick={stopListening}
              >
                <Check className="h-8 w-8" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full"
                onClick={startListening}
              >
                <Mic className="h-8 w-8" />
              </Button>
            )}
            
            <p className="text-sm text-muted-foreground mt-4">
              {isListening 
                ? "Je vous écoute... Cliquez pour terminer." 
                : "Cliquez sur le micro et lisez la phrase à haute voix."}
            </p>
            
            {userTranscript && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md w-full">
                <p className="font-medium mb-1">Votre prononciation:</p>
                <p className="text-sm">{userTranscript}</p>
              </div>
            )}
          </Card>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Précédent
            </Button>
            <Button
              onClick={handleNext}
            >
              {currentIndex === learningItems.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RosettaLearning;
