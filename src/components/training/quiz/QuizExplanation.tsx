
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface QuizExplanationProps {
  isCorrect: boolean;
  explanation: string;
}

const QuizExplanation: React.FC<QuizExplanationProps> = ({ isCorrect, explanation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-gray-700 p-4 rounded-lg mb-6"
    >
      <div className="flex items-start gap-2">
        <div className="mt-0.5">
          {isCorrect ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <div>
          <p className="font-medium mb-1">
            {isCorrect ? 'Bonne réponse!' : 'Pas tout à fait...'}
          </p>
          <p className="text-sm text-gray-300">
            {explanation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizExplanation;
