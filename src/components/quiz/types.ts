export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
  updatedAt: Date;
  author: string;
  rating: number;
  image: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  isFree: boolean;
  price: number;
  discount: number;
  reviews: Review[];
  modules: Module[];
  lessons: Lesson[];
  resources: Resource[];
  appointments: Appointment[];
  announcements: Announcement[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  resources: Resource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
  resources: Resource[];
  quiz: Quiz;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "video" | "audio" | "document" | "link";
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  label?: string;
  color?: string;
  icon?: string;
  badge?: string;
  description?: string;
  questions?: QuizQuestion[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

// Add QuizQuestion interface
export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  date: Date;
  unlockedBadges?: BadgeProps[];
}

// Add BadgeProps interface
export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  requirementText: string;
  colorClass?: string;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  participant: string;
  // Add missing properties
  isVirtual?: boolean;
  link?: string;
  participantsCount?: number;
  maxParticipants?: number;
  duration?: string;
}

// Add AppointmentRequest interface
export interface AppointmentRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string;
  type: string;
}
