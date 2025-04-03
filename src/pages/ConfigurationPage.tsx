
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key, User, Bell, Shield, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import APIKeyManager from "@/components/settings/APIKeyManager";

const ConfigurationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Configuration du compte
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Personnalisez votre expérience et gérez vos paramètres
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                  <TabsTrigger value="general" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Général
                  </TabsTrigger>
                  <TabsTrigger value="api-keys" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <Key className="h-4 w-4 mr-2" />
                    Clés API
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Sécurité
                  </TabsTrigger>
                  <TabsTrigger value="data" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                    <Database className="h-4 w-4 mr-2" />
                    Données
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres généraux</CardTitle>
                    <CardDescription>Configurez les paramètres généraux de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme">Thème</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Choisissez le thème de l'interface
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Clair</Button>
                          <Button variant="outline" size="sm">Sombre</Button>
                          <Button variant="default" size="sm">Système</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Mode hors ligne</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Permettre l'accès aux cours hors ligne
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Langue</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sélectionnez votre langue préférée
                          </p>
                        </div>
                        <select className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm">
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api-keys" className="mt-0">
                <APIKeyManager />
              </TabsContent>
              
              <TabsContent value="profile" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Mettez à jour vos informations de profil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" placeholder="Votre nom complet" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                        placeholder="Quelques mots à propos de vous"
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input id="location" placeholder="Ville, Pays" />
                    </div>
                    
                    <Button className="bg-mrc-blue">Enregistrer les modifications</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notification</CardTitle>
                    <CardDescription>Gérez comment vous souhaitez être notifié</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Nouvelles formations</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Soyez informé des nouvelles formations disponibles</p>
                        </div>
                        <Switch checked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Réunions virtuelles</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Rappels pour les réunions virtuelles à venir</p>
                        </div>
                        <Switch checked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Commentaires</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Notifications des réponses à vos commentaires</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter hebdomadaire</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Résumé hebdomadaire des nouvelles mises à jour</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <Button className="bg-mrc-blue">Changer le mot de passe</Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium mb-3">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Ajoutez une couche de sécurité supplémentaire à votre compte
                      </p>
                      <Button variant="outline">Activer l'authentification à deux facteurs</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des données</CardTitle>
                    <CardDescription>Gérez vos données personnelles et de formation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Télécharger mes données</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Téléchargez une copie de vos données personnelles et de formation
                        </p>
                        <Button variant="outline">Exporter mes données</Button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">Zone de danger</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Effacez vos données de formation ou supprimez complètement votre compte
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30">
                            Effacer mes données de formation
                          </Button>
                          <Button variant="destructive">
                            Supprimer mon compte
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfigurationPage;
