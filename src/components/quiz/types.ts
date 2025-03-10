
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "culture" | "histoire" | "traditions" | "politique" | "geographie";
  difficulty: "facile" | "moyen" | "difficile";
  imageSrc?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "culture" | "histoire" | "traditions" | "politique" | "geographie";
  level: "bronze" | "argent" | "or";
  unlocked: boolean;
  dateUnlocked?: string;
  colorClass: string;
  imageUrl?: string;
}

export interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  unlockedBadges: Badge[];
  date: string;
}
