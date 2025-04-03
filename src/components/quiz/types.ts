
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
}

export interface QuizResultData {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryName: string;
  timeSpent: number;
  earnedBadges: string[];
}
