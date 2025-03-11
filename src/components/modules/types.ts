
export interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  content?: string;
  isLocked?: boolean;
}

export interface Module {
  id: string | number;
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  isPdfAvailable: boolean;
  isCompleted: boolean;
  overview: string;
  lessons: Lesson[];
  quizLink?: string;
  pdfUrl?: string;
  questions?: QuizQuestion[];
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
  difficulty?: string;
  imageSrc?: string;
}
