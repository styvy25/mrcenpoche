
import React from 'react';

interface QuizHeaderProps {
  title: string;
  description: string;
  currentIndex: number;
  totalQuestions: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  title, 
  description, 
  currentIndex, 
  totalQuestions 
}) => {
  return (
    <div className="p-4 bg-gray-900 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm">
          Question {currentIndex + 1} / {totalQuestions}
        </div>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default QuizHeader;
