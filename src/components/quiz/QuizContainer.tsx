
import React, { useState, useEffect } from "react";
import { Category, QuizQuestion } from "./types";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";

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

  // Validate that we have a valid category
  useEffect(() => {
    if (!currentCategory) {
      setCurrentCategory(initialCategory);
    }
  }, [currentCategory, initialCategory]);

  const handleAnswer = (answerIndex: number) => {
    const category = categories[currentCategoryIndex];

    if (!category) {
      console.error("No current category found");
      return;
    }

    const question = category.questions[currentQuestionIndex];

    if (!question) {
      console.error("No current question found");
      return;
    }

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

    if (!category) {
      console.error("No current category found");
      return;
    }

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
  };

  // If no category with questions is found
  if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune question disponible</h2>
        <p className="text-gray-600">Veuillez sélectionner une autre catégorie ou réessayer plus tard.</p>
      </div>
    );
  }

  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-mrc-green to-mrc-blue shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Quiz de Formation MRC</h1>
          <div className="mt-8">
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
              <QuestionScreen
                currentQuestion={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                isLastQuestion={isLastQuestion}
                onNextQuestion={nextQuestion}
                onCalculateResults={calculateResults}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
