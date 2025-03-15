
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed?: boolean;
  timeEstimate: string;
  steps?: string[];
  category: string;
  prize?: Prize;
  type: string;
  estimatedTime: string;
  progress?: number;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ChallengeHeaderProps {
  streakCount: number;
  totalPoints: number;
  nextRefresh: Date;
}

export interface ChallengeActionsProps {
  challenge: Challenge | null;
  onStart: () => void;
  onComplete: () => void;
}

export interface ChallengeContentProps {
  challenge: Challenge | null;
}
