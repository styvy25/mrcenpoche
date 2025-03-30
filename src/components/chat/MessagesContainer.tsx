
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

  // Show a welcome message if there are no messages
  if (normalizedMessages.length === 0) {
    return (
      <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(80vh-12rem)] p-4">
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-800/50 backdrop-blur-sm max-w-md">
            <h3 className="text-lg font-semibold mb-2 text-white">Bienvenue dans le Chat 237</h3>
            <p className="text-gray-300 text-sm">
              Discutez avec d'autres sympathisants et militants du MRC en temps réel. 
              Commencez à envoyer des messages pour participer à la conversation.
            </p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(80vh-12rem)] bg-gradient-to-b from-gray-900 to-gray-950 p-4">
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
