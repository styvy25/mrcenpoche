
import { useState, useEffect } from "react";
import { Category } from "../types";
import { useMediaQuery } from "@/hooks/use-media-query";

export const useQuizState = (categories: Category[]) => {
  // Find the first category with questions
  const initialCategory = categories.find(cat => 
    cat.questions && cat.questions.length > 0
  ) || categories[0];
  
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(categories.indexOf(initialCategory));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>([]);
  const [quizResults, setQuizResults] = useState<{ score: number } | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(initialCategory);
  const [isStarted, setIsStarted] = useState(false);
  const [isCategorySelectionOpen, setIsCategorySelectionOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  // Validate that we have a valid category
  useEffect(() => {
    if (!currentCategory) {
      setCurrentCategory(initialCategory);
    }
  }, [currentCategory, initialCategory]);

  const handleCategoryChange = (index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentCategory(categories[index]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizResults(null);
    setIsStarted(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const category = categories[currentCategoryIndex];
    if (!category?.questions) return;
    
    // Update the selected answers
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);

    // Check if this is the last question
    const isLastQuestion = currentQuestionIndex === category.questions.length - 1;

    if (isLastQuestion) {
      calculateResults();
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const calculateResults = () => {
    const category = categories[currentCategoryIndex];
    if (!category?.questions) return;
    
    const questions = category.questions;
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        score++;
      }
    });

    setQuizResults({ score: score });
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizResults(null);
    setIsStarted(false);
  };

  return {
    currentCategoryIndex,
    currentCategory,
    currentQuestionIndex,
    selectedAnswers,
    quizResults,
    isStarted,
    isCategorySelectionOpen,
    isSmallScreen,
    setIsCategorySelectionOpen,
    handleCategoryChange,
    handleAnswer,
    nextQuestion,
    calculateResults,
    restartQuiz,
    setIsStarted
  };
};
