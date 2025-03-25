
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
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-end gap-2`}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 border-2 border-mrc-blue">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-mrc-blue text-white">
              {message.senderName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex flex-col">
          {!isCurrentUser && (
            <span className="text-xs text-gray-400 mb-1 ml-1">
              {message.senderName}
            </span>
          )}
          
          <Card className={`p-3 ${
            isCurrentUser 
              ? 'bg-gradient-to-r from-mrc-blue/90 to-purple-600/80 text-white rounded-t-lg rounded-bl-lg' 
              : 'bg-gray-800/90 text-white rounded-t-lg rounded-br-lg'
          } shadow-md transition-all duration-300 border border-white/5 hover:shadow-lg backdrop-blur-sm`}>
            <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
              {message.content && (
                <p className="text-sm break-words">{message.content}</p>
              )}
              
              {message.mediaUrl && message.mediaType === 'photo' && (
                <img 
                  src={message.mediaUrl} 
                  alt="Shared content" 
                  className="mt-2 rounded-md max-w-[240px] max-h-[180px] object-cover border border-white/10 shadow-lg"
                />
              )}
              
              {message.mediaUrl && message.mediaType === 'audio' && (
                <audio 
                  src={message.mediaUrl} 
                  controls 
                  className="mt-2 w-full max-w-[240px]"
                />
              )}
              
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-300/70">
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
          <Avatar className="h-8 w-8 border-2 border-purple-600">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback className="bg-gradient-to-br from-mrc-blue to-purple-600 text-white">
              {message.senderName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
