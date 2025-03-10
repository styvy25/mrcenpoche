
import { QuizQuestion as QuestionType } from "./types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: QuestionType;
  onAnswer: (index: number) => void;
}

const QuizQuestion = ({
  question,
  onAnswer
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
            onClick={() => onAnswer(index)}
            className={cn(
              "p-3 border rounded-lg cursor-pointer transition-all flex justify-between items-center",
              "hover:bg-gray-50 hover:border-gray-300 border-gray-200"
            )}
          >
            <span className="mr-2">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
