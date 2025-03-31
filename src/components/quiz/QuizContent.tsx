
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { moduleQuizzes } from "../modules/quizData";
import { Award } from "lucide-react";
import QuizScreens from "./components/QuizScreens";
import { QuizState } from "./types";
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification, PointsActionType } from "@/services/gamificationService";
import { calculateEarnedBadges } from "./badgeUtils";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ moduleId, onBack, onComplete }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    selectedAnswers: [],
    timeRemaining: 0,
    isFinished: false,
    isStarted: true,
    showFeedback: false,
    isCorrect: false,
    quizCompleted: false
  });
  
  const { toast } = useToast();
  const quiz = moduleQuizzes[Number(moduleId)];
  const { currentUser } = useAuth();
  const { handleQuizCompletion } = useGamification(currentUser?.id || 'anonymous');
  
  useEffect(() => {
    // Reset the quiz state when moduleId changes
    setQuizState({
      currentQuestion: 0,
      score: 0,
      selectedAnswers: [],
      timeRemaining: 0,
      isFinished: false,
      isStarted: true,
      showFeedback: false,
      quizCompleted: false,
      isCorrect: false
    });
  }, [moduleId]);
  
  if (!quiz) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz non trouvé</h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    const currentQuestionData = quiz.questions[quizState.currentQuestion];
    const isAnswerCorrect = answer === currentQuestionData.correctAnswer;
    
    // Create a copy of the current selected answers
    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestion] = answer;
    
    setQuizState({
      ...quizState,
      score: isAnswerCorrect ? (quizState.score || 0) + 1 : (quizState.score || 0),
      isCorrect: isAnswerCorrect,
      showFeedback: true,
      selectedAnswers: newSelectedAnswers
    });
  };

  const handleContinue = () => {
    if (quizState.currentQuestion < quiz.questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        showFeedback: false
      });
    } else {
      // Quiz is completed
      const finalScore = (quizState.score || 0) + (quizState.isCorrect ? 1 : 0);
      
      // Préparer le résultat pour le système de gamification
      const quizResult = {
        score: (finalScore / quiz.questions.length) * 100,
        correctAnswers: finalScore,
        totalQuestions: quiz.questions.length,
        timeSpent: 0, // Nous n'avons pas de tracking du temps pour le moment
        unlockedBadges: calculateEarnedBadges(finalScore, quiz.questions.length),
        date: new Date(),
        wrongAnswers: []
      };
      
      // Mettre à jour le système de gamification
      if (currentUser) {
        handleQuizCompletion(quizResult);
      }
      
      setQuizState({
        ...quizState,
        quizCompleted: true
      });
      
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
      
      onComplete(finalScore, quiz.questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      selectedAnswers: [],
      timeRemaining: 0,
      isFinished: false,
      isStarted: true,
      showFeedback: false,
      quizCompleted: false,
      isCorrect: false
    });
  };

  return (
    <QuizScreens
      quiz={quiz}
      quizState={quizState}
      onAnswer={handleAnswer}
      onContinue={handleContinue}
      onRestart={handleRestartQuiz}
      onBack={onBack}
    />
  );
};

export default QuizContent;
