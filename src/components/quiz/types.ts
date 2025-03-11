
// Original file content plus the addition of startTime and endTime properties

export interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  timeSpent: number;
  badge?: string;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  explanation?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  threshold: number;
  category: string;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  participant?: {
    name: string;
    email: string;
    phone?: string;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface Category {
  id: string;
  name: string;
  badge: string;
  color: string;
  icon: string;
  description: string;
}
