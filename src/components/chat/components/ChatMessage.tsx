
import { motion } from "framer-motion";
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
  index: number;
}

const ChatMessage = ({ message, currentUserId, formatTime, index }: ChatMessageProps) => {
  const isCurrentUser = message.senderId === currentUserId;
  
  return (
    <motion.div 
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05, 
        type: "spring",
        stiffness: 100
      }}
    >
      <div className={`flex gap-2 max-w-[85%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative">
          <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-gray-900 ring-white/20">
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
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
        </div>
        
        <div className={`rounded-2xl px-4 py-3 text-sm backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg ${
          isCurrentUser
            ? 'bg-gradient-to-r from-mrc-green/20 to-green-950/30 border-mrc-green/30 text-white hover:border-mrc-green/50'
            : 'bg-gradient-to-r from-mrc-blue/20 to-blue-950/30 border-mrc-blue/30 text-white hover:border-mrc-blue/50'
        }`}>
          <div className="font-medium text-xs mb-1 flex items-center gap-1">
            {isCurrentUser ? 'Vous' : message.senderName}
            {isCurrentUser && (
              <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>
            )}
          </div>
          <p className="leading-relaxed">{message.content}</p>
          <div className="text-xs opacity-70 mt-1 text-right flex items-center justify-end gap-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green"
            ></motion.div>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
