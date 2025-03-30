
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  selectedAnswer?: string;
  disabled?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  options, 
  onAnswer,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      {/* Question header with progress indicator */}
      {currentQuestionIndex !== undefined && totalQuestions !== undefined && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{question}</h3>
          <Badge variant="outline" className="ml-2">
            {currentQuestionIndex + 1}/{totalQuestions}
          </Badge>
        </div>
      )}
      
      {/* Just show the question if no progress indicator is needed */}
      {(currentQuestionIndex === undefined || totalQuestions === undefined) && (
        <h3 className="text-lg font-semibold mb-4">{question}</h3>
      )}

      {/* Options list */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index.toString();
          
          return (
            <Button
              key={index}
              onClick={() => !disabled && onAnswer(index.toString())}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "w-full text-left justify-start h-auto py-3 px-4",
                isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                disabled && !isSelected && "opacity-70 cursor-not-allowed",
                disabled && isSelected && "opacity-100"
              )}
              disabled={disabled && !isSelected}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
