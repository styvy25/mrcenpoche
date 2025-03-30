
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from './types';
import { Share2, RotateCcw, Award } from 'lucide-react';
import SocialShareButtons from '@/components/shared/SocialShareButtons';
import { saveQuizAttempt } from '@/services/quizService';
import { useAuth } from '@/components/auth/AuthContext';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  result: QuizResult;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  result
}) => {
  const [showShare, setShowShare] = React.useState(false);
  const { currentUser } = useAuth();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  React.useEffect(() => {
    // Save the quiz result to Supabase if user is logged in
    const saveResult = async () => {
      if (currentUser?.id) {
        try {
          // This is a simplified version - in a real app you'd need to track question IDs and answers
          await saveQuizAttempt(
            currentUser.id,
            "unknown-category", // You'd want to save the actual category ID
            score,
            totalQuestions,
            [] // You'd want to save the actual answers
          );
        } catch (error) {
          console.error("Error saving quiz result:", error);
        }
      }
    };
    
    saveResult();
  }, [currentUser, score, totalQuestions]);

  let message = "";
  let color = "";

  if (percentage >= 80) {
    message = "Excellent ! Vous maîtrisez ce sujet.";
    color = "text-green-600";
  } else if (percentage >= 60) {
    message = "Bon travail ! Vous avez une bonne compréhension du sujet.";
    color = "text-blue-600";
  } else if (percentage >= 40) {
    message = "Pas mal. Avec un peu plus d'étude, vous pouvez vous améliorer.";
    color = "text-yellow-600";
  } else {
    message = "Continuez à apprendre. Vous pouvez faire mieux la prochaine fois.";
    color = "text-red-600";
  }

  return (
    <div className="text-center space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Résultats du Quiz</h2>
        <p className="text-muted-foreground">{categoryName}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 max-w-md mx-auto">
        <div className="text-4xl font-bold text-mrc-blue mb-4">
          {score}/{totalQuestions}
        </div>
        
        <Progress value={percentage} className="h-3 mb-2" />
        
        <div className="flex justify-between text-sm mb-4">
          <span>0%</span>
          <span className={percentage >= 60 ? "text-green-600 font-medium" : "text-gray-500"}>
            60%
          </span>
          <span>100%</span>
        </div>
        
        <div className={`${color} mt-2`}>
          {message}
        </div>
        
        {result.unlockedBadges && result.unlockedBadges.length > 0 && (
          <div className="mt-4 flex items-center justify-center">
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-yellow-500" />
              <span>{result.unlockedBadges.length} badge{result.unlockedBadges.length > 1 ? 's' : ''} débloqué{result.unlockedBadges.length > 1 ? 's' : ''}</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button 
          variant="outline" 
          onClick={() => setShowShare(!showShare)}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Partager
        </Button>
        
        <Button 
          onClick={onRestart}
          className="bg-mrc-blue flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer
        </Button>
      </div>

      {showShare && (
        <div className="mt-4">
          <SocialShareButtons 
            title={`J'ai obtenu ${score}/${totalQuestions} au quiz sur ${categoryName} dans MRC en Poche !`}
            description="Testez vos connaissances et voyez si vous pouvez battre mon score !"
            type="quiz"
          />
        </div>
      )}
    </div>
  );
};

export default QuizResult;
