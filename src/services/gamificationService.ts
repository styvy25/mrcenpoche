
import { QuizResult } from '@/components/quiz/types';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export enum PointsActionType {
  QUIZ_COMPLETION = 'quiz_completion',
  CHALLENGE_COMPLETION = 'challenge_completion',
  DAILY_LOGIN = 'daily_login',
  ARTICLE_READ = 'article_read',
  PROFILE_COMPLETE = 'profile_complete',
  COMMENT_POSTED = 'comment_posted',
  SOCIAL_SHARE = 'social_share'
}

interface GamificationState {
  points: number;
  level: number;
  badges: string[];
  streakDays: number;
  lastActivity: Date | null;
}

const POINTS_VALUES = {
  [PointsActionType.QUIZ_COMPLETION]: 10,
  [PointsActionType.CHALLENGE_COMPLETION]: 25,
  [PointsActionType.DAILY_LOGIN]: 5,
  [PointsActionType.ARTICLE_READ]: 3,
  [PointsActionType.PROFILE_COMPLETE]: 20,
  [PointsActionType.COMMENT_POSTED]: 2,
  [PointsActionType.SOCIAL_SHARE]: 5
};

export const useGamification = (userId: string) => {
  const { toast } = useToast();
  const [state, setState] = useState<GamificationState>({
    points: 0,
    level: 1,
    badges: [],
    streakDays: 0,
    lastActivity: null
  });

  const addPoints = (actionType: PointsActionType, multiplier = 1) => {
    if (!userId) return;
    
    const pointsToAdd = POINTS_VALUES[actionType] * multiplier;
    
    setState(prev => {
      const newPoints = prev.points + pointsToAdd;
      const newLevel = Math.floor(newPoints / 100) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        toast({
          title: "Niveau supérieur !",
          description: `Vous avez atteint le niveau ${newLevel}`,
        });
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        lastActivity: new Date()
      };
    });
  };

  const handleQuizCompletion = (quizResult: QuizResult) => {
    const score = quizResult.correctAnswers / quizResult.totalQuestions;
    let multiplier = 1;
    
    // Better scores get better rewards
    if (score >= 0.8) multiplier = 2;
    if (score >= 0.95) multiplier = 3;
    
    addPoints(PointsActionType.QUIZ_COMPLETION, multiplier);
    
    // Show toasts for badges
    if (quizResult.unlockedBadges && quizResult.unlockedBadges.length > 0) {
      quizResult.unlockedBadges.forEach(badge => {
        toast({
          title: "Nouveau badge !",
          description: `Vous avez débloqué: ${badge.name}`,
        });
        
        // Add badge to state
        setState(prev => ({
          ...prev,
          badges: [...prev.badges, badge.id]
        }));
      });
    }
  };

  return {
    ...state,
    addPoints,
    handleQuizCompletion
  };
};
