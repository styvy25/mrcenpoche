
// Extend the current module type to include category field
export interface ModuleQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  answer: string;
  explanation?: string;
  category?: string; // Ajout pour compatibilité
  correctAnswer?: string; // Ajout pour compatibilité
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
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
  featured?: boolean; // Pour compatibilité avec le code existant
  cover?: string; // Pour compatibilité avec le code existant
}

export interface QuizQuestion {
  id: number; // This should be a number to match the imported type
  text: string;
  options: { id: string; text: string }[];
  answer: string;
  question?: string; // Added for compatibility
}
