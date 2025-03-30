
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizCompletedProps {
  score: number;
  totalQuestions: number;
  onBack: () => void;
  onRestart: () => void;
}

const QuizCompleted: React.FC<QuizCompletedProps> = ({ 
  score,
  totalQuestions,
  onBack,
  onRestart
}) => {
  return (
    <div className="p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-4">
          <Award className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
        <p className="text-gray-600 mb-4">
          Votre score : {score} sur {totalQuestions}
        </p>
      </motion.div>
      
      <div className="space-x-4">
        <Button onClick={onBack} variant="outline">
          Retour aux modules
        </Button>
        <Button onClick={onRestart}>
          Recommencer
        </Button>
      </div>
    </div>
  );
};

export default QuizCompleted;
