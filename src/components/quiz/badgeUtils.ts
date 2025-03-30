
import { BadgeProps } from './types';

// Define badges that can be earned
const availableBadges: BadgeProps[] = [
  {
    id: 'first-quiz',
    name: 'Premier Quiz',
    description: 'Vous avez complété votre premier quiz',
    icon: 'Trophy',
    color: 'gold'
  },
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: 'Vous avez obtenu un score parfait',
    icon: 'Star',
    color: 'gold'
  },
  {
    id: 'knowledge-seeker',
    name: 'Chercheur de Connaissances',
    description: 'Vous avez complété un quiz avec plus de 75% de bonnes réponses',
    icon: 'Book',
    color: 'blue'
  },
  {
    id: 'historian',
    name: 'Historien',
    description: 'Vous avez excellé dans un quiz d\'histoire',
    icon: 'History',
    color: 'purple'
  },
  {
    id: 'political-expert',
    name: 'Expert Politique',
    description: 'Vous avez excellé dans un quiz de politique',
    icon: 'Vote',
    color: 'red'
  }
];

// Calculate which badges the user has earned
export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  const earnedBadges: BadgeProps[] = [];
  const scorePercentage = (score / totalQuestions) * 100;

  // First Quiz badge
  earnedBadges.push(availableBadges.find(badge => badge.id === 'first-quiz')!);

  // Perfect score badge
  if (score === totalQuestions) {
    earnedBadges.push(availableBadges.find(badge => badge.id === 'perfect-score')!);
  }

  // Knowledge seeker badge
  if (scorePercentage >= 75) {
    earnedBadges.push(availableBadges.find(badge => badge.id === 'knowledge-seeker')!);
  }

  return earnedBadges;
};
