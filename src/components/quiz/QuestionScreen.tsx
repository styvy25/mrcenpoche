
import React from "react";
import { Button } from "@/components/ui/button";
import QuizQuestionComponent from "./QuizQuestion";
import { QuizQuestion } from "./types";

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
  return (
    <div className="flex flex-col items-center">
      <QuizQuestionComponent
        question={currentQuestion}
        onAnswer={onAnswer}
        selectedAnswer={selectedAnswer}
      />
      <div className="mt-6">
        {!isLastQuestion ? (
          <Button onClick={onNextQuestion} disabled={selectedAnswer === undefined}>
            Question Suivante
          </Button>
        ) : (
          <Button onClick={onCalculateResults} disabled={selectedAnswer === undefined}>
            Voir les résultats
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
