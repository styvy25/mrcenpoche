
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import YouTubeDownloader from '@/components/youtube/YouTubeDownloader';
import { Download, History, ListChecks, YoutubeIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const YouTubeDownloadPage = () => {
  return (
    <MainLayout>
      <div className="container max-w-5xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <YoutubeIcon className="h-8 w-8 text-red-600" />
            Téléchargeur YouTube
          </h1>
          <p className="text-muted-foreground mt-2">
            Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne
          </p>
        </div>
        
        <Tabs defaultValue="download" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="download" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Télécharger
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Instructions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="mt-4">
            <YouTubeDownloader />
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historique des téléchargements
                </CardTitle>
                <CardDescription>
                  Vos téléchargements récents apparaîtront ici
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Aucun téléchargement dans l'historique</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  Instructions d'utilisation
                </CardTitle>
                <CardDescription>
                  Apprenez à utiliser le téléchargeur YouTube
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Configuration requise</AlertTitle>
                  <AlertDescription>
                    <ol className="list-decimal ml-5 space-y-2 mt-2">
                      <li>Une clé API YouTube valide (disponible dans les paramètres)</li>
                      <li>Une connexion Internet stable pour l'analyse des vidéos</li>
                    </ol>
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Comment télécharger une vidéo YouTube :</h3>
                  <ol className="list-decimal ml-5 space-y-2">
                    <li>Copiez l'URL de la vidéo YouTube que vous souhaitez télécharger</li>
                    <li>Collez l'URL dans le champ prévu et cliquez sur "Vérifier"</li>
                    <li>Une fois les détails de la vidéo affichés, cliquez sur "Télécharger"</li>
                    <li>Attendez que le téléchargement soit terminé</li>
                    <li>La vidéo sera disponible localement pour une consultation hors-ligne</li>
                  </ol>
                </div>
                
                <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                  <AlertTitle>Note importante</AlertTitle>
                  <AlertDescription>
                    Le téléchargement de vidéos YouTube est uniquement destiné à un usage personnel et éducatif. 
                    Veuillez respecter les droits d'auteur et les conditions d'utilisation de YouTube.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default YouTubeDownloadPage;
