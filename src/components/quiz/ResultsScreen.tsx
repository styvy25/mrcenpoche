
import React from "react";
import QuizResult from "./QuizResult";
import QuizQuestion from "./QuestionScreen";
import QuizBadgesDisplay from "./QuizBadgesDisplay";
import { BadgeProps, QuizQuestion as QuizQuestionType } from "./types";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  selectedAnswers: (string | undefined)[];
  questions: QuizQuestionType[];
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
          unlockedBadges: earnedBadges,
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
            <h4 className="text-lg font-medium mb-2">{question.question}</h4>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex}
                  className={`p-3 border rounded-lg ${
                    optionIndex.toString() === question.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : selectedAnswers[index] === optionIndex.toString() && optionIndex.toString() !== question.correctAnswer
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;
