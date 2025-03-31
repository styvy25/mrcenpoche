
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  Home
} from 'lucide-react';
import { 
  Dock, 
  DockItem, 
  DockIcon, 
  DockLabel 
} from '@/components/ui/dock';
import { useNotifications, NotificationCategory } from '@/context/NotificationContext';
import NotificationBadge from './NotificationBadge';

const MobileNotificationDock = () => {
  const navigate = useNavigate();
  const { getUnreadCountByCategory } = useNotifications();

  // Simplified dock items based on core functionality
  const dockItems = [
    { icon: Home, label: 'Accueil', path: '/', category: null },
    { icon: MessageSquare, label: 'Chat', path: '/chat-237', category: 'messages' as NotificationCategory },
    { icon: Bell, label: 'Notifications', path: '/notifications', category: 'system' as NotificationCategory }
  ];

  return (
    <Dock className="md:hidden">
      {dockItems.map((item, index) => (
        <DockItem key={index} onClick={() => navigate(item.path)}>
          <DockIcon className="relative">
            <item.icon />
            {item.category && getUnreadCountByCategory(item.category) > 0 && (
              <NotificationBadge 
                count={getUnreadCountByCategory(item.category)} 
                className="scale-90"
              />
            )}
          </DockIcon>
          <DockLabel>{item.label}</DockLabel>
        </DockItem>
      ))}
    </Dock>
  );
};

export default MobileNotificationDock;
