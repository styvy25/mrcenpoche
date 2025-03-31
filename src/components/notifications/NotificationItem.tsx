
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Notification, useNotifications } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      if (onClose) onClose();
    }
  };

  const getIcon = () => {
    if (notification.icon) return notification.icon;
    
    switch (notification.type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  return (
    <div 
      className={cn(
        "p-3 hover:bg-muted/50 cursor-pointer transition-colors",
        !notification.read && "bg-accent/50"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
              {notification.title}
            </p>
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
              {formatDate(notification.date)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {notification.message}
          </p>
          {notification.link && (
            <p className="text-xs text-primary mt-1">Cliquer pour voir plus</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
