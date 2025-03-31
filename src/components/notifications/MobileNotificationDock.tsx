
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  BookOpen, 
  MessageSquare, 
  PanelLeft,
  Award,
  LucideIcon
} from 'lucide-react';
import { 
  Dock, 
  DockItem, 
  DockIcon, 
  DockLabel 
} from '@/components/ui/dock';
import { useNotifications } from '@/context/NotificationContext';
import NotificationBadge from './NotificationBadge';

interface DockItemType {
  icon: LucideIcon;
  label: string;
  path: string;
  category?: 'system' | 'modules' | 'messages' | 'challenges';
}

const MobileNotificationDock = () => {
  const navigate = useNavigate();
  const { getUnreadCountByCategory } = useNotifications();

  const dockItems: DockItemType[] = [
    { icon: PanelLeft, label: 'Menu', path: '/index' },
    { icon: BookOpen, label: 'Modules', path: '/modules', category: 'modules' },
    { icon: MessageSquare, label: 'Chat', path: '/chat-237', category: 'messages' },
    { icon: Award, label: 'Défis', path: '/quiz', category: 'challenges' },
    { icon: Bell, label: 'Notifications', path: '/notifications', category: 'system' }
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
