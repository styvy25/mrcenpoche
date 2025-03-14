
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

export interface QuizQuestionProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  };
  onAnswerSelected: (selectedAnswer: string) => void;
  disabled?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswerSelected,
  disabled = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleOptionClick = (option: string) => {
    if (disabled) return;
    
    setSelectedOption(option);
    setShowFeedback(true);
    
    // Call parent handler
    onAnswerSelected(option);
  };
  
  const isCorrectAnswer = (option: string) => {
    return showFeedback && option === question.correctAnswer;
  };
  
  const isWrongAnswer = (option: string) => {
    return showFeedback && selectedOption === option && option !== question.correctAnswer;
  };
  
  const getOptionClasses = (option: string) => {
    let classes = "w-full text-left justify-start p-4 mb-3 transition-all border-2";
    
    if (isCorrectAnswer(option)) {
      classes += " bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-300";
    } else if (isWrongAnswer(option)) {
      classes += " bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-300";
    } else if (selectedOption === option) {
      classes += " bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
    } else {
      classes += " bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600";
    }
    
    return classes;
  };
  
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={getOptionClasses(option)}
            onClick={() => handleOptionClick(option)}
            disabled={disabled || showFeedback}
          >
            {isCorrectAnswer(option) && (
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            )}
            {isWrongAnswer(option) && (
              <XCircle className="h-5 w-5 mr-2 text-red-500" />
            )}
            {option}
          </Button>
        ))}
      </div>
      
      {showFeedback && question.explanation && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
