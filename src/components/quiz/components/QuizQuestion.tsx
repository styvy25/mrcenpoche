
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  options, 
  onAnswer,
  currentQuestionIndex,
  totalQuestions 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{question}</h3>
        <Badge variant="outline" className="ml-2">
          {currentQuestionIndex + 1}/{totalQuestions}
        </Badge>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(index.toString())}
            variant="outline"
            className="w-full text-left justify-start h-auto py-3 px-4 hover:bg-muted"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
