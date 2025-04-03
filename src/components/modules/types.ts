
// Extend the current module type to include category field
export interface ModuleQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  answer: string;
  explanation?: string;
  category?: string;
  correctAnswer?: string;
  question?: string;
  correctOptionId?: string;
  difficulty?: string;
  imageSrc?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  duration?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  duration: string;
  progress: number;
  locked: boolean;
  image?: string;
  lessons?: Lesson[];
  questions?: ModuleQuestion[];
  coverImage?: string;
  overview?: string;
  isFeatured?: boolean;
  featured?: boolean;
  cover?: string;
  isPdfAvailable?: boolean;
  pdfUrl?: string;
  isCompleted?: boolean;
  isNew?: boolean;
  categoryName?: string;
  quizLink?: string;
  priority?: 'high' | 'medium' | 'low';
  reason?: string;
}

export interface QuizQuestion {
  id: string | number;
  text: string;
  options: { id: string; text: string }[];
  answer?: string;
  question?: string;
  correctAnswer?: string | number;
  answers?: any[];
  explanation?: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}

// Define QuizSubmission interface for the adaptive training
export interface QuizSubmission {
  moduleId: string;
  score: number;
  answers: Record<string, string>;
  timestamp?: Date;
}
