
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/message';

interface MessagesContainerProps {
  messages: Partial<Message>[];
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

  // Ensure all messages have proper id and timestamp
  const normalizedMessages = messages.map((message, index) => {
    return {
      ...message,
      id: message.id || `temp-${index}`,
      timestamp: message.timestamp || new Date(),
      text: message.text || message.content || ""
    } as Message;
  });

  return (
    <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(80vh-12rem)] p-4 bg-gradient-to-b from-gray-900/80 to-black/90 backdrop-blur-md rounded-lg">
      <div className="flex flex-col gap-4">
        {normalizedMessages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            message={message as Message}
            isCurrentUser={message.sender === currentUserId || message.currentUser === true}
            formattedTime={formatTime(message.timestamp as Date)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
