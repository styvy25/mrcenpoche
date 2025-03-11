import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import APIKeyManager from "@/components/settings/APIKeyManager";
import AppearanceSection from "@/components/settings/sections/AppearanceSection";
import AccountSection from "@/components/settings/sections/AccountSection";
import { Bell, Key, Palette, UserCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
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
    <div className="container py-8 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gérez vos paramètres et préférences d'application
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Clés API
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            Compte
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apparence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Configuration des API</h2>
            </div>
            <Separator className="my-2" />
            <APIKeyManager />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Fonctionnalités hors-ligne
                </CardTitle>
                <CardDescription>
                  Informations sur le fonctionnement de l'application en mode hors-ligne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>
                    MRC en Poche est conçu pour fonctionner même sans connexion Internet. Voici comment les fonctionnalités principales se comportent en mode hors-ligne:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Assistant IA:</strong> Utilise des réponses prédéfinies et des réponses précédemment mises en cache.
                    </li>
                    <li>
                      <strong>Vidéos YouTube:</strong> Affiche des vidéos préchargées liées au MRC.
                    </li>
                    <li>
                      <strong>Modules de formation:</strong> Tout le contenu des modules est disponible hors-ligne.
                    </li>
                    <li>
                      <strong>Documents PDF:</strong> Les documents précédemment générés sont accessibles hors-ligne.
                    </li>
                  </ul>
                  
                  <p>
                    Pour une expérience optimale, nous recommandons de vous connecter périodiquement à Internet afin de mettre à jour le contenu et d'accéder à toutes les fonctionnalités.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <AccountSection />
        </TabsContent>

        <TabsContent value="notifications">
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
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
