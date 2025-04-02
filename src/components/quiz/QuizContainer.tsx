
import React from "react";
import { Category } from "./types";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";
import QuizWelcomeScreen from "./QuizWelcomeScreen";
import QuizHeader from "./QuizHeader";
import { useQuizState } from "./hooks/useQuizState";

interface QuizContainerProps {
  categories: Category[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ categories }) => {
  const {
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
  } = useQuizState(categories);

  // Early return with an error state if categories are invalid
  if (!categories || categories.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune catégorie disponible</h2>
        <p className="text-gray-600">Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  // Early return if current category is invalid
  if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
    return (
      <div className="p-8 text-center">
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

  // Render results screen if quiz is completed
  if (quizResults) {
    const correctAnswersCount = currentCategory.questions.filter(
      (_, index) => {
        const correctAnswerIndex = typeof currentCategory.questions[index].correctAnswer === 'string'
          ? parseInt(currentCategory.questions[index].correctAnswer)
          : currentCategory.questions[index].correctAnswer;
        return selectedAnswers[index] === correctAnswerIndex;
      }
    ).length;

    return (
      <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all ${isSmallScreen ? 'p-4' : 'p-6'}`}>
        <ResultsScreen
          score={quizResults.score}
          totalQuestions={currentCategory.questions.length}
          categoryName={currentCategory.label || currentCategory.name || ""}
          selectedAnswers={selectedAnswers}
          questions={currentCategory.questions}
          onRestart={restartQuiz}
          earnedBadges={calculateEarnedBadges(quizResults.score, currentCategory.questions.length)}
          timeSpent={0}
          correctAnswers={correctAnswersCount}
        />
      </div>
    );
  }

  // Render the quiz question screen
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all ${isSmallScreen ? 'p-4' : 'p-6'}`}>
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
  );
};

export default QuizContainer;
