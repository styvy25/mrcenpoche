
import React from "react";
import { Award } from "lucide-react";
import QuestionScreen from "../QuestionScreen";
import { QuizQuestion } from "../types";

interface QuizInProgressProps {
  currentCategory: {
    name: string;
    questions: QuizQuestion[];
  };
  isTestCategory: boolean;
  currentQuestionIndex: number;
  selectedAnswers: (number | undefined)[];
  onAnswer: (answerIndex: number) => void;
  onNextQuestion: () => void;
  onCalculateResults: () => void;
  isMobile: boolean;
}

const QuizInProgress: React.FC<QuizInProgressProps> = ({
  currentCategory,
  isTestCategory,
  currentQuestionIndex,
  selectedAnswers,
  onAnswer,
  onNextQuestion,
  onCalculateResults,
  isMobile,
}) => {
  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">
          {currentCategory.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Question {currentQuestionIndex + 1}/{currentCategory.questions.length}
          </span>
          {isTestCategory && (
            <span className="flex items-center gap-1 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              <Award size={14} />
              Test
            </span>
          )}
        </div>
      </div>

      <QuestionScreen
        currentQuestion={currentQuestion}
        onAnswer={onAnswer}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        isLastQuestion={isLastQuestion}
        onNextQuestion={onNextQuestion}
        onCalculateResults={onCalculateResults}
      />
    </div>
  );
};

export default QuizInProgress;
