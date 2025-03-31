
import React from "react";
import { Category } from "./types";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";
import NoQuestionsAvailable from "./containers/NoQuestionsAvailable";
import QuizWelcomeScreen from "./containers/QuizWelcomeScreen";
import QuizInProgress from "./containers/QuizInProgress";
import { useQuizState } from "./hooks/useQuizState";

interface QuizContainerProps {
  categories: Category[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ categories }) => {
  const {
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
  } = useQuizState(categories);

  // If no category with questions is found
  if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
    return <NoQuestionsAvailable />;
  }

  // Welcome screen for the quiz
  if (!isStarted) {
    return (
      <QuizWelcomeScreen
        currentCategory={currentCategory}
        isTestCategory={isTestCategory}
        onStartQuiz={() => setIsStarted(true)}
        onPreviousCategory={() => handleCategoryChange(currentCategoryIndex - 1)}
        onNextCategory={() => handleCategoryChange(currentCategoryIndex + 1)}
        currentCategoryIndex={currentCategoryIndex}
        categoriesLength={categories.length}
        isCategorySelectionOpen={isCategorySelectionOpen}
        onToggleCategorySelection={toggleCategorySelection}
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
    );
  }

  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all ${isMobile ? 'p-4' : 'p-6'} animate-fade-in`}>
      <div className="relative">
        {quizResults ? (
          <ResultsScreen
            score={quizResults.score}
            totalQuestions={currentCategory.questions.length}
            categoryName={currentCategory.label || currentCategory.name || ""}
            selectedAnswers={selectedAnswers}
            questions={currentCategory.questions}
            onRestart={restartQuiz}
            earnedBadges={calculateEarnedBadges(quizResults.score, currentCategory.questions.length)}
          />
        ) : (
          <QuizInProgress
            currentCategory={currentCategory}
            isTestCategory={isTestCategory}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            onAnswer={handleAnswer}
            onNextQuestion={nextQuestion}
            onCalculateResults={calculateResults}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
