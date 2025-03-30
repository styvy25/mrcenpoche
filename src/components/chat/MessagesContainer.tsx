
import React, { useRef, useEffect, memo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/message';

interface MessagesContainerProps {
  messages: Partial<Message>[];
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const MessagesContainer: React.FC<MessagesContainerProps> = memo(({
  messages,
  currentUserId,
  formatTime
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [messages]);

  // Ensure all messages have proper id and timestamp
  const normalizedMessages = messages.map((message, index) => {
    return {
      ...message,
      id: message.id || `temp-${index}`,
      timestamp: message.timestamp || new Date(),
      text: message.text || message.content || "",
      sender: message.sender || "user"
    } as Message;
  });

  return (
    <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(80vh-12rem)] p-4 bg-gradient-to-b from-gray-900/80 to-black/90 backdrop-blur-md rounded-lg">
      <div className="flex flex-col gap-4">
        {normalizedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-[50vh] opacity-70">
            <div className="text-center p-6 rounded-lg border border-gray-700 bg-gray-800/30 backdrop-blur-sm">
              <h3 className="text-lg font-medium mb-2 text-white">Bienvenue au Chat MRC 237</h3>
              <p className="text-sm text-gray-300">
                Connectez-vous pour commencer à échanger avec d'autres militants.
              </p>
            </div>
          </div>
        ) : (
          normalizedMessages.map((message, index) => (
            <ChatMessage
              key={message.id || index}
              message={message as Message}
              isCurrentUser={message.sender === currentUserId || message.currentUser === true}
              formattedTime={formatTime(message.timestamp as Date)}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
});

MessagesContainer.displayName = 'MessagesContainer';

export default MessagesContainer;
