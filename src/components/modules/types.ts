
export interface Lesson {
  id: number;
  title: string;
  description: string;
  content?: string;
  completed?: boolean;
  isCompleted?: boolean; // Compatibility alias
  isLocked?: boolean;
  duration?: string;
}

export interface ModuleQuestion {
  id: string;
  text: string;
  answer: string;
  // Backward compatibility
  question?: string;
  options?: { id: string; text: string; }[];
  correctOptionId?: string;
  explanation?: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface QuizSubmission {
  moduleId: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  progress: number;
  lessons: Lesson[];
  // Additional properties used throughout the app
  isCompleted?: boolean;
  locked?: boolean;
  isPdfAvailable?: boolean;
  pdfUrl?: string;
  quizLink?: string;
  isNew?: boolean;
  categoryName?: string;
  // Fields for adaptive training
  priority?: string;
  reason?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: { id: string; text: string; }[];
  correctAnswer: string;
  explanation: string;
}
