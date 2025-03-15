
export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: "quiz" | "reading" | "video" | "practice";
  difficulty: "facile" | "moyen" | "difficile";
  estimatedTime: number; // in minutes
  completed?: boolean;
  progress?: number;
}

export interface ChallengeState {
  dailyChallenge: Challenge | null;
  streakCount: number;
  totalPoints: number;
  nextRefresh: Date;
}
