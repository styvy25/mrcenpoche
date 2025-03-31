
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuizQuestionComponent from "./QuizQuestion";
import { QuizQuestion } from "./types";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface QuestionScreenProps {
  currentQuestion: QuizQuestion;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer?: number;
  isLastQuestion: boolean;
  onNextQuestion: () => void;
  onCalculateResults: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestion,
  onAnswer,
  selectedAnswer,
  isLastQuestion,
  onNextQuestion,
  onCalculateResults,
}) => {
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  const [animateButton, setAnimateButton] = useState(false);
  
  // Animate button when answer is selected
  useEffect(() => {
    if (selectedAnswer !== undefined) {
      setAnimateButton(true);
    }
  }, [selectedAnswer]);

  // Check if currentQuestion is valid
  if (!currentQuestion) {
    return (
      <div className="p-3 sm:p-4 text-center">
        <p className="text-sm sm:text-base">Aucune question disponible</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      <div className={`w-full transition-all duration-300 ${isMobile ? 'px-2' : 'p-4'}`}>
        <QuizQuestionComponent
          question={currentQuestion}
          onAnswer={onAnswer}
          selectedAnswer={selectedAnswer}
        />
      </div>
      
      {selectedAnswer !== undefined && (
        <div className={`mt-3 sm:mt-6 transition-all duration-300 transform ${animateButton ? 'scale-in' : 'opacity-0 scale-95'}`}>
          {!isLastQuestion ? (
            <Button 
              onClick={onNextQuestion} 
              className="bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm"
              size={isMobile ? "sm" : "default"}
            >
              <span>Question Suivante</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          ) : (
            <Button 
              onClick={onCalculateResults}
              className="bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm"
              size={isMobile ? "sm" : "default"}
            >
              <span>Voir les résultats</span>
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
