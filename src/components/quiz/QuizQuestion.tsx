
import React from "react";
import { QuizQuestion } from "./types";

interface QuizQuestionComponentProps {
  question: QuizQuestion;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer?: number;
  showFeedback?: boolean;
  currentQuestionIndex?: number;
  totalQuestions?: number;
}

const QuizQuestionComponent: React.FC<QuizQuestionComponentProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  showFeedback = false,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div className="space-y-6">
      {(currentQuestionIndex !== undefined && totalQuestions !== undefined) && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} sur {totalQuestions}
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = showFeedback && (
            typeof question.correctAnswer === 'number' 
              ? index === question.correctAnswer
              : index === parseInt(question.correctAnswer as string, 10)
          );
          
          return (
            <div
              key={index}
              onClick={() => selectedAnswer === undefined && onAnswer(index)}
              className={`p-4 border rounded-lg transition-all ${
                isSelected
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "hover:bg-gray-50 hover:border-gray-300 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>{option}</span>
                </div>
                {isSelected && (
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ml-2 ${
                    isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestionComponent;
