
import { useState, useCallback, useEffect } from "react";
import { Category, QuizQuestion } from "../types";
import { useMediaQuery } from "@/hooks/use-media-query";

export const useQuizState = (categories: Category[]) => {
  // State
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizResults, setQuizResults] = useState<{ score: number } | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isCategorySelectionOpen, setIsCategorySelectionOpen] = useState(false);
  const [timeStarted, setTimeStarted] = useState<number | null>(null);
  
  // Derived state
  const currentCategory = categories[currentCategoryIndex];
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  
  // Track when the quiz is started
  useEffect(() => {
    if (isStarted && !timeStarted) {
      setTimeStarted(Date.now());
    }
  }, [isStarted, timeStarted]);
  
  // Handlers
  const handleCategoryChange = useCallback((index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResults(null);
  }, []);
  
  const handleAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  }, [currentQuestionIndex]);
  
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      calculateResults();
    }
  }, [currentQuestionIndex, currentCategory?.questions?.length]);
  
  const calculateResults = useCallback(() => {
    let correctAnswers = 0;
    
    if (!currentCategory || !currentCategory.questions) {
      setQuizResults({ score: 0 });
      return;
    }
    
    currentCategory.questions.forEach((question, index) => {
      // Convert correct answer to number if it's a string
      const correctAnswerIndex = typeof question.correctAnswer === 'string' 
        ? parseInt(question.correctAnswer) 
        : question.correctAnswer;
        
      if (selectedAnswers[index] === correctAnswerIndex) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / currentCategory.questions.length) * 100);
    
    setQuizResults({ score });
  }, [currentCategory, selectedAnswers]);
  
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResults(null);
    setIsStarted(false);
    setTimeStarted(null);
  }, []);
  
  return {
    currentCategoryIndex,
    currentCategory,
    currentQuestionIndex,
    selectedAnswers,
    quizResults,
    isStarted,
    isCategorySelectionOpen,
    isSmallScreen,
    timeStarted,
    setIsCategorySelectionOpen,
    handleCategoryChange,
    handleAnswer,
    nextQuestion,
    calculateResults,
    restartQuiz,
    setIsStarted
  };
};
