
export interface Message {
  id: string;
  text?: string;
  sender?: 'user' | 'ai';
  timestamp: Date;
  isRead?: boolean;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  content?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | 'file';
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url: string;
    name?: string;
  };
  role?: "assistant" | "user";
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

export interface MessageContent {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | 'file';
  text?: string;
  sender?: string;
}

export interface MessagesContainerProps {
  messages: Message[];
  currentUserId: string;
  formatTime: (date: Date) => string;
}
