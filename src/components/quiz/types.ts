
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  answers: string[];
  explanation?: string;
  category: string;
  difficulty: string;
  imageSrc?: string;
  text?: string; // Add this optional property to fix errors
}

export interface Category {
  id: string;
  name: string;
  color: string;
  questions: QuizQuestion[];
  label?: string;
}

export interface QuizState {
  currentQuestion: number;
  showFeedback: boolean;
  isCorrect: boolean;
  quizCompleted: boolean;
  score: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}
