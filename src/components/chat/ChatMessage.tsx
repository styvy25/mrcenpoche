
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const ChatMessage = ({ message, currentUserId, formatTime }: ChatMessageProps) => {
  const isCurrentUser = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-end gap-2`}>
        <Avatar className="h-8 w-8 border-2 border-mrc-blue">
          <AvatarImage src={message.senderAvatar} />
          <AvatarFallback>
            {message.senderName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <Card className={`p-3 ${
          isCurrentUser 
            ? 'bg-mrc-blue/20 text-white rounded-t-lg rounded-bl-lg' 
            : 'bg-gray-800/70 text-white rounded-t-lg rounded-br-lg'
        }`}>
          <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-gray-400">
              {isCurrentUser ? 'Vous' : message.senderName}
            </span>
            
            {message.content && (
              <p className="text-sm mt-1 break-words">{message.content}</p>
            )}
            
            {message.mediaUrl && message.mediaType === 'photo' && (
              <img 
                src={message.mediaUrl} 
                alt="Shared content" 
                className="mt-2 rounded-md max-w-[240px] max-h-[180px] object-cover"
              />
            )}
            
            {message.mediaUrl && message.mediaType === 'audio' && (
              <audio 
                src={message.mediaUrl} 
                controls 
                className="mt-2 w-full max-w-[240px]"
              />
            )}
            
            <span className="text-xs text-gray-500 mt-1">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
