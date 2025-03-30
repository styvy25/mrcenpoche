
export interface Message {
  id?: string;
  role?: string;
  content: string;
  timestamp: Date;
  sender?: string;
  isRead?: boolean;
  currentUser?: boolean;
}
