
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { Message } from "./types";
import { Users, Calendar } from "lucide-react";

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
    <ScrollArea className="flex-1 p-3 sm:p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center mb-4 shadow-inner">
              <Users size={32} className="text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Discussion vide</h3>
            <p className="text-sm max-w-xs text-gray-400">
              Partagez vos questions, expériences ou ressources avec les autres apprenants.
            </p>
          </div>
        ) : (
          Object.keys(groupedMessages).map(dateKey => (
            <div key={dateKey} className="space-y-4">
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute w-full border-t border-gray-700/50"></div>
                <span className="relative px-4 py-1.5 bg-gradient-to-r from-gray-800 to-gray-900 text-xs text-gray-400 rounded-full flex items-center gap-2 shadow-sm border border-gray-700/30">
                  <Calendar className="h-3 w-3" />
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
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
