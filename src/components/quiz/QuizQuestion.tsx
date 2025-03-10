
import { QuizQuestion as QuestionType } from "./types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: QuestionType;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (index: number) => void;
}

const QuizQuestion = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelectAnswer
}: QuizQuestionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      
      {question.imageSrc && (
        <div className="mb-4">
          <img
            src={question.imageSrc}
            alt={`Illustration pour ${question.question}`}
            className="rounded-lg max-h-48 mx-auto object-contain"
          />
        </div>
      )}
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => !isAnswerSubmitted && onSelectAnswer(index)}
            className={cn(
              "p-3 border rounded-lg cursor-pointer transition-all flex justify-between items-center",
              selectedAnswer === index ? "border-2" : "border",
              isAnswerSubmitted
                ? index === question.correctAnswer
                  ? "bg-green-50 border-green-500"
                  : selectedAnswer === index
                  ? "bg-red-50 border-red-500"
                  : "opacity-60"
                : "hover:bg-gray-50 hover:border-gray-300",
              selectedAnswer === index && !isAnswerSubmitted
                ? "border-mrc-blue"
                : "border-gray-200"
            )}
          >
            <span className="mr-2">{option}</span>
            {isAnswerSubmitted && (
              <>
                {index === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : selectedAnswer === index ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
      
      {isAnswerSubmitted && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="font-medium text-blue-700">Explication:</p>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
