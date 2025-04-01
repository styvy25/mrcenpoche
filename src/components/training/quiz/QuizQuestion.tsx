
import React from 'react';
import { Button } from '@/components/ui/button';
import QuizOption from './QuizOption';
import QuizExplanation from './QuizExplanation';

interface Question {
  id: string;
  text: string;
  options: { id: string, text: string }[];
  correctOptionId: string;
  explanation: string;
}

interface QuizQuestionProps {
  question: Question;
  selectedOptionId: string | undefined;
  showExplanation: boolean;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  selectedOptionId, 
  showExplanation,
  onSelectOption, 
  onNext, 
  isLastQuestion 
}) => {
  const isCorrect = selectedOptionId === question.correctOptionId;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            isCorrectOption={option.id === question.correctOptionId}
            showExplanation={showExplanation}
            onSelect={onSelectOption}
            disabled={showExplanation}
          />
        ))}
      </div>
      
      {showExplanation && (
        <QuizExplanation isCorrect={isCorrect} explanation={question.explanation} />
      )}
      
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`${
            isLastQuestion ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
        >
          {isLastQuestion ? 'Terminer le quiz' : 'Question suivante'}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
