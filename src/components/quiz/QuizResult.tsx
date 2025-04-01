
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Award, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { usePoints } from '@/hooks/usePoints';
import { motion } from 'framer-motion';

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface QuizResultProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  unlockedBadges?: BadgeProps[];
  timeSpent?: number;
  correctAnswers?: number;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  unlockedBadges = [],
  timeSpent = 0,
  correctAnswers = 0,
}) => {
  const { toast } = useToast();
  const { isPremium } = useSubscription();
  const confettiRef = useRef<HTMLDivElement>(null);
  const { addPoints } = usePoints();
  
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;
  
  useEffect(() => {
    // Add points based on quiz performance
    const calculatePoints = async () => {
      // Base points for quiz completion
      let pointsToAdd = 5;
      
      // Additional points for good performance
      if (percentage >= 90) pointsToAdd += 15;
      else if (percentage >= 70) pointsToAdd += 10;
      else if (percentage >= 50) pointsToAdd += 5;
      
      // Bonus for unlocked badges
      pointsToAdd += unlockedBadges.length * 3;
      
      await addPoints(pointsToAdd);
      
      toast({
        title: "Points gagnés!",
        description: `Vous avez gagné ${pointsToAdd} points pour ce quiz!`,
        duration: 5000,
      });
    };
    
    calculatePoints();
  }, [addPoints, percentage, unlockedBadges.length, toast]);
  
  useEffect(() => {
    if (confettiRef.current && isPassing) {
      const canvas = confetti.create(confettiRef.current, {
        resize: true,
        useWorker: true,
      });
      
      canvas({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPassing]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleShare = () => {
    const shareText = `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au quiz de ${categoryName} sur Styvy237!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Résultat de quiz Styvy237',
        text: shareText,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Texte copié",
          description: "Vous pouvez maintenant partager votre résultat!",
        });
      });
    }
  };
  
  return (
    <div className="relative">
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">
          {isPassing ? "Félicitations!" : "Continuez vos efforts!"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Vous avez terminé le quiz de <span className="font-medium">{categoryName}</span>
        </p>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
            <p className="text-3xl font-bold text-primary">
              {score}/{totalQuestions}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pourcentage</p>
            <p className="text-3xl font-bold" style={{ color: isPassing ? '#10b981' : '#ef4444' }}>
              {percentage}%
            </p>
          </div>
          
          {isPremium && (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Temps</p>
                <p className="text-lg font-medium">{formatTime(timeSpent)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Réponses correctes</p>
                <p className="text-lg font-medium">{correctAnswers}/{totalQuestions}</p>
              </div>
            </>
          )}
        </div>
        
        {unlockedBadges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
              Badges débloqués:
            </h3>
            <div className="flex flex-wrap gap-2">
              {unlockedBadges.map((badge) => (
                <Badge key={badge.id} variant="outline" className="px-3 py-1">
                  <Award className="h-4 w-4 mr-1" /> {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Débloquez toutes les fonctionnalités</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Passez à Premium pour accéder aux statistiques détaillées, 
                    suivi de progression et bien plus!
                  </p>
                  <Button size="sm" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                    Découvrir Premium
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onRestart} variant="outline" className="flex-1">
          Recommencer
        </Button>
        <Button onClick={handleShare} className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
