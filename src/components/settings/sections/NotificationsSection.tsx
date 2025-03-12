
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NotificationsSection = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("notifications_enabled");
    return saved ? saved === "true" : true;
  });
  const { toast } = useToast();

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("notifications_enabled", checked.toString());
    
    toast({
      title: checked ? "Notifications activées" : "Notifications désactivées",
      description: checked 
        ? "Vous recevrez des notifications pour les nouveaux contenus et événements" 
        : "Vous ne recevrez plus de notifications",
      variant: checked ? "default" : "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-500" />
          Notifications
        </CardTitle>
        <CardDescription>
          Gérez vos préférences de notification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="notifications-all">Toutes les notifications</Label>
            <p className="text-sm text-gray-500">Activer ou désactiver toutes les notifications</p>
          </div>
          <Switch 
            id="notifications-all" 
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationToggle}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Types de notifications</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-modules">Nouveaux modules</Label>
              <p className="text-xs text-gray-500">Notifications pour les nouveaux modules de formation</p>
            </div>
            <Switch 
              id="notifications-modules" 
              disabled={!notificationsEnabled}
              defaultChecked={true}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-events">Événements</Label>
              <p className="text-xs text-gray-500">Notifications pour les événements à venir</p>
            </div>
            <Switch 
              id="notifications-events" 
              disabled={!notificationsEnabled}
              defaultChecked={true}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-challenges">Défis quotidiens</Label>
              <p className="text-xs text-gray-500">Rappels pour les défis quotidiens</p>
            </div>
            <Switch 
              id="notifications-challenges" 
              disabled={!notificationsEnabled}
              defaultChecked={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
