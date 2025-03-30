
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead?: boolean;
  currentUser?: boolean;
}
