
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications, NotificationCategory, Notification } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  BookOpen, 
  Check, 
  ChevronRight, 
  MessageSquare, 
  Trash, 
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    getUnreadCount
  } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Handle filtering notifications based on tab
  const filteredNotifications = (() => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(
      notification => notification.category === activeTab
    );
  })();
  
  // Filter unread notifications
  const unreadCount = getUnreadCount();
  
  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce<Record<string, Notification[]>>(
    (groups, notification) => {
      const date = format(notification.timestamp, 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    },
    {}
  );
  
  const renderNotificationIcon = (notification: Notification) => {
    if (notification.icon) return notification.icon;
    
    switch (notification.category) {
      case 'system':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'messages':
        return <MessageSquare className="h-5 w-5 text-indigo-500" />;
      case 'modules':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'challenges':
        return <Award className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-7 w-7 text-blue-600" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2 py-0.5">
                {unreadCount} non lues
              </span>
            )}
          </h1>
          
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Tout marquer comme lu</span>
                <span className="sm:hidden">Tout lire</span>
              </Button>
            )}
            
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearNotifications}
                className="flex items-center gap-1"
              >
                <Trash className="h-4 w-4" />
                <span className="hidden sm:inline">Supprimer tout</span>
                <span className="sm:hidden">Supprimer</span>
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="challenges">Défis</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucune notification</h3>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de notifications dans cette catégorie.
                  </p>
                </CardContent>
              </Card>
            ) : (
              Object.keys(groupedNotifications)
                .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                .map(date => (
                  <div key={date} className="mb-6">
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">
                      {format(new Date(date), 'EEEE d MMMM yyyy', { locale: fr })}
                    </h2>
                    
                    <Card className="mb-4">
                      {groupedNotifications[date].map((notification, index) => (
                        <React.Fragment key={notification.id}>
                          <div 
                            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer flex ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                            }`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.link) {
                                navigate(notification.link);
                              }
                            }}
                          >
                            <div className="mr-4 mt-0.5">
                              {renderNotificationIcon(notification)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                  {format(notification.timestamp, 'HH:mm')}
                                </span>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              
                              {notification.link && (
                                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                                  Ouvrir 
                                  <ChevronRight className="h-3 w-3 ml-1" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {index < groupedNotifications[date].length - 1 && (
                            <Separator />
                          )}
                        </React.Fragment>
                      ))}
                    </Card>
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
