
export interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  icon?: string;
  description?: string;
  color?: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  category: string;
  correctAnswers: number;
  incorrectAnswers: number;
  timestamp?: Date;
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  iconType: string;
  earned?: boolean;
  date?: string;
  gradient?: string;
}

export interface BadgeSummary {
  earned: BadgeProps[];
  available: BadgeProps[];
}
