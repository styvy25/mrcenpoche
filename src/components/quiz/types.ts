
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "histoire" | "culture" | "traditions" | "politique" | "geographie" | "mobilisation" | "communication" | "enjeux" | "campagne";
  difficulty: "facile" | "moyen" | "difficile";
  imageSrc?: string;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  color: string;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  category: "histoire" | "culture" | "traditions" | "politique" | "geographie" | "mobilisation" | "communication" | "enjeux" | "campagne";
  level: "bronze" | "argent" | "or" | "platine";
  earnedAt?: Date;
  progress?: number;
}

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: number[];
  earnedBadge?: Badge;
  date: Date;
}
