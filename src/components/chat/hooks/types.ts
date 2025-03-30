
export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface Message {
  id: string;
  content?: string;
  text?: string;
  timestamp: Date;
  sender: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  isRead?: boolean;
  currentUser?: boolean;
  role?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | 'file';
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url: string;
    name?: string;
  };
}
