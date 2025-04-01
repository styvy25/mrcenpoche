
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import QuizResult from './QuizResult';
import { Award, Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { BadgeProps } from './types';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  timeSpent?: number;
  correctAnswers?: number;
  earnedBadges?: BadgeProps[];
  questions?: any[];
  selectedAnswers?: number[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  timeSpent = 0,
  correctAnswers = 0,
  earnedBadges = [],
  questions = [],
  selectedAnswers = []
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="mx-auto max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <QuizResult 
        score={score}
        totalQuestions={totalQuestions}
        categoryName={categoryName}
        onRestart={onRestart}
        unlockedBadges={earnedBadges}
        timeSpent={timeSpent}
        correctAnswers={correctAnswers}
        questions={questions}
        selectedAnswers={selectedAnswers}
      />
    </motion.div>
  );
};

export default ResultsScreen;
