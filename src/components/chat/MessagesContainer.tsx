
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { Message } from "./hooks/types";
import { Users } from "lucide-react";

interface MessagesContainerProps {
  messages: Message[];
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const MessagesContainer = ({ messages, currentUserId, formatTime }: MessagesContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessageDate = (date: Date): string => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (today.toDateString() === messageDate.toDateString()) {
      return "Aujourd'hui";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === messageDate.toDateString()) {
      return "Hier";
    }
    
    return messageDate.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  
  messages.forEach(message => {
    const dateKey = getMessageDate(message.timestamp);
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  return (
    <ScrollArea className="flex-1 p-2 sm:p-4">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center p-6 text-center text-gray-400">
            <p className="mb-4">Aucun message. Commencez la conversation!</p>
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3">
              <Users size={32} className="text-purple-400" />
            </div>
            <p className="text-sm max-w-xs">Partagez vos questions, expériences ou ressources avec les autres apprenants.</p>
          </div>
        ) : (
          Object.keys(groupedMessages).map(dateKey => (
            <div key={dateKey} className="space-y-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-gray-700"></div>
                <span className="relative bg-gray-800 px-3 py-1 text-xs text-gray-400 rounded-full mx-auto">
                  {dateKey}
                </span>
              </div>
              
              {groupedMessages[dateKey].map((message) => (
                <ChatMessage 
                  key={message.id}
                  message={message}
                  currentUserId={currentUserId}
                  formatTime={formatTime}
                />
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
