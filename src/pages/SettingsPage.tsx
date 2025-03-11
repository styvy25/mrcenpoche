
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PerplexityAPIKeyForm from '@/components/settings/PerplexityAPIKeyForm';
import APIKeyForm from '@/components/settings/APIKeyForm';

const SettingsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-mrc-blue mb-6">Paramètres</h1>
        
        <Tabs defaultValue="perplexity" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="perplexity">Perplexity AI</TabsTrigger>
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
          </TabsList>
          
          <TabsContent value="perplexity">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Perplexity AI</CardTitle>
                <CardDescription>
                  Configurez votre clé API pour utiliser les fonctionnalités d'intelligence artificielle avancées.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerplexityAPIKeyForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stripe">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Stripe</CardTitle>
                <CardDescription>
                  Gérez vos clés API Stripe pour les paiements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APIKeyForm
                  service="stripe"
                  label="Clé API Stripe"
                  description="Utilisée pour traiter les paiements sur la plateforme."
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="youtube">
            <Card>
              <CardHeader>
                <CardTitle>Configuration YouTube</CardTitle>
                <CardDescription>
                  Configurez votre clé API YouTube pour intégrer des vidéos et analyses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APIKeyForm
                  service="youtube"
                  label="Clé API YouTube"
                  description="Permet l'intégration de vidéos et l'analyse de contenu YouTube."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
