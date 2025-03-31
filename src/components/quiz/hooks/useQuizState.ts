
import { useState, useEffect } from "react";
import { Category, QuizQuestion } from "../types";
import { useMediaQuery } from "@/hooks/use-media-query";

export function useQuizState(categories: Category[]) {
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
  const { isMobile } = useMediaQuery("(max-width: 640px)");

  // Validate that we have a valid category
  useEffect(() => {
    if (!currentCategory) {
      setCurrentCategory(initialCategory);
    }
    
    // Reset the quiz state when category changes
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizResults(null);
    setIsStarted(false);
  }, [currentCategory, initialCategory]);

  const handleCategoryChange = (index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentCategory(categories[index]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const question = currentCategory.questions[currentQuestionIndex];

    if (!question) {
      console.error("No current question found");
      return;
    }

    // Update the selected answers
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const calculateResults = () => {
    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const questions = currentCategory.questions;
    let score = 0;

    questions.forEach((question, index) => {
      const correctAnswer = typeof question.correctAnswer === 'string' 
        ? parseInt(question.correctAnswer, 10) 
        : question.correctAnswer;
      
      if (correctAnswer === selectedAnswers[index]) {
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

  const toggleCategorySelection = () => {
    setIsCategorySelectionOpen(!isCategorySelectionOpen);
  };

  // Determine if the current category is a test category
  const isTestCategory = currentCategory ? currentCategory.id === "test" : false;

  return {
    currentCategoryIndex,
    currentQuestionIndex,
    selectedAnswers,
    quizResults,
    currentCategory,
    isStarted,
    isCategorySelectionOpen,
    isMobile,
    isTestCategory,
    handleCategoryChange,
    handleAnswer,
    nextQuestion,
    calculateResults,
    restartQuiz,
    toggleCategorySelection,
    setIsStarted
  };
}
