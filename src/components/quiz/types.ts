
export interface Category {
  id: string;
  name: string;
  color: string;
  label: string;
  icon: string;
  questions: QuizQuestion[];
  badge?: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  question: string;
  options: string[];
  correctAnswer: string | number;
  explanation: string;
  answers?: any[];
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface QuizResultData {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryName: string;
  timeSpent: number;
  earnedBadges: string[];
}

// Add a Question type alias for backward compatibility
export type Question = QuizQuestion;

// Add a QuizResult type for badgeUtils
export interface QuizResult {
  score: number;
  total: number;
  category: string;
  timeSpent: number;
}
