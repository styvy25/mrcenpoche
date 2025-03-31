
import React from "react";
import { QuizQuestion } from "../types";
import QuestionDetail from "./QuestionDetail";

interface QuestionsDetailSectionProps {
  questions: QuizQuestion[];
  selectedAnswers: (number | undefined)[];
}

const QuestionsDetailSection: React.FC<QuestionsDetailSectionProps> = ({ 
  questions, 
  selectedAnswers 
}) => {
  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-semibold mb-4">Détails des questions</h3>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionDetail 
            key={question.id || index}
            question={question}
            index={index}
            selectedAnswer={selectedAnswers[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsDetailSection;
