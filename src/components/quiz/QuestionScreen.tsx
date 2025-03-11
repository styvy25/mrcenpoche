
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
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [animateButton, setAnimateButton] = useState(false);
  
  // Animate button when answer is selected
  useEffect(() => {
    if (selectedAnswer !== undefined) {
      setAnimateButton(true);
    }
  }, [selectedAnswer]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`w-full transition-all duration-300 ${isSmallScreen ? 'p-0' : 'p-2'}`}>
        <QuizQuestionComponent
          question={currentQuestion}
          onAnswer={onAnswer}
          selectedAnswer={selectedAnswer}
        />
      </div>
      
      {selectedAnswer !== undefined && (
        <div className={`mt-6 transition-all duration-300 transform ${animateButton ? 'scale-in' : 'opacity-0 scale-95'}`}>
          {!isLastQuestion ? (
            <Button 
              onClick={onNextQuestion} 
              className="bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center gap-2 px-6"
              size={isSmallScreen ? "default" : "lg"}
            >
              <span>Question Suivante</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={onCalculateResults}
              className="bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2 px-6"
              size={isSmallScreen ? "default" : "lg"}
            >
              <span>Voir les résultats</span>
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
