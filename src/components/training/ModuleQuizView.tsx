
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as adaptiveModuleService from '@/services/adaptiveModuleService';
import { usePoints } from '@/hooks/usePoints';

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
  const isCorrect = selectedOptionId === currentQuestion?.correctOptionId;
  
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
      
      const result = await adaptiveModuleService.submitQuizResult({
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
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
            {isPassed ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <AlertCircle className="w-16 h-16 text-amber-500" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isPassed ? 'Félicitations!' : 'Essayez encore!'}
          </h2>
          
          <p className="text-gray-400 mb-4">
            {isPassed
              ? 'Vous avez réussi le quiz.'
              : `Vous avez besoin de ${quiz.passingScore}% pour réussir.`}
          </p>
          
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-3xl font-bold">
              {Math.round((score / 100) * quiz.questions.length)}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">{quiz.questions.length}</span>
            <span className="ml-2 text-2xl font-bold">
              {score}%
            </span>
          </div>
        </div>
        
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-center text-lg font-semibold mb-4">Badges obtenus</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-b from-gray-700 to-gray-800 p-4 rounded-lg border border-gray-700 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <Award className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold">{badge.name}</h4>
                  <p className="text-sm text-gray-400">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button onClick={restartQuiz}>
            Recommencer le quiz
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{quiz.title}</h3>
          <div className="text-sm">
            Question {currentQuestionIndex + 1} / {quiz.questions.length}
          </div>
        </div>
        <p className="text-sm text-gray-400">{quiz.description}</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrectOption = option.id === currentQuestion.correctOptionId;
              let optionClass = "border-gray-700 hover:border-gray-600";
              
              if (showExplanation) {
                if (isCorrectOption) {
                  optionClass = "border-green-500 bg-green-500/10";
                } else if (isSelected && !isCorrectOption) {
                  optionClass = "border-red-500 bg-red-500/10";
                }
              } else if (isSelected) {
                optionClass = "border-blue-500";
              }
              
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`cursor-pointer p-4 border rounded-lg transition-all ${optionClass} ${
                    !showExplanation ? 'hover:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option.text}</span>
                    
                    {showExplanation && isCorrectOption && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    
                    {showExplanation && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-700 p-4 rounded-lg mb-6"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium mb-1">
                    {isCorrect ? 'Bonne réponse!' : 'Pas tout à fait...'}
                  </p>
                  <p className="text-sm text-gray-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOptionId}
            className={`${
              isLastQuestion ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
          >
            {isLastQuestion ? 'Terminer le quiz' : 'Question suivante'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleQuizView;
