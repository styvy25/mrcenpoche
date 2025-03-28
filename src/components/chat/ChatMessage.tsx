
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Check, CheckCheck } from "lucide-react";
import { Message } from "./hooks/types";

interface ChatMessageProps {
  message: Message;
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const ChatMessage = ({ message, currentUserId, formatTime }: ChatMessageProps) => {
  const isCurrentUser = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group my-2`}>
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-end gap-2`}>
        {!isCurrentUser && (
          <Avatar className="h-10 w-10 border-2 border-mrc-blue shadow-md">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-mrc-blue text-white font-medium">
              {message.senderName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex flex-col">
          {!isCurrentUser && (
            <span className="text-xs text-gray-300 mb-1 ml-1 font-medium">
              {message.senderName}
            </span>
          )}
          
          <Card className={`p-3 ${
            isCurrentUser 
              ? 'bg-gradient-to-r from-mrc-blue/90 to-purple-600/80 text-white rounded-t-lg rounded-bl-lg border-none shadow-lg' 
              : 'bg-gray-800/90 text-white rounded-t-lg rounded-br-lg border-gray-700'
          } transition-all duration-300 hover:shadow-md backdrop-blur-sm`}>
            <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
              {message.content && (
                <p className="text-sm break-words leading-relaxed">{message.content}</p>
              )}
              
              {message.mediaUrl && message.mediaType === 'photo' && (
                <img 
                  src={message.mediaUrl} 
                  alt="Contenu partagé" 
                  className="mt-2 rounded-md max-w-[240px] max-h-[180px] object-cover border border-white/20 shadow-lg"
                  loading="lazy"
                />
              )}
              
              {message.mediaUrl && message.mediaType === 'audio' && (
                <audio 
                  src={message.mediaUrl} 
                  controls 
                  className="mt-2 w-full max-w-[240px]"
                />
              )}
              
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-xs text-gray-300/90">
                  {formatTime(message.timestamp)}
                </span>
                {isCurrentUser && (
                  <CheckCheck size={12} className="text-green-400" />
                )}
              </div>
            </div>
          </Card>
        </div>
        
        {isCurrentUser && (
          <Avatar className="h-10 w-10 border-2 border-purple-600 shadow-md">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback className="bg-gradient-to-br from-mrc-blue to-purple-600 text-white font-medium">
              {message.senderName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
