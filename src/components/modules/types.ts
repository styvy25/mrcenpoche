
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
  // Extended properties for backward compatibility
  overview?: string;
  quizLink?: string;
  isPdfAvailable?: boolean;
  pdfUrl?: string;
  isCompleted?: boolean;
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

// Appointment-related types moved from quiz types
export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: string;
  description?: string;
  attendees?: number;
  maxAttendees?: number;
  host?: string;
  status?: 'scheduled' | 'cancelled' | 'completed';
  imageUrl?: string;
}

export interface AppointmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  appointmentId: string;
  date: string;
  time: string;
  message?: string;
}

// Badge-related types moved from quiz types
export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  earned: boolean;
  progress?: number;
  total?: number;
  dateEarned?: string;
  category?: string;
}
