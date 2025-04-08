
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import APIKeyManager from '@/components/settings/APIKeyManager';
import { Settings, User, CreditCard, Key } from 'lucide-react';

const ConfigurationPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Configuration</h1>
            <p className="text-muted-foreground">Gérez vos paramètres et configurations de l'application MRC en Poche.</p>
          </div>
          
          <Tabs defaultValue="api-keys" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
              <TabsTrigger value="api-keys" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span>API Keys</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Compte</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Facturation</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="api-keys">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Clés API</CardTitle>
                    <CardDescription>
                      Configurez vos clés API pour accéder aux fonctionnalités avancées.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <APIKeyManager />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Instructions</CardTitle>
                    <CardDescription>
                      Comment obtenir les différentes clés API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">YouTube API</h3>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>Allez sur <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                          <li>Créez un nouveau projet</li>
                          <li>Activez l'API YouTube Data API v3</li>
                          <li>Créez des identifiants et copiez la clé API</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Perplexity API</h3>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>Visitez <a href="https://perplexity.ai/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Perplexity API</a></li>
                          <li>Créez un compte ou connectez-vous</li>
                          <li>Allez dans les paramètres de l'API</li>
                          <li>Générez une nouvelle clé API</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Stripe API (Optionnel)</h3>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>Créez un compte sur <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe</a></li>
                          <li>Accédez au tableau de bord des développeurs</li>
                          <li>Récupérez vos clés API (utilisez la clé de test pour le développement)</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du compte</CardTitle>
                  <CardDescription>
                    Gérez les informations de votre compte et votre profil.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground">
                      La gestion du compte sera disponible dans une prochaine mise à jour.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Facturation</CardTitle>
                  <CardDescription>
                    Gérez vos paiements et abonnements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground">
                      La facturation sera disponible dans une prochaine mise à jour.
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

export default ConfigurationPage;
