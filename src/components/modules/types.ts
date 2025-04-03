
export interface Module {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  coverImage?: string;
  cover?: string; // Added for compatibility with CoursesGrid
  duration: string;
  level?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  category: string;
  categoryName?: string;
  type?: 'core' | 'advanced' | 'special' | 'exam';
  locked: boolean;
  isNew?: boolean;
  progress: number;
  rating?: number;
  completed?: boolean;
  requiredLevel?: number;
  isFeatured?: boolean;
  featured?: boolean; // Added for backward compatibility
  isPdfAvailable?: boolean;
  isCompleted?: boolean;
  lessons?: any[];
  questions?: ModuleQuestion[]; 
  pdfUrl?: string;
  quizLink?: string;
  overview?: string; // For ModuleOverview
  author?: string;
  lessonCount?: number;
  // Added for adaptive training
  priority?: 'high' | 'medium' | 'low';
  reason?: string;
}

export interface ModuleQuestion {
  id: string | number;
  question: string;
  options: { id: string; text: string; }[] | string[];
  correctOptionId?: string;
  correctAnswer?: string | number;
  explanation: string;
  text?: string;
}

export interface ModuleCategory {
  id: string;
  name: string;
  label?: string;
  color?: string;
  icon?: string;
  iconName?: string;
}

export interface ModuleCertificate {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  issuedAt: string;
  pdfUrl?: string;
}

export interface ModuleContent {
  content?: string;
  videos?: {
    videoId: string;
    title: string;
    description: string;
  }[];
  quiz?: {
    id: string;
    title: string;
    description: string;
    questions: {
      id: string;
      text: string;
      options: { id: string; text: string; }[];
      correctOptionId: string;
      explanation: string;
    }[];
    passingScore: number;
  };
}

export interface QuizSubmission {
  moduleId: string;
  quizId: string;
  score: number;
  answers: Record<string, string>;
  passed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconType: string;
  gradient?: string;
  iconColor?: string;
  date?: string;
}

export interface TrainingProgressData {
  completedModules: number;
  totalModules: number;
  achievements: {
    id: string;
    name: string;
    description: string;
    date: string;
    iconType: string;
    color?: string;
  }[];
  sessions: {
    id: string;
    moduleId: string;
    moduleTitle: string;
    date: string;
    durationMinutes: number;
    progress: number;
  }[];
  badges: Badge[];
}

export interface Lesson {
  id: string | number;
  title: string;
  duration: string;
  isCompleted: boolean;
  type?: string;
  contentType?: string;
  videoUrl?: string;
  content?: string;
  isLocked?: boolean;
}
