
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useAuth } from '@/components/auth/AuthDialog';

export type PointsAction = 
  | 'quiz_completed'
  | 'challenge_completed'
  | 'daily_login'
  | 'forum_post'
  | 'invite_friend'
  | 'profile_completed'
  | 'feedback_given'
  | 'video_watched';

interface PointsReward {
  action: PointsAction;
  points: number;
  message: string;
}

const POINTS_REWARDS: Record<PointsAction, PointsReward> = {
  quiz_completed: {
    action: 'quiz_completed',
    points: 10,
    message: 'Quiz terminé'
  },
  challenge_completed: {
    action: 'challenge_completed',
    points: 25,
    message: 'Challenge relevé'
  },
  daily_login: {
    action: 'daily_login',
    points: 5,
    message: 'Connexion quotidienne'
  },
  forum_post: {
    action: 'forum_post',
    points: 3,
    message: 'Message posté'
  },
  invite_friend: {
    action: 'invite_friend',
    points: 20,
    message: 'Ami invité'
  },
  profile_completed: {
    action: 'profile_completed',
    points: 15,
    message: 'Profil complété'
  },
  feedback_given: {
    action: 'feedback_given',
    points: 5,
    message: 'Feedback donné'
  },
  video_watched: {
    action: 'video_watched',
    points: 8,
    message: 'Vidéo visionnée'
  }
};

export function usePoints() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [recentActivity, setRecentActivity] = useState<PointsReward[]>([]);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Load points from localStorage instead of backend for now
      const savedPoints = localStorage.getItem('user_points');
      if (savedPoints) {
        setPoints(parseInt(savedPoints, 10));
      }
      
      const savedLevel = localStorage.getItem('user_level');
      if (savedLevel) {
        setLevel(parseInt(savedLevel, 10));
      }
      
      const savedActivity = localStorage.getItem('user_points_activity');
      if (savedActivity) {
        setRecentActivity(JSON.parse(savedActivity));
      }
    }
  }, [isAuthenticated]);

  // Calculate level from points
  const calculateLevel = (points: number): number => {
    return Math.floor(Math.sqrt(points / 100)) + 1;
  };

  // Update level when points change
  useEffect(() => {
    const newLevel = calculateLevel(points);
    if (newLevel !== level) {
      setLevel(newLevel);
      localStorage.setItem('user_level', newLevel.toString());
      
      // Show level up notification
      toast({
        title: "Niveau augmenté !",
        description: `Félicitations ! Vous avez atteint le niveau ${newLevel}`,
        variant: "default",
      });
    }
  }, [points, level, toast]);

  // Add points for an action
  const addPoints = (action: PointsAction, multiplier = 1, customMessage?: string) => {
    if (!isAuthenticated) return;
    
    const reward = POINTS_REWARDS[action];
    if (!reward) return;
    
    const pointsToAdd = reward.points * multiplier;
    const newPoints = points + pointsToAdd;
    
    setPoints(newPoints);
    localStorage.setItem('user_points', newPoints.toString());
    
    // Add to recent activity
    const activity = {
      ...reward,
      points: pointsToAdd,
      message: customMessage || reward.message
    };
    
    const updatedActivity = [activity, ...recentActivity.slice(0, 9)];
    setRecentActivity(updatedActivity);
    localStorage.setItem('user_points_activity', JSON.stringify(updatedActivity));
    
    // Show toast notification
    toast({
      title: `+${pointsToAdd} points`,
      description: activity.message,
      variant: "default",
    });
    
    return pointsToAdd;
  };

  // Get points needed for next level
  const getPointsForNextLevel = (): number => {
    const nextLevel = level + 1;
    return nextLevel * nextLevel * 100 - points;
  };

  // Calculate progress percentage to next level
  const getLevelProgress = (): number => {
    const currentLevelPoints = level * level * 100;
    const nextLevelPoints = (level + 1) * (level + 1) * 100;
    const levelRange = nextLevelPoints - currentLevelPoints;
    const pointsInCurrentLevel = points - currentLevelPoints;
    
    return Math.min(100, Math.floor((pointsInCurrentLevel / levelRange) * 100));
  };

  return {
    points,
    level,
    recentActivity,
    addPoints,
    getPointsForNextLevel,
    getLevelProgress,
    POINTS_REWARDS
  };
}
