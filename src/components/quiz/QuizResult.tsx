
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizResult as QuizResultType } from './types';
import QuizBadgesDisplay from './QuizBadgesDisplay';
import { Award, RotateCcw, Share2 } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  result?: QuizResultType;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  result
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Calculate a message based on the score
  const getMessage = () => {
    if (percentage >= 90) return "Excellent ! Vous êtes un expert !";
    if (percentage >= 70) return "Très bien ! Vous avez de bonnes connaissances.";
    if (percentage >= 50) return "Bien ! Il y a encore de la place pour progresser.";
    return "Continuez à pratiquer pour améliorer vos connaissances.";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Mon score au quiz ${categoryName}`,
        text: `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au quiz sur ${categoryName}. Pouvez-vous faire mieux ?`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(`Partagez votre score: ${score}/${totalQuestions} (${percentage}%)`);
    }
  };

  return (
    <div className="space-y-8 text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Award className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Quiz terminé !</h2>
        <p className="text-gray-600 mt-2">Catégorie: {categoryName}</p>
      </div>

      <div className="bg-primary/5 p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2">{percentage}%</div>
        <p className="text-gray-600">
          {score} réponses correctes sur {totalQuestions} questions
        </p>
        <p className="text-primary font-medium mt-3">{getMessage()}</p>
      </div>

      {result?.unlockedBadges && result.unlockedBadges.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Badges débloqués</h3>
          <QuizBadgesDisplay badges={result.unlockedBadges} />
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Recommencer
        </Button>
        <Button onClick={handleShare} size="lg">
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
