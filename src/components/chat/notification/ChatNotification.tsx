
import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface ChatNotificationProps {
  unreadMessages: number;
  onlineUsers: number;
}

const ChatNotification: React.FC<ChatNotificationProps> = ({ 
  unreadMessages, 
  onlineUsers 
}) => {
  const [previousUnread, setPreviousUnread] = useState(0);
  const [previousOnline, setPreviousOnline] = useState(0);

  useEffect(() => {
    // Notification pour nouveaux messages
    if (unreadMessages > previousUnread && previousUnread > 0) {
      const diff = unreadMessages - previousUnread;
      toast({
        title: `${diff} nouveau${diff > 1 ? 'x' : ''} message${diff > 1 ? 's' : ''}`,
        description: "Vous avez reçu de nouveaux messages",
      });
    }
    setPreviousUnread(unreadMessages);
    
    // Notification pour nouveaux utilisateurs
    if (onlineUsers > previousOnline && previousOnline > 0) {
      toast({
        title: "Nouveaux utilisateurs en ligne",
        description: `${onlineUsers} utilisateur${onlineUsers > 1 ? 's' : ''} actuellement en ligne`,
      });
    }
    setPreviousOnline(onlineUsers);
  }, [unreadMessages, onlineUsers]);

  return null; // Composant invisible, uniquement pour la logique
};

export default ChatNotification;
