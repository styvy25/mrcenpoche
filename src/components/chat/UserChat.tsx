
import React, { useEffect, useState, useCallback } from 'react';
import { useMessageHandler } from './hooks/useMessageHandler';
import { usePresenceManagement } from './hooks/usePresenceManagement'; 
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import ActiveUsersList from './ActiveUsersList';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  // Format the timestamp for messages - memoized to avoid recreating on every render
  const formatTime = useCallback((date: Date): string => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  // Mark messages as read when component mounts
  useEffect(() => {
    try {
      initializeMessages();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize messages'));
    }
  }, [initializeMessages]);

  // Handle sending messages
  const sendMessage = useCallback((text: string) => {
    try {
      return handleSendMessage(text);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'));
      return false;
    }
  }, [handleSendMessage]);

  // Format the timestamp for last seen
  const formatLastSeen = useCallback((date: Date): string => {
    return new Date(date).toLocaleTimeString();
  }, []);

  // If we're still loading the chat data
  if (isLoading) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <div className="text-center p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Chargement de la conversation...
          </p>
        </div>
      </Card>
    );
  }

  // If there was an error
  if (error) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur de connexion</AlertTitle>
          <AlertDescription>
            Impossible de charger la conversation. Veuillez vérifier votre connexion réseau.
            <p className="text-sm mt-2 opacity-80">{error.message}</p>
          </AlertDescription>
        </Alert>
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
              formatTime={formatTime}
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

export default React.memo(UserChat);
