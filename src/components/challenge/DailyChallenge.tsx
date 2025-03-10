
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Check, Lightbulb, Timer } from "lucide-react";
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";
import { Badge } from "@/components/ui/badge";

interface DailyChallengeProps {
  onComplete: () => void;
}

// Tableau de défis quotidiens
const challengePrompts = [
  "Expliquez comment vous présenteriez le programme économique du MRC à un groupe d'entrepreneurs locaux.",
  "Proposez une stratégie pour mobiliser les jeunes de votre quartier autour des idées du MRC.",
  "Comment expliqueriez-vous l'importance de la participation électorale à un citoyen désabusé par la politique ?",
  "Décrivez trois actions concrètes que vous pourriez mettre en place pour promouvoir la transparence dans votre communauté.",
  "Comment répondriez-vous à quelqu'un qui affirme que tous les partis politiques sont identiques ?",
  "Proposez une stratégie de communication pour expliquer les réformes électorales défendues par le MRC.",
  "Comment pourriez-vous organiser un débat constructif entre partisans de différents partis politiques ?",
];

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete }) => {
  const [challenge, setChallenge] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    // Sélectionner un défi aléatoire ou basé sur le jour
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const challengeIndex = dayOfYear % challengePrompts.length;
    setChallenge(challengePrompts[challengeIndex]);

    // Vérifier si le défi a déjà été complété aujourd'hui
    const lastCompletedDate = localStorage.getItem('lastDailyChallengeDate');
    if (lastCompletedDate === today.toDateString()) {
      setIsCompleted(true);
      const savedFeedback = localStorage.getItem('lastChallengeFeedback');
      if (savedFeedback) {
        setFeedback(savedFeedback);
      }
    } else {
      // Initialiser le minuteur pour 5 minutes (300 secondes)
      setTimeRemaining(600);
    }
  }, []);

  useEffect(() => {
    // Minuteur pour le défi
    let timer: NodeJS.Timeout;
    if (timeRemaining > 0 && !isCompleted) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
    if (response.length < 50) {
      toast({
        title: "Réponse trop courte",
        description: "Veuillez élaborer davantage votre réponse (minimum 50 caractères).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Clé API requise",
          description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { perplexity } = JSON.parse(apiKeys);
      if (!perplexity) {
        toast({
          title: "Clé API Perplexity manquante",
          description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      setIsEvaluating(true);
      const evaluationPrompt = `
        Évalue la réponse suivante à ce défi politique: "${challenge}"
        
        Réponse de l'utilisateur: "${response}"
        
        Donne une évaluation constructive en français en 3-4 phrases. Note les points forts et suggère des améliorations.
        Sois encourageant mais critique. Évalue la clarté, la pertinence et la persuasion politique.
      `;

      const evaluationResponse = await getPerplexityResponse(perplexity, evaluationPrompt);
      setFeedback(evaluationResponse);
      setIsCompleted(true);
      
      // Sauvegarder le résultat
      localStorage.setItem('lastDailyChallengeDate', new Date().toDateString());
      localStorage.setItem('lastChallengeFeedback', evaluationResponse);
      
      toast({
        title: "Défi complété",
        description: "Votre réponse a été évaluée avec succès.",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'évaluation de votre réponse.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsEvaluating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Défi quotidien
            </CardTitle>
            <CardDescription>
              Développez vos compétences politiques avec un défi quotidien
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-medium mb-2">Votre défi d'aujourd'hui:</h3>
            <p className="text-gray-700">{challenge}</p>
          </div>

          {!isCompleted ? (
            <>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Temps restant: {formatTime(timeRemaining)}</span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  10 minutes maximum recommandées
                </span>
              </div>
              <Textarea
                placeholder="Écrivez votre réponse ici..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[150px]"
                disabled={isSubmitting || isEvaluating}
              />
            </>
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Défi complété</h3>
              </div>
              <p className="text-gray-700 mb-4">{response}</p>
              <div className="bg-white p-3 rounded border border-gray-100">
                <h4 className="text-sm font-medium mb-1">Évaluation:</h4>
                <p className="text-sm text-gray-600">{feedback}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isCompleted ? (
          <Button
            onClick={handleSubmit}
            disabled={response.length < 50 || isSubmitting || isEvaluating || timeRemaining === 0}
            className="bg-mrc-blue"
          >
            {isSubmitting || isEvaluating ? "Évaluation en cours..." : "Soumettre votre réponse"}
          </Button>
        ) : (
          <Button onClick={onComplete} className="bg-green-600">
            Retour au tableau de bord
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
