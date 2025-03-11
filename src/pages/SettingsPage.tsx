
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APIKeyForm } from "@/components/settings/APIKeyForm";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, CreditCard, Youtube, Bell, AlertCircle } from "lucide-react";
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
          Gérez vos paramètres et préférences d'application.
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="api-keys">Clés API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Clés API</h2>
            </div>
            <Separator className="my-2" />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  Perplexity API
                </CardTitle>
                <CardDescription>
                  Configurez votre clé API Perplexity pour activer les fonctionnalités d'assistant IA.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APIKeyForm 
                  serviceKey="perplexity-api-key"
                  serviceLabel="Clé API Perplexity"
                  serviceDescription="Entrez votre clé API Perplexity pour activer les fonctionnalités d'assistant IA."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  Stripe API
                </CardTitle>
                <CardDescription>
                  Configurez vos clés Stripe pour activer les fonctionnalités de paiement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APIKeyForm 
                  serviceKey="stripe-api-key"
                  serviceLabel="Clé API Stripe"
                  serviceDescription="Entrez votre clé API Stripe pour activer les fonctionnalités de paiement."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-gray-500" />
                  YouTube API
                </CardTitle>
                <CardDescription>
                  Configurez votre clé API YouTube pour intégrer les vidéos YouTube.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APIKeyForm 
                  serviceKey="youtube-api-key"
                  serviceLabel="Clé API YouTube"
                  serviceDescription="Entrez votre clé API YouTube pour rechercher et intégrer des vidéos."
                />
              </CardContent>
            </Card>
          </div>
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

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Compte</CardTitle>
              <CardDescription>
                Paramètres de votre compte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Les paramètres du compte seront disponibles prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Les paramètres d'apparence seront disponibles prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
