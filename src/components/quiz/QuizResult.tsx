
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizResult as QuizResultType } from "./types";
import { Award, RotateCcw, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

const QuizResult = ({ result, onRestart }: QuizResultProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (result.score >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [result.score]);

  const getScoreColor = () => {
    if (result.score >= 80) return "text-green-600";
    if (result.score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreText = () => {
    if (result.score >= 90) return "Excellent !";
    if (result.score >= 80) return "Très bien !";
    if (result.score >= 70) return "Bien !";
    if (result.score >= 50) return "Peut mieux faire";
    return "À améliorer";
  };

  const shareResult = () => {
    // Using navigator.share if available, otherwise copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: 'MRC LearnScape - Résultat du Quiz Culturel',
        text: `J'ai obtenu un score de ${result.score.toFixed(0)}% au Quiz Culturel Camerounais sur MRC LearnScape !`,
        url: window.location.href,
      }).catch(err => {
        console.error('Failed to share', err);
      });
    } else {
      // Fallback to copy to clipboard
      const shareText = `J'ai obtenu un score de ${result.score.toFixed(0)}% au Quiz Culturel Camerounais sur MRC LearnScape !`;
      navigator.clipboard.writeText(shareText).then(() => {
        toast.success('Résultat copié dans le presse-papier !');
      }).catch(err => {
        console.error('Failed to copy', err);
        toast.error('Impossible de copier le résultat');
      });
    }
  };

  return (
    <Card className="shadow-xl overflow-hidden">
      {showConfetti && (
        <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#005BAA', '#E30016', '#009A44', '#FCD116'][Math.floor(Math.random() * 4)],
                opacity: Math.random() + 0.5,
                animation: `fall ${Math.random() * 3 + 2}s linear`,
                top: `-${Math.random() * 20 + 10}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}
      
      <CardHeader className="bg-gradient-to-r from-mrc-blue to-blue-600 text-white">
        <CardTitle className="text-center">Résultat du Quiz</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className={`text-3xl font-bold ${getScoreColor()}`}>
            {result.score.toFixed(0)}%
          </h3>
          <p className="text-gray-600">{getScoreText()}</p>
          <p className="text-sm text-gray-500 mt-1">
            {result.correctAnswers} bonnes réponses sur {result.totalQuestions} questions
          </p>
        </div>
        
        <Progress value={result.score} className="h-3 mb-8" />
        
        {result.unlockedBadges.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Badges débloqués
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.unlockedBadges.map(badge => (
                <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${badge.colorClass} text-white mr-3`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{badge.name}</p>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between p-6 pt-0">
        <Button onClick={onRestart} variant="outline" className="flex items-center">
          <RotateCcw className="mr-2 h-4 w-4" />
          Recommencer
        </Button>
        <Button onClick={shareResult} className="bg-mrc-blue hover:bg-blue-700 flex items-center">
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResult;
