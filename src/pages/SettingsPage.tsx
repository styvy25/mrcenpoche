
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import APIKeysSection from '@/components/settings/sections/APIKeysSection';

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Paramètres</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="api-keys" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api-keys">Clés API</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api-keys">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration des clés API</CardTitle>
                  <CardDescription>
                    Configurez vos clés API pour activer toutes les fonctionnalités de l'application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <APIKeysSection />
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Thème</h3>
                    <p className="text-sm text-muted-foreground">
                      Choisissez le thème de l'application dans le menu en haut à droite.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
