
export interface Module {
  id: string;
  title: string;
  description: string;
  image?: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  categoryName?: string;
  type: 'core' | 'advanced' | 'special' | 'exam';
  locked: boolean;
  isNew?: boolean;
  progress: number;
  rating?: number;
  completed?: boolean;
  requiredLevel?: number;
}

export interface ModuleCategory {
  id: string;
  name: string;
  color: string;
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
      options: { id: string; text: string }[];
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
