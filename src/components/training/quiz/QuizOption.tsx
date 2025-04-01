
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizOptionProps {
  option: { id: string, text: string };
  isSelected: boolean;
  isCorrectOption: boolean;
  showExplanation: boolean;
  onSelect: (optionId: string) => void;
  disabled: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({ 
  option, 
  isSelected, 
  isCorrectOption, 
  showExplanation, 
  onSelect, 
  disabled 
}) => {
  let optionClass = "border-gray-700 hover:border-gray-600";
  
  if (showExplanation) {
    if (isCorrectOption) {
      optionClass = "border-green-500 bg-green-500/10";
    } else if (isSelected && !isCorrectOption) {
      optionClass = "border-red-500 bg-red-500/10";
    }
  } else if (isSelected) {
    optionClass = "border-blue-500";
  }
  
  return (
    <div
      onClick={() => !disabled && onSelect(option.id)}
      className={`cursor-pointer p-4 border rounded-lg transition-all ${optionClass} ${
        !showExplanation && !disabled ? 'hover:bg-gray-700' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{option.text}</span>
        
        {showExplanation && isCorrectOption && (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
        
        {showExplanation && isSelected && !isCorrectOption && (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
    </div>
  );
};

export default QuizOption;
