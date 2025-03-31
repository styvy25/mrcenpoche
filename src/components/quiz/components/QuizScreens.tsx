
import React from "react";
import QuizQuestion from "./QuizQuestion";
import AnswerFeedback from "./AnswerFeedback";
import QuizCompleted from "./QuizCompleted";
import { QuizState } from "../types";

interface QuizScreensProps {
  quiz: any;
  quizState: QuizState;
  onAnswer: (answer: string) => void;
  onContinue: () => void;
  onRestart: () => void;
  onBack: () => void;
}

const QuizScreens: React.FC<QuizScreensProps> = ({
  quiz,
  quizState,
  onAnswer,
  onContinue,
  onRestart,
  onBack
}) => {
  const { currentQuestion, showFeedback, isCorrect, quizCompleted } = quizState;

  if (quizCompleted) {
    return (
      <QuizCompleted
        score={quizState.score}
        totalQuestions={quiz.questions.length}
        onBack={onBack}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">{quiz.title}</h2>
        <p className="text-gray-600 text-sm">Question {currentQuestion + 1} sur {quiz.questions.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 mb-4">
        {showFeedback ? (
          <AnswerFeedback 
            isCorrect={isCorrect}
            explanation={quiz.questions[currentQuestion].explanation || ""}
            onContinue={onContinue}
          />
        ) : (
          <QuizQuestion
            question={quiz.questions[currentQuestion].question}
            options={quiz.questions[currentQuestion].options}
            onAnswer={onAnswer}
            currentQuestionIndex={currentQuestion}
            totalQuestions={quiz.questions.length}
          />
        )}
      </div>

      <button 
        className="text-primary hover:underline text-sm"
        onClick={onBack}
      >
        Quitter le quiz
      </button>
    </div>
  );
};

export default QuizScreens;
