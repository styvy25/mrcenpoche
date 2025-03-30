
export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio' | 'video';
  mediaUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
}
