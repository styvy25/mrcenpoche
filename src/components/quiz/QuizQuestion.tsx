
import { QuizQuestion as QuestionType } from "./types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

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
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [showImage, setShowImage] = useState(false);
  const [animateQuestion, setAnimateQuestion] = useState(false);
  
  // Get the display question text (handle both text and question properties)
  const displayQuestion = question.text || question.question || "";
  
  useEffect(() => {
    // Animate the question when it first loads
    setAnimateQuestion(true);
    
    // Show image with a delay for a nice animation
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [question.id]);

  return (
    <div className={`space-y-4 transition-all duration-300 ${animateQuestion ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="flex items-start gap-2">
        <HelpCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
        <h3 className={`${isSmallScreen ? 'text-lg' : 'text-xl'} font-semibold mb-4 text-gray-800`}>
          {displayQuestion}
        </h3>
      </div>
      
      {question.imageSrc && showImage && (
        <div className="mb-4 transition-all duration-500 transform animate-scale-in">
          <img
            src={question.imageSrc}
            alt={`Illustration pour ${displayQuestion}`}
            className="rounded-lg w-full max-h-48 mx-auto object-cover shadow-lg border border-gray-200 hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="space-y-2.5">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const correctAnswer = typeof question.correctAnswer === 'string' ? 
            parseInt(question.correctAnswer) : question.correctAnswer;
          const isCorrect = correctAnswer === index;
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
                !isSelected && "hover:bg-gray-50 hover:border-gray-300 border-gray-200",
                "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              )}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0",
                  isSelected 
                    ? isCorrect && showFeedback
                      ? "bg-green-100 text-green-700"
                      : isIncorrect && showFeedback
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={`${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                  {typeof option === 'string' ? option : option.text}
                </span>
              </div>
              
              {showFeedback && isSelected && (
                <>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
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
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
          <p className={`${isSmallScreen ? 'text-sm' : 'text-base'} text-gray-700`}>
            {question.explanation}
          </p>
        </div>
      )}
      
      {question.difficulty && (
        <div className="mt-2 flex justify-end">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            question.difficulty === "facile" ? "bg-green-100 text-green-800" :
            question.difficulty === "moyen" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          )}>
            {question.difficulty}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
