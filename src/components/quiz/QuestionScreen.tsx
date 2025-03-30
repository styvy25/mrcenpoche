
import React, { useState } from "react";
import { QuizQuestion } from "./types";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface QuestionScreenProps {
  currentQuestion: QuizQuestion;
  onAnswer: (answerIndex: string) => void;
  selectedAnswer?: string;
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
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<string | undefined>(selectedAnswer);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (answerIndex: string) => {
    if (localSelectedAnswer !== undefined) return; // Prevent changing answer
    
    setLocalSelectedAnswer(answerIndex);
    setShowFeedback(true);
    onAnswer(answerIndex);
  };

  const handleNextClick = () => {
    if (isLastQuestion) {
      onCalculateResults();
    } else {
      onNextQuestion();
      setLocalSelectedAnswer(undefined);
      setShowFeedback(false);
    }
  };

  const isCorrect = localSelectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: localSelectedAnswer === undefined ? 1.02 : 1 }}
            whileTap={{ scale: localSelectedAnswer === undefined ? 0.98 : 1 }}
            onClick={() => handleOptionClick(index.toString())}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              localSelectedAnswer === index.toString()
                ? index.toString() === currentQuestion.correctAnswer
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "hover:border-blue-300 hover:shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {localSelectedAnswer === index.toString() && (
                <>
                  {index.toString() === currentQuestion.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          <h3 className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Bonne réponse !" : "Réponse incorrecte"}
          </h3>
          <p className="text-gray-600 mt-1">{currentQuestion.explanation}</p>
        </motion.div>
      )}

      {localSelectedAnswer !== undefined && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleNextClick} className="bg-mrc-blue">
            {isLastQuestion ? "Voir les résultats" : "Question suivante"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
