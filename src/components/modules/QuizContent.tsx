
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { moduleQuizzes } from "./quizData";
import { Award } from "lucide-react";
import QuizQuestion from "@/components/quiz/components/QuizQuestion";
import AnswerFeedback from "@/components/quiz/components/AnswerFeedback";
import QuizCompleted from "@/components/quiz/components/QuizCompleted";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ moduleId, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const quiz = moduleQuizzes[Number(moduleId)];
  
  useEffect(() => {
    // Reset the quiz state when moduleId changes
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  }, [moduleId]);
  
  if (!quiz) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz non trouvé</h2>
        <Button onClick={onBack}>Retour</Button>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    const currentQuestionData = quiz.questions[currentQuestion];
    const isAnswerCorrect = answer === currentQuestionData.correctAnswer;
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      
      // Show toast for achievement when quiz is completed
      toast({
        title: "Quiz terminé !",
        description: (
          <div className="flex items-center">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Vous avez obtenu un nouvel accomplissement !</span>
          </div>
        ),
      });
      
      onComplete(score + (isCorrect ? 1 : 0), quiz.questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <QuizCompleted
        score={score}
        totalQuestions={quiz.questions.length}
        onBack={onBack}
        onRestart={handleRestartQuiz}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600">Question {currentQuestion + 1} sur {quiz.questions.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {showFeedback ? (
          <AnswerFeedback 
            isCorrect={isCorrect}
            explanation={quiz.questions[currentQuestion].explanation || ""}
            onContinue={handleContinue}
          />
        ) : (
          <QuizQuestion
            question={quiz.questions[currentQuestion].question}
            options={quiz.questions[currentQuestion].options}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestion}
            totalQuestions={quiz.questions.length}
          />
        )}
      </div>

      <Button variant="ghost" onClick={onBack}>
        Quitter le quiz
      </Button>
    </div>
  );
};

export default QuizContent;
