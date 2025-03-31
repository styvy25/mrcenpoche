
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationCategory = 'system' | 'modules' | 'messages' | 'challenges';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  read: boolean;
  date: Date;
  link?: string;
  icon?: React.ReactNode;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (category?: NotificationCategory) => void;
  clearNotifications: (category?: NotificationCategory) => void;
  getByCategory: (category: NotificationCategory) => Notification[];
  getUnreadCountByCategory: (category: NotificationCategory) => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // Convert string dates back to Date objects
        const withDates = parsed.map((notif: any) => ({
          ...notif,
          date: new Date(notif.date)
        }));
        setNotifications(withDates);
      } catch (error) {
        console.error('Failed to parse saved notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      date: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = (category?: NotificationCategory) => {
    setNotifications(prev => 
      prev.map(notif => 
        !category || notif.category === category ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = (category?: NotificationCategory) => {
    setNotifications(prev => 
      !category ? [] : prev.filter(notif => notif.category !== category)
    );
  };

  const getByCategory = (category: NotificationCategory) => {
    return notifications.filter(notif => notif.category === category);
  };

  const getUnreadCountByCategory = (category: NotificationCategory) => {
    return notifications.filter(notif => notif.category === category && !notif.read).length;
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearNotifications,
        getByCategory,
        getUnreadCountByCategory
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
