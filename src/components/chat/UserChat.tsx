
import React, { useEffect } from 'react';
import { useChatState } from './hooks/useChatState';
import { useMessageHandler } from './hooks/useMessageHandler';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import ActiveUsersList from './ActiveUsersList';
import LoadingIndicator from '../assistant/LoadingIndicator';
import { Card } from '@/components/ui/card';
import { User } from './hooks/types';

interface UserChatProps {
  userId?: string; // Optional to support direct chat with a specific user
  containerClassName?: string;
}

const UserChat: React.FC<UserChatProps> = ({ userId, containerClassName = '' }) => {
  const {
    messages,
    users,
    currentUser,
    isLoading,
    setMessages,
    error
  } = useChatState();
  
  const {
    sendMessage,
    sendMediaMessage,
    handleMessageRead
  } = useMessageHandler({ setMessages });

  // Mark messages as read when component mounts
  useEffect(() => {
    if (messages.length > 0) {
      handleMessageRead();
    }
  }, [messages, handleMessageRead]);

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

  // Convert to the correct User type with isOnline property
  const activeUsers: User[] = users.map(user => ({
    id: user.id,
    name: user.name,
    status: user.status,
    lastSeen: user.lastSeen,
    avatar: user.avatar,
    isOnline: user.status === 'online'
  }));

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
              onSendMedia={sendMediaMessage}
            />
          </Card>
        </div>
        
        {/* Active users sidebar */}
        <div className="w-full md:w-64 order-first md:order-last">
          <ActiveUsersList users={activeUsers} currentUserId={currentUser.id} />
        </div>
      </div>
    </div>
  );
};

export default UserChat;
