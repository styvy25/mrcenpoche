
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isRead?: boolean;
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url: string;
    name?: string;
  };
}

export interface User {
  id: string;
  name: string;
  status: string;
  lastSeen: Date;
  avatar: string;
  isOnline: boolean;
}

export interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
  isLoading: boolean;
  error: Error | null;
}
