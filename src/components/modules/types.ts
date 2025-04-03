
export interface Module {
  id: string;
  title: string;
  description: string;
  cover: string;
  author: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  duration: string;
  lessonCount: number;
  category?: string;
  tag?: string;
  progress?: number;
  lessons?: Lesson[];
  isLocked?: boolean;
  isFeatured?: boolean;
  icon?: string;
  // Additional fields for extended functionality
  overview?: string;
  quizLink?: string;
  isPdfAvailable?: boolean;
  pdfUrl?: string;
  isCompleted?: boolean;
  isNew?: boolean;
  priority?: "high" | "medium" | "low";
  reason?: string;
  videoResources?: VideoResource[];
}

export interface VideoResource {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  duration: string;
  source: "youtube" | "direct" | "other";
  videoId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: string;
  completed: boolean;
  contentType: string;
  content?: any;
  duration?: string;
  videoUrl?: string;
  isLocked?: boolean;
  isCompleted?: boolean;
}

export interface QuizSubmission {
  userId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface ModuleQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  question?: string;
  correctAnswer?: string | number;
  difficulty?: string;
  category?: string;
  imageSrc?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string | number;
  explanation: string;
  question?: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}
