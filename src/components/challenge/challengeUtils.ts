
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
