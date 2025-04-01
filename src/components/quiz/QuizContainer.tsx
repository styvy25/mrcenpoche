
import React, { useState, useEffect } from "react";
import { Category, QuizQuestion } from "./types";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";
import QuizWelcomeScreen from "./QuizWelcomeScreen";
import QuizHeader from "./QuizHeader";
import { useMediaQuery } from "@/hooks/use-media-query";

interface QuizContainerProps {
  categories: Category[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ categories }) => {
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

  // If no category with questions is found
  if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune question disponible</h2>
        <p className="text-gray-600">Veuillez sélectionner une autre catégorie ou réessayer plus tard.</p>
      </div>
    );
  }

  // Welcome screen for the quiz
  if (!isStarted) {
    return (
      <QuizWelcomeScreen
        currentCategory={currentCategory}
        currentCategoryIndex={currentCategoryIndex}
        categories={categories}
        isCategorySelectionOpen={isCategorySelectionOpen}
        setIsCategorySelectionOpen={setIsCategorySelectionOpen}
        handleCategoryChange={handleCategoryChange}
        setIsStarted={setIsStarted}
      />
    );
  }

  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;
  const isTestCategory = currentCategory.id === "test";

  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all ${isSmallScreen ? 'p-4' : 'p-6'} animate-fade-in`}>
      {quizResults ? (
        <ResultsScreen
          score={quizResults.score}
          totalQuestions={currentCategory.questions.length}
          categoryName={currentCategory.label || currentCategory.name || ""}
          selectedAnswers={selectedAnswers}
          questions={currentCategory.questions}
          onRestart={restartQuiz}
          earnedBadges={calculateEarnedBadges(quizResults.score, currentCategory.questions.length)}
          timeSpent={0}
          correctAnswers={quizResults.score}
        />
      ) : (
        <div>
          <QuizHeader 
            categoryName={currentCategory.name}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={currentCategory.questions.length}
            isTestCategory={isTestCategory}
          />

          <QuestionScreen
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            isLastQuestion={isLastQuestion}
            onNextQuestion={nextQuestion}
            onCalculateResults={calculateResults}
          />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
