
export interface Message {
  id?: string;
  role?: string;
  content: string;
  timestamp: Date;
  sender?: string;
  isRead?: boolean;
  currentUser?: boolean;
  text?: string;
  senderName?: string;
  senderAvatar?: string;
  senderId?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | 'file';
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url: string;
    name?: string;
  };
}
