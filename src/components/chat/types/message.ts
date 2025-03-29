
export interface Message {
  id: string | number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video';
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  role?: "assistant" | "user";
}
