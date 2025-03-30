
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  questions: QuizQuestion[];
  label?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  showFeedback: boolean;
  isCorrect: boolean;
  quizCompleted: boolean;
  selectedAnswers: string[];
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  unlockedBadges: BadgeProps[];
  date: Date;
}

export interface BadgeIcon {
  name: string;
  color: string;
}

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
