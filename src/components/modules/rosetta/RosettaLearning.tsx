
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface RosettaLearningProps {
  moduleId: string;
  onComplete: () => void;
}

const RosettaLearning: React.FC<RosettaLearningProps> = ({ moduleId, onComplete }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState("exercise");

  // Sample phrases for the language learning exercise
  const phrases = [
    {
      original: "Je m'engage pour la Renaissance du Cameroun",
      translation: "I am committed to the Renaissance of Cameroon"
    },
    {
      original: "La politique est l'art du possible",
      translation: "Politics is the art of the possible"
    },
    {
      original: "Le changement commence par chacun de nous",
      translation: "Change begins with each of us"
    },
    {
      original: "Ensemble, nous pouvons transformer notre pays",
      translation: "Together, we can transform our country"
    },
    {
      original: "La démocratie exige la participation de tous",
      translation: "Democracy requires everyone's participation"
    }
  ];

  const handleComplete = () => {
    setShowResult(true);
    if (score > (phrases.length / 2)) {
      // Only call onComplete if the score is greater than half
      onComplete();
    }
  };

  const handleNext = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
      setScore(score + 1);
    } else {
      handleComplete();
    }
  };

  useEffect(() => {
    // Reset exercise state when moduleId changes
    setCurrentPhrase(0);
    setScore(0);
    setShowResult(false);
  }, [moduleId]);

  if (showResult) {
    const percentage = Math.round((score / phrases.length) * 100);
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Exercice terminé</h2>
          <p className="text-lg mb-4">
            Votre score: {score} sur {phrases.length}
          </p>
          <Progress value={percentage} className="h-2 w-full mb-4" />
          <p className="mb-6">
            {percentage >= 80 
              ? "Excellent! Vous avez bien maîtrisé cet exercice."
              : percentage >= 60
              ? "Bon travail! Continuez à pratiquer."
              : "Continuez à pratiquer pour améliorer vos compétences."}
          </p>
          <Button 
            onClick={() => {
              setCurrentPhrase(0);
              setScore(0);
              setShowResult(false);
            }}
            className="mr-2"
          >
            Recommencer
          </Button>
          <Button onClick={onComplete} variant="outline">
            Terminer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="exercise">Exercice</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercise">
            <div className="space-y-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Phrase {currentPhrase + 1} sur {phrases.length}</p>
                <Progress value={((currentPhrase + 1) / phrases.length) * 100} className="h-2" />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Traduisez cette phrase:</h3>
                <p className="text-lg font-semibold">{phrases[currentPhrase].original}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Traduction:</h3>
                <p className="italic">{phrases[currentPhrase].translation}</p>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (currentPhrase > 0) {
                      setCurrentPhrase(currentPhrase - 1);
                      setScore(Math.max(0, score - 1));
                    }
                  }}
                  disabled={currentPhrase === 0}
                >
                  Précédent
                </Button>
                <Button onClick={handleNext}>
                  {currentPhrase < phrases.length - 1 ? "Suivant" : "Terminer"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="prose prose-sm max-w-none">
              <h3>Comment utiliser cet exercice</h3>
              <p>
                Cet exercice vous aide à assimiler des concepts politiques importants 
                en traduisant des phrases du français vers l'anglais. Pour chaque phrase:
              </p>
              <ol>
                <li>Lisez attentivement la phrase en français</li>
                <li>Essayez de la traduire mentalement</li>
                <li>Vérifiez votre réponse avec la traduction fournie</li>
                <li>Passez à la phrase suivante</li>
              </ol>
              <p>
                Cette approche, inspirée de la méthode Rosetta, renforce votre compréhension 
                par la répétition et la comparaison entre les deux langues.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RosettaLearning;
