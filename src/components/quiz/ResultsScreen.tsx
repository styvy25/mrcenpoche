
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
        earnedBadges={earnedBadges}
      />
      
      {earnedBadges && earnedBadges.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold mb-4">Badges débloqués</h3>
          <QuizBadgesDisplay badges={earnedBadges} />
        </div>
      )}

      <div className="mt-8 w-full">
        <h3 className="text-xl font-semibold mb-4">Détails des questions</h3>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id || index} className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-medium mb-2">Question {index + 1}</h4>
              <p className="mb-4">{question.question}</p>
              
              <div className="space-y-2">
                {question.options.map((option, optIndex) => {
                  const isSelected = selectedAnswers[index] === optIndex;
                  const isCorrect = 
                    typeof question.correctAnswer === 'number' 
                      ? optIndex === question.correctAnswer 
                      : optIndex === parseInt(question.correctAnswer as string, 10);
                  
                  return (
                    <div 
                      key={optIndex} 
                      className={`p-2 rounded-md ${
                        isSelected
                          ? isCorrect
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : isCorrect
                            ? 'bg-green-50 border border-green-300'
                            : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {option}
                      {isSelected && !isCorrect && (
                        <div className="mt-1 text-sm text-red-600">
                          Votre réponse
                        </div>
                      )}
                      {isCorrect && (
                        <div className="mt-1 text-sm text-green-600">
                          Réponse correcte
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {question.explanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Explication:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
