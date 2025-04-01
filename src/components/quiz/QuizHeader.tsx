
import React from 'react';
import { Award } from 'lucide-react';

interface QuizHeaderProps {
  categoryName: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  isTestCategory: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  categoryName, 
  currentQuestionIndex, 
  totalQuestions, 
  isTestCategory 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-medium text-gray-700">
        {categoryName}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          Question {currentQuestionIndex + 1}/{totalQuestions}
        </span>
        {isTestCategory && (
          <span className="flex items-center gap-1 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            <Award size={14} />
            Test
          </span>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
