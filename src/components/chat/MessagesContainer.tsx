
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Message } from './types/message';

interface MessagesContainerProps {
  messages: Message[];
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  messages,
  currentUserId,
  formatTime
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(80vh-12rem)] p-4">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            message={message}
            isCurrentUser={message.sender === currentUserId || message.currentUser === true}
            formattedTime={formatTime(message.timestamp)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
