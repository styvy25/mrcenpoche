
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
}
