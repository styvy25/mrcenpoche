
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Award } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  iconType: string;
  gradient?: string;
  date: string;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  isPassed: boolean;
  onRestart: () => void;
  earnedBadges: Badge[];
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions, 
  isPassed, 
  onRestart, 
  earnedBadges 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
          {isPassed ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <AlertCircle className="w-16 h-16 text-amber-500" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          {isPassed ? 'Félicitations!' : 'Essayez encore!'}
        </h2>
        
        <p className="text-gray-400 mb-4">
          {isPassed
            ? 'Vous avez réussi le quiz.'
            : `Vous avez besoin de plus de points pour réussir.`}
        </p>
        
        <div className="flex justify-center items-center gap-2 mb-2">
          <span className="text-3xl font-bold">
            {Math.round((score / 100) * totalQuestions)}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{totalQuestions}</span>
          <span className="ml-2 text-2xl font-bold">
            {score}%
          </span>
        </div>
      </div>
      
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-center text-lg font-semibold mb-4">Badges obtenus</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-b from-gray-700 to-gray-800 p-4 rounded-lg border border-gray-700 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                
                <h4 className="font-semibold">{badge.name}</h4>
                <p className="text-sm text-gray-400">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <Button onClick={onRestart}>
          Recommencer le quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
