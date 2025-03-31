
import React from "react";
import QuizResult from "./QuizResult";
import BadgesSection from "./components/BadgesSection";
import QuestionsDetailSection from "./components/QuestionsDetailSection";
import { BadgeProps, QuizQuestion } from "./types";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  selectedAnswers: (number | undefined)[];
  questions: QuizQuestion[];
  onRestart: () => void;
  earnedBadges: BadgeProps[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  categoryName,
  selectedAnswers,
  questions,
  onRestart,
  earnedBadges,
}) => {
  return (
    <div className="flex flex-col items-center">
      <QuizResult 
        score={score}
        totalQuestions={totalQuestions}
        categoryName={categoryName}
        onRestart={onRestart}
        earnedBadges={earnedBadges}
      />
      
      <BadgesSection earnedBadges={earnedBadges} />

      <QuestionsDetailSection 
        questions={questions}
        selectedAnswers={selectedAnswers}
      />
    </div>
  );
};

export default ResultsScreen;
