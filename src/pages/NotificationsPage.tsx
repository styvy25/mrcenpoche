
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  useNotifications,
  NotificationCategory
} from '@/context/NotificationContext';
import NotificationItem from '@/components/notifications/NotificationItem';
import { useSEO } from '@/hooks/useSEO';

const NotificationsPage = () => {
  const { 
    notifications, 
    getByCategory, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  const { setPageTitle, setPageDescription } = useSEO();

  // Set SEO metadata
  useEffect(() => {
    setPageTitle("Notifications - MRC en Poche");
    setPageDescription("Gérez vos notifications dans l'application MRC en Poche.");
  }, [setPageTitle, setPageDescription]);

  const categories: { id: NotificationCategory; label: string }[] = [
    { id: 'system', label: 'Système' },
    { id: 'modules', label: 'Modules' },
    { id: 'messages', label: 'Messages' },
    { id: 'challenges', label: 'Défis' }
  ];

  const hasNotifications = notifications.length > 0;

  return (
    <MainLayout className="bg-background" padBottom={true}>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          {hasNotifications && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => markAllAsRead()}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                <span>Tout marquer lu</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => clearNotifications()}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span>Tout supprimer</span>
              </Button>
            </div>
          )}
        </div>

        {hasNotifications ? (
          <Tabs defaultValue="system" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label} ({getByCategory(category.id).length})
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="rounded-md border">
                  <div className="flex justify-between items-center p-4 border-b bg-muted/50">
                    <h2 className="font-semibold">Notifications {category.label}</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAllAsRead(category.id)}
                      >
                        Tout marquer lu
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => clearNotifications(category.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Effacer
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="divide-y">
                      {getByCategory(category.id).map((notification) => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification} 
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-primary/70" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Aucune notification</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Vous n'avez aucune notification pour le moment. 
              Les notifications apparaîtront ici lorsque vous recevrez de nouveaux messages, 
              mises à jour de modules ou défis.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
