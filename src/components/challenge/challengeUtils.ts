
import { Challenge, ChallengeState } from './types';

export const getChallengeProgress = (challenge: Challenge): number => {
  return challenge.progress || 0;
};

export const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTimeRemaining = (deadline: string): string => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return "Expiré";
  }
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24);
    return `${days} jour${days > 1 ? 's' : ''}`;
  }
  
  return `${diffHours}h ${diffMinutes}m`;
};

export const getCompletedChallengesCount = (challenges: Challenge[]): number => {
  return challenges.filter(challenge => challenge.isCompleted).length;
};

export const getTotalPoints = (challenges: Challenge[]): number => {
  return challenges
    .filter(challenge => challenge.isCompleted)
    .reduce((total, challenge) => total + challenge.points, 0);
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

interface ChallengeResult {
  dailyChallenge: Challenge;
  streakCount: number;
  totalPoints: number;
  nextRefresh: Date;
}

// Mock functions for working with challenges - these would typically connect to a real backend
export const loadOrCreateChallenge = (): ChallengeResult => {
  // In a real app, this would load from an API or database
  const storedChallenge = localStorage.getItem('daily_challenge');
  const storedStreakCount = Number(localStorage.getItem('streak_count') || '0');
  const storedTotalPoints = Number(localStorage.getItem('total_points') || '0');
  const nextRefresh = new Date(new Date().setHours(23, 59, 59, 999));
  
  if (storedChallenge) {
    return {
      dailyChallenge: JSON.parse(storedChallenge),
      streakCount: storedStreakCount,
      totalPoints: storedTotalPoints,
      nextRefresh
    };
  }
  
  // Create a new challenge if none exists
  const newChallenge: Challenge = {
    id: `challenge-${Date.now()}`,
    title: "Défi quotidien",
    description: "Complétez un module de formation aujourd'hui",
    type: 'daily',
    points: 50,
    deadline: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    isNew: true,
    isCompleted: false,
    difficulty: 'medium',
    estimatedTime: '15 min',
    progress: 0
  };
  
  localStorage.setItem('daily_challenge', JSON.stringify(newChallenge));
  
  return {
    dailyChallenge: newChallenge,
    streakCount: storedStreakCount,
    totalPoints: storedTotalPoints,
    nextRefresh
  };
};

export const saveChallengeProgress = (challenge: Challenge, progress: number): Challenge => {
  const updatedChallenge = { ...challenge, progress };
  localStorage.setItem('daily_challenge', JSON.stringify(updatedChallenge));
  return updatedChallenge;
};

interface CompleteResult {
  completedChallenge: Challenge;
  newStreak: number;
  newPoints: number;
}

export const completeChallenge = (
  challenge: Challenge,
  currentStreak: number,
  currentPoints: number
): CompleteResult => {
  const completedChallenge = { 
    ...challenge, 
    isCompleted: true, 
    progress: 100 
  };
  
  const newStreak = currentStreak + 1;
  const newPoints = currentPoints + challenge.points;
  
  localStorage.setItem('daily_challenge', JSON.stringify(completedChallenge));
  localStorage.setItem('streak_count', String(newStreak));
  localStorage.setItem('total_points', String(newPoints));
  
  return {
    completedChallenge,
    newStreak,
    newPoints
  };
};
