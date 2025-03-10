
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "histoire" | "culture" | "traditions" | "politique" | "geographie" | "mobilisation" | "communication" | "enjeux" | "campagne";
  difficulty: "facile" | "moyen" | "difficile";
  imageSrc?: string;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  color: string;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  category: "histoire" | "culture" | "traditions" | "politique" | "geographie" | "mobilisation" | "communication" | "enjeux" | "campagne";
  level: "bronze" | "argent" | "or" | "platine";
  earnedAt?: Date;
  progress?: number;
  unlocked?: boolean;
  colorClass?: string;
  dateUnlocked?: Date;
}

export type BadgeProps = Badge;

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: number[];
  earnedBadge?: Badge;
  date: Date;
  totalQuestions?: number;
  unlockedBadges?: Badge[];
}

export interface Appointment {
  id: string;
  userId?: string;
  title: string;
  description: string;
  type: "private" | "public";
  date: Date;
  duration: number; // in minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  participantsCount?: number;
  maxParticipants?: number;
  location?: string;
  isVirtual: boolean;
  link?: string;
}

export interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  type: "private" | "public";
  preferredDate: Date;
  topic: string;
  message?: string;
}
