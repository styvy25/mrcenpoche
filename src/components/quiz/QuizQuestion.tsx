
import { QuizQuestion as QuestionType } from "./types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: QuestionType;
  onAnswer: (index: number) => void;
  selectedAnswer?: number;
  showFeedback?: boolean;
}

const QuizQuestion = ({
  question,
  onAnswer,
  selectedAnswer,
  showFeedback = false
}: QuizQuestionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 gradient-text">{question.question}</h3>
      
      {question.imageSrc && (
        <div className="mb-4">
          <img
            src={question.imageSrc}
            alt={`Illustration pour ${question.question}`}
            className="rounded-lg max-h-48 mx-auto object-contain shadow-lg transition-all duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;
          const isIncorrect = isSelected && !isCorrect;
          
          return (
            <div
              key={index}
              onClick={() => selectedAnswer === undefined && onAnswer(index)}
              className={cn(
                "p-3 border rounded-lg cursor-pointer transition-all quiz-option flex justify-between items-center",
                isSelected && "border-2",
                isSelected && isCorrect && showFeedback && "border-green-500 bg-green-50",
                isIncorrect && showFeedback && "border-red-500 bg-red-50",
                isSelected && !showFeedback && "border-mrc-blue bg-blue-50",
                !isSelected && "hover:bg-gray-50 hover:border-gray-300 border-gray-200"
              )}
            >
              <span className="mr-2">{option}</span>
              {showFeedback && isSelected && (
                <>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-bounce" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {showFeedback && question.explanation && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg animate-float">
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
