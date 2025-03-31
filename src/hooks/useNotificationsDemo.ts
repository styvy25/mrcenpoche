
import { useNotifications, NotificationCategory } from '@/context/NotificationContext';
import { Info, BookOpen, MessageSquare } from 'lucide-react';
import React from 'react';

export const useNotificationsDemo = () => {
  const { addNotification, notifications } = useNotifications();

  const createDemoNotifications = () => {
    if (notifications.length === 0) {
      addNotification({
        title: "Bienvenue dans MRC en Poche",
        message: "Merci d'utiliser notre application. Découvrez toutes les fonctionnalités disponibles.",
        type: 'info',
        category: 'system',
        icon: React.createElement(Info, { className: "h-5 w-5 text-blue-500" })
      });
      
      setTimeout(() => {
        addNotification({
          title: "Nouveau message reçu",
          message: "Vous avez reçu un nouveau message de l'administrateur dans le forum.",
          type: 'info',
          category: 'messages',
          link: '/forum',
          icon: React.createElement(MessageSquare, { className: "h-5 w-5 text-blue-500" })
        });
      }, 3000);
    }
  };

  return { createDemoNotifications };
};
