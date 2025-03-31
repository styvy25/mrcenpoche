
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    timestamp: Date;
  };
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const ChatMessage = ({ message, currentUserId, formatTime }: ChatMessageProps) => {
  const isCurrentUser = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-2 max-w-[85%] group ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-offset-2 ring-offset-gray-900 ring-white/20">
          {message.senderAvatar ? (
            <AvatarImage src={message.senderAvatar} alt={message.senderName} />
          ) : (
            <AvatarFallback className={`${
              isCurrentUser ? 'bg-mrc-green' : 'bg-mrc-blue'
            } text-white`}>
              {message.senderName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className={`rounded-2xl px-4 py-3 text-sm backdrop-blur-sm border transition-all duration-200 group-hover:shadow-lg ${
          isCurrentUser
            ? 'bg-mrc-green/20 border-mrc-green/30 text-white'
            : 'bg-mrc-blue/20 border-mrc-blue/30 text-white'
        }`}>
          <div className="font-medium text-xs mb-1 flex items-center gap-1">
            {!isCurrentUser ? message.senderName : 'Vous'}
            {isCurrentUser && (
              <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>
            )}
          </div>
          <p className="leading-relaxed">{message.content}</p>
          <div className="text-xs opacity-70 mt-1 text-right flex justify-end items-center gap-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
