
import React, { useEffect, useState } from 'react';
import { useMessageHandler } from './hooks/useMessageHandler';
import { usePresenceManagement } from './hooks/usePresenceManagement'; 
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import ActiveUsersList from './ActiveUsersList';
import LoadingIndicator from '../assistant/LoadingIndicator';
import { Card } from '@/components/ui/card';
import { User } from './hooks/types';

interface UserChatProps {
  userId?: string;
  containerClassName?: string;
  isInDialog?: boolean;
}

const UserChat: React.FC<UserChatProps> = ({ 
  userId, 
  containerClassName = '',
  isInDialog = false
}) => {
  const {
    messages,
    isLoading,
    handleSendMessage,
    clearConversation,
    initializeMessages,
    setMessages
  } = useMessageHandler();
  
  const { activeUsers, currentUser } = usePresenceManagement();
  const [error, setError] = useState<Error | null>(null);

  // Mark messages as read when component mounts
  useEffect(() => {
    initializeMessages();
  }, [initializeMessages]);

  // Handle sending messages
  const sendMessage = (text: string) => {
    return handleSendMessage(text);
  };

  // Format the timestamp for last seen
  const formatLastSeen = (date: Date): string => {
    // Simple formatter for demonstration
    return new Date(date).toLocaleTimeString();
  };

  // If we're still loading the chat data
  if (isLoading) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <LoadingIndicator message="Chargement de la conversation..." />
      </Card>
    );
  }

  // If there was an error
  if (error) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Erreur de connexion</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Impossible de charger la conversation. Veuillez vérifier votre connexion réseau.
          </p>
          <p className="text-sm text-gray-500">Détail: {error.message}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className={`flex flex-col h-full ${containerClassName}`}>
      <div className="flex flex-col md:flex-row h-full gap-4">
        {/* Main chat area */}
        <div className="flex flex-col flex-grow">
          <Card className="flex flex-col h-full">
            <MessagesContainer 
              messages={messages} 
              currentUserId={currentUser.id}
            />
            <MessageInput 
              onSendMessage={sendMessage}
            />
          </Card>
        </div>
        
        {/* Active users sidebar */}
        {!isInDialog && (
          <div className="w-full md:w-64 order-first md:order-last">
            <ActiveUsersList 
              users={activeUsers} 
              currentUserId={currentUser.id}
              formatLastSeen={formatLastSeen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
