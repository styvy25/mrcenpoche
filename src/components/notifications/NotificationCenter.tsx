
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CheckCircle, Info, MessageSquare, Zap, Trash2, Check } from 'lucide-react';
import { 
  useNotifications, 
  NotificationCategory 
} from '@/context/NotificationContext';
import NotificationBadge from './NotificationBadge';
import NotificationItem from './NotificationItem';

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    clearNotifications,
    getByCategory,
    getUnreadCountByCategory
  } = useNotifications();

  const categories: { id: NotificationCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'system', label: 'Système', icon: <Info className="h-4 w-4" /> },
    { id: 'modules', label: 'Modules', icon: <Zap className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'challenges', label: 'Défis', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <NotificationBadge count={unreadCount} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" showArrow={true}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-sm">Notifications</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => markAllAsRead()}
              title="Marquer tout comme lu"
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => clearNotifications()}
              title="Supprimer toutes les notifications"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="system" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto p-0 bg-transparent">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="relative py-2 data-[state=active]:bg-background"
              >
                {category.icon}
                {getUnreadCountByCategory(category.id) > 0 && (
                  <NotificationBadge 
                    count={getUnreadCountByCategory(category.id)} 
                    max={9}
                    className="-top-1 -right-1"
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent 
              key={category.id} 
              value={category.id} 
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
                <span className="text-xs font-medium">{category.label}</span>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => markAllAsRead(category.id)}
                    className="h-6 px-2 text-xs"
                  >
                    Tout marquer lu
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => clearNotifications(category.id)}
                    className="h-6 px-2 text-xs text-muted-foreground"
                  >
                    Effacer
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[300px]">
                {getByCategory(category.id).length > 0 ? (
                  <div className="divide-y">
                    {getByCategory(category.id).map(notification => (
                      <NotificationItem 
                        key={notification.id}
                        notification={notification}
                        onClose={() => setOpen(false)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                    <Bell className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">Aucune notification</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
