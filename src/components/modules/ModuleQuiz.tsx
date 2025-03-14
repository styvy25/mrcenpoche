
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import QuizContent from './QuizContent';
import { useToast } from '@/components/ui/use-toast';

export interface ModuleQuizProps {
  questions: any[];
  onComplete: () => void;
  moduleId: string;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({ questions, onComplete, moduleId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Bonne réponse!",
        description: "Vous avez répondu correctement.",
        variant: "default",
      });
    } else {
      toast({
        title: "Mauvaise réponse",
        description: "Essayez encore!",
        variant: "destructive",
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      showQuizResults();
    }
  };

  const showQuizResults = () => {
    setShowResults(true);
    if (score > (questions.length / 2)) {
      onComplete();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <Card className="p-6">
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Résultats du Quiz</h2>
          <p className="text-xl mb-4">
            Vous avez obtenu {score} sur {questions.length} questions
          </p>
          
          {score > (questions.length / 2) ? (
            <div className="mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-md mb-4">
                <p className="font-medium">Félicitations! Vous avez réussi.</p>
              </div>
              <Button onClick={restartQuiz} variant="outline" className="mr-2">
                Refaire le Quiz
              </Button>
              <Button onClick={onComplete}>
                Continuer
              </Button>
            </div>
          ) : (
            <div className="mb-6">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-md mb-4">
                <p className="font-medium">Vous devez obtenir au moins la moitié des points pour réussir.</p>
              </div>
              <Button onClick={restartQuiz}>
                Réessayer
              </Button>
            </div>
          )}
        </div>
      ) : (
        <QuizContent
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </Card>
  );
};

export default ModuleQuiz;
