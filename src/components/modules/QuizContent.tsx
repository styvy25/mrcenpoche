
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { QuizQuestion, ModuleQuestion } from './types';
import { useTheme } from '@/hooks/useTheme';
import histoireQuiz from './quizData/histoireQuiz';

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ moduleId, onBack, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch questions based on moduleId from an API
        // For now, use the sample questions
        const moduleQuestions = histoireQuiz;

        // Convert ModuleQuestion to QuizQuestion format
        const convertedQuestions: QuizQuestion[] = moduleQuestions.map(q => {
          return {
            id: q.id,
            text: q.text || q.question || '',
            options: q.options,
            correctAnswer: q.answer || q.correctOptionId || "0",
            explanation: q.explanation,
            category: q.category,
            difficulty: q.difficulty,
            imageSrc: q.imageSrc
          };
        });

        setQuestions(convertedQuestions as any);
      } catch (error) {
        console.error('Error loading quiz questions:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les questions du quiz.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [moduleId, toast]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(answerIndex);

    // Check if the answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = typeof currentQuestion.correctAnswer === 'string' 
      ? parseInt(currentQuestion.correctAnswer) 
      : currentQuestion.correctAnswer;
    
    if (answerIndex === correctAnswerIndex) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      onComplete(score, questions.length);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full p-6">
        <CardHeader>
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Chargement du Quiz...</h2>
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full p-6">
        <CardHeader>
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Quiz non disponible</h2>
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <p>Aucune question n'est disponible pour ce quiz. Veuillez réessayer plus tard.</p>
          <Button onClick={onBack} className="mt-4">
            Retourner aux modules
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const scorePercentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="w-full p-6">
        <CardHeader>
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Résultats du Quiz</h2>
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <div className="text-center">
            {scorePercentage >= 70 ? (
              <div className="bg-green-100 p-6 rounded-lg border border-green-200 mb-6 dark:bg-green-900/20 dark:border-green-800">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Félicitations!</h3>
                <p className="text-green-600 dark:text-green-400">
                  Vous avez réussi avec un score de {scorePercentage}%
                </p>
              </div>
            ) : (
              <div className="bg-amber-100 p-6 rounded-lg border border-amber-200 mb-6 dark:bg-amber-900/20 dark:border-amber-800">
                <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Score: {scorePercentage}%
                </h3>
                <p className="text-amber-600 dark:text-amber-400">
                  Vous pouvez réessayer pour améliorer votre score.
                </p>
              </div>
            )}
            
            <div className="mt-8">
              <Button onClick={onBack} variant="default" className="mr-4">
                Retourner aux modules
              </Button>
              <Button 
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setScore(0);
                  setShowResult(false);
                }} 
                variant="outline"
              >
                Réessayer le quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <Card className="w-full p-6">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} sur {questions.length}</h2>
        </div>
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="py-6">
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">{currentQuestion.text}</h3>
          {currentQuestion.imageSrc && (
            <div className="mb-4">
              <img 
                src={currentQuestion.imageSrc} 
                alt={`Illustration pour ${currentQuestion.text}`}
                className="rounded-lg max-h-48 mx-auto object-contain"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const correctAnswer = typeof currentQuestion.correctAnswer === 'string' ? 
              parseInt(currentQuestion.correctAnswer) : currentQuestion.correctAnswer;
            const isCorrect = correctAnswer === index;
            const showFeedback = selectedAnswer !== null;

            return (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  isSelected ? 'border-2' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                } ${
                  isSelected && isCorrect && showFeedback ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''
                } ${
                  isSelected && !isCorrect && showFeedback ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''
                } ${
                  isSelected && !showFeedback ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 ${
                    isSelected ? 
                      isCorrect && showFeedback ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' : 
                      !isCorrect && showFeedback ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100' : 
                      'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{typeof option === 'string' ? option : option.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedAnswer !== null && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <p className="text-blue-700 dark:text-blue-300">{currentQuestion.explanation}</p>
          </div>
        )}
        
        {selectedAnswer !== null && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleNextQuestion} className="px-5">
              {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizContent;
