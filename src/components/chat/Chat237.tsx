
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useMessageHandler } from './hooks/useMessageHandler';
import { usePresenceManagement } from './hooks/usePresenceManagement';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import ActiveUsersList from './ActiveUsersList';
import Chat237Header from './Chat237Header';
import ChatMedia from './Chat237Media';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Chat237Props {
  containerClassName?: string;
  isInDialog?: boolean;
}

const Chat237: React.FC<Chat237Props> = ({ 
  containerClassName = '',
  isInDialog = false
}) => {
  const {
    messages,
    isLoading,
    handleSendMessage,
    handleSendMedia,
    clearConversation,
    initializeMessages
  } = useMessageHandler();
  
  const { activeUsers, currentUser } = usePresenceManagement();
  const [error, setError] = useState<Error | null>(null);
  const [showMediaCapture, setShowMediaCapture] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'audio'>('photo');

  // Format the timestamp for messages
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format the timestamp for last seen
  const formatLastSeen = (date: Date): string => {
    return new Date(date).toLocaleTimeString();
  };

  // Mark messages as read when component mounts
  useEffect(() => {
    try {
      initializeMessages();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize messages'));
    }
  }, [initializeMessages]);

  // Handle sending messages
  const sendMessage = (text: string) => {
    try {
      return handleSendMessage(text);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'));
      return false;
    }
  };

  // Handle media capture
  const handleOpenMediaCapture = (type: 'photo' | 'audio') => {
    setMediaType(type);
    setShowMediaCapture(true);
  };

  const handleCloseMediaCapture = () => {
    setShowMediaCapture(false);
  };

  const handleCaptureMedia = async (file: File) => {
    if (handleSendMedia) {
      await handleSendMedia(file);
    }
    setShowMediaCapture(false);
  };

  // If we're still loading the chat data
  if (isLoading) {
    return (
      <Card className={`flex items-center justify-center h-96 bg-gradient-to-br from-gray-900 to-black border-blue-900/50 ${containerClassName}`}>
        <div className="text-center p-4">
          <div className="flex justify-center mb-4">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          </div>
          <p className="text-blue-300">
            Chargement de la conversation...
          </p>
        </div>
      </Card>
    );
  }

  // If there was an error
  if (error) {
    return (
      <Card className={`flex items-center justify-center h-96 bg-gradient-to-br from-gray-900 to-black border-blue-900/50 ${containerClassName}`}>
        <Alert variant="destructive" className="max-w-md bg-red-900/20 border-red-800">
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
      {showMediaCapture ? (
        <ChatMedia
          mediaType={mediaType}
          onCapture={handleCaptureMedia}
          onCancel={handleCloseMediaCapture}
        />
      ) : (
        <div className="flex flex-col md:flex-row h-full gap-4">
          {/* Main chat area */}
          <div className="flex flex-col flex-grow">
            <Card className="flex flex-col h-full overflow-hidden border-blue-900/50 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-md">
              <Chat237Header 
                currentUser={currentUser}
                activeUsers={activeUsers}
                onClearChat={clearConversation}
              />
              <CardContent className="p-0 flex-grow overflow-hidden">
                <MessagesContainer 
                  messages={messages} 
                  currentUserId={currentUser.id}
                  formatTime={formatTime}
                />
                <MessageInput 
                  onSendMessage={sendMessage}
                  onOpenCamera={() => handleOpenMediaCapture('photo')}
                  onOpenAudio={() => handleOpenMediaCapture('audio')}
                />
              </CardContent>
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
      )}
    </div>
  );
};

export default React.memo(Chat237);
