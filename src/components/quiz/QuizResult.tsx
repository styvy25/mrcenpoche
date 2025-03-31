
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSubscription } from "@/hooks/useSubscription";
import { Trophy, Medal, Star, BarChart, Share, Repeat, Award, ArrowRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import confetti from 'canvas-confetti';
import { usePoints } from '@/hooks/usePoints';
import PremiumUpsell from '@/components/premium/PremiumUpsell';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoBack: () => void;
  categoryName: string;
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onGoBack,
  categoryName
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { isPremium } = useSubscription();
  const { addPoints } = usePoints();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    // Add points based on quiz performance
    const earnedPoints = Math.round(score * 5 * (isPremium ? 2 : 1));
    if (earnedPoints > 0) {
      addPoints(earnedPoints);
    }
  }, [score, isPremium, addPoints]);
  
  useEffect(() => {
    // Show confetti for good results
    if (percentage >= 70) {
      setShowConfetti(true);
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const runConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#22c55e', '#f59e0b']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#22c55e', '#f59e0b']
        });

        if (Date.now() < end) {
          requestAnimationFrame(runConfetti);
        }
      };
      
      runConfetti();
    }
  }, [percentage]);

  const getResultMessage = () => {
    if (percentage >= 90) return `Excellent ! Vous êtes un expert en ${categoryName}`;
    if (percentage >= 70) return `Bravo ! Votre connaissance en ${categoryName} est impressionnante`;
    if (percentage >= 50) return `Pas mal ! Continuez à apprendre sur ${categoryName}`;
    return `Continuez d'apprendre sur ${categoryName}. Vous progressez !`;
  };

  const getResultIcon = () => {
    if (percentage >= 90) return <Trophy className="h-10 w-10 text-yellow-500" />;
    if (percentage >= 70) return <Medal className="h-10 w-10 text-blue-500" />;
    if (percentage >= 50) return <Star className="h-10 w-10 text-purple-500" />;
    return <Award className="h-10 w-10 text-gray-500" />;
  };

  // Points earned calculation
  const pointsEarned = Math.round(score * 5 * (isPremium ? 2 : 1));
  const bonusPoints = isPremium ? Math.round(score * 5) : 0;

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2 
            }}
            className="flex justify-center mb-4"
          >
            {getResultIcon()}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold mb-2"
          >
            {getResultMessage()}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-mrc-blue mb-4"
          >
            {score}/{totalQuestions}
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-500 mb-1 flex justify-between">
              <span>Progression</span>
              <span>{percentage}%</span>
            </p>
            <Progress value={percentage} className="h-3" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-lg p-4 mb-6"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-700 dark:text-blue-400 font-medium">Points gagnés:</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{pointsEarned}</span>
            </div>
            
            {isPremium ? (
              <div className="text-xs text-blue-600 dark:text-blue-500 flex justify-between">
                <span>Inclus bonus premium (+{bonusPoints})</span>
                <Star className="h-3 w-3" />
              </div>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Les membres premium gagnent 2x plus de points !
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            <Button 
              variant="outline" 
              onClick={onRestart}
              className="flex items-center gap-2"
            >
              <Repeat className="h-4 w-4" />
              Réessayer
            </Button>
            <Button 
              onClick={onGoBack}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Continuer
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-2 text-sm text-gray-500 justify-center"
          >
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Share className="h-4 w-4" />
              Partager
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <BarChart className="h-4 w-4" />
              Statistiques
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6"
        >
          <PremiumUpsell
            title="Doublez vos points avec Premium"
            description="Les membres premium gagnent deux fois plus de points et débloquent des quiz exclusifs"
            feature="Débloquez plus de 500 questions avancées"
            buttonText="Passer à Premium"
          />
        </motion.div>
      )}
    </div>
  );
};

export default QuizResult;
