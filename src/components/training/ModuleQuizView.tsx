
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as ModuleServices from '@/services/modules';
import { usePoints } from '@/hooks/usePoints';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizHeader from './quiz/QuizHeader';

interface Question {
  id: string;
  text: string;
  options: { id: string, text: string }[];
  correctOptionId: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
}

interface ModuleQuizViewProps {
  quiz: Quiz;
  moduleId: string;
}

const ModuleQuizView: React.FC<ModuleQuizViewProps> = ({ quiz, moduleId }) => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const selectedOptionId = selectedAnswers[currentQuestion?.id];
  
  const handleSelectOption = (optionId: string) => {
    if (showExplanation || quizCompleted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionId
    });
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (isLastQuestion) {
      handleCompleteQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleCompleteQuiz = async () => {
    try {
      const score = calculateScore();
      const isPassed = score >= quiz.passingScore;
      
      // Add points based on performance
      const earnedPoints = Math.round(score / 10);
      await addPoints(earnedPoints);
      
      const result = await ModuleServices.submitQuizResult({
        moduleId,
        quizId: quiz.id,
        score,
        answers: selectedAnswers,
        passed: isPassed
      });
      
      setEarnedBadges(result.badges || []);
      setQuizCompleted(true);
      
      toast({
        title: isPassed ? "Félicitations!" : "Quiz terminé",
        description: isPassed 
          ? `Vous avez réussi avec un score de ${score}%. Vous avez gagné ${earnedPoints} points.` 
          : `Vous avez obtenu ${score}%. Essayez encore pour réussir.`,
        variant: isPassed ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Erreur",
        description: "Impossible de soumettre le quiz. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctOptionId) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };
  
  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setEarnedBadges([]);
  };
  
  if (quizCompleted) {
    const score = calculateScore();
    const isPassed = score >= quiz.passingScore;
    
    return (
      <QuizResults 
        score={score}
        totalQuestions={quiz.questions.length}
        isPassed={isPassed}
        onRestart={restartQuiz}
        earnedBadges={earnedBadges}
      />
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <QuizHeader
        title={quiz.title}
        description={quiz.description}
        currentIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
      />
      
      <div className="p-6">
        <QuizQuestion
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          showExplanation={showExplanation}
          onSelectOption={handleSelectOption}
          onNext={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};

export default ModuleQuizView;
