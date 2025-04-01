
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import QuizResult, { BadgeProps } from './QuizResult';
import { Award, Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  timeSpent: number;
  correctAnswers: number;
  unlockedBadges?: BadgeProps[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  timeSpent,
  correctAnswers,
  unlockedBadges = []
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
        unlockedBadges={unlockedBadges}
        timeSpent={timeSpent}
        correctAnswers={correctAnswers}
      />
    </motion.div>
  );
};

export default ResultsScreen;
