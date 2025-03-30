
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ 
  isCorrect, 
  explanation, 
  onContinue 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
    >
      <div className="flex items-center mb-2">
        {isCorrect ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
        ) : (
          <X className="h-5 w-5 text-red-500 mr-2" />
        )}
        <h4 className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
          {isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
        </h4>
      </div>
      <p className="text-gray-600 mb-3">{explanation}</p>
      <Button onClick={onContinue} size="sm" variant="outline">
        Continuer
      </Button>
    </motion.div>
  );
};

export default AnswerFeedback;
