
import { useNotifications } from '@/context/NotificationContext';
import { Award, BookOpen, Info, MessageSquare } from 'lucide-react';
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
        icon: <Info className="h-5 w-5 text-blue-500" />
      });
      
      setTimeout(() => {
        addNotification({
          title: "Nouveau module disponible",
          message: "Le module 'Communication politique efficace' est maintenant disponible. Commencez dès aujourd'hui!",
          type: 'success',
          category: 'modules',
          link: '/modules',
          icon: <BookOpen className="h-5 w-5 text-green-500" />
        });
      }, 1500);
      
      setTimeout(() => {
        addNotification({
          title: "Nouveau message reçu",
          message: "Vous avez reçu un nouveau message de l'administrateur dans le forum.",
          type: 'info',
          category: 'messages',
          link: '/forum',
          icon: <MessageSquare className="h-5 w-5 text-blue-500" />
        });
      }, 3000);
      
      setTimeout(() => {
        addNotification({
          title: "Défi quotidien disponible",
          message: "Un nouveau défi quotidien est disponible. Testez vos connaissances et gagnez des points!",
          type: 'warning',
          category: 'challenges',
          link: '/quiz',
          icon: <Award className="h-5 w-5 text-amber-500" />
        });
      }, 4500);
    }
  };

  return { createDemoNotifications };
};
