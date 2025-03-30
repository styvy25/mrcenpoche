
export interface Message {
  id: string;
  text?: string;
  sender?: string;
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

// Nouveaux types pour résoudre les problèmes de compatibilité
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
