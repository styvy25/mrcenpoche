
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
}

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

  return (
    <ScrollArea className="flex-1 p-2 sm:p-4">
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-gray-400">
            <p>Aucun message. Commencez la conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage 
              key={message.id}
              message={message}
              currentUserId={currentUserId}
              formatTime={formatTime}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
