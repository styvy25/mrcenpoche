
import React from "react";
import QuizResult from "./QuizResult";
import QuizQuestionComponent from "./QuizQuestion";
import QuizBadgesDisplay from "./QuizBadgesDisplay";
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
        result={{
          score: (score / totalQuestions) * 100,
          correctAnswers: score,
          totalQuestions: totalQuestions,
          timeSpent: 0,
          unlockedBadges: [],
          date: new Date()
        }}
      />
      
      {earnedBadges.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-4 text-mrc-blue">Badges débloqués</h3>
          <QuizBadgesDisplay badges={earnedBadges} />
        </div>
      )}
      
      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4 text-mrc-blue">Revue des questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
            <QuizQuestionComponent
              question={question}
              onAnswer={() => {}}
              selectedAnswer={selectedAnswers[index]}
              showFeedback={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;
