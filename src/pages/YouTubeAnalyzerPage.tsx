
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import YouTubeAnalyzer from '@/components/youtube/YouTubeAnalyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MRCLogo from '@/components/branding/MRCLogo';

const YouTubeAnalyzerPage = () => {
  const { keyStatus } = useApiKeys();
  const navigate = useNavigate();
  
  const handleGoToSettings = () => {
    navigate('/settings');
  };
  
  return (
    <MainLayout>
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Analyse de contenu YouTube</h1>
            <MRCLogo size="medium" withTagline />
          </div>
          
          {!keyStatus.youtube ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Configuration requise</CardTitle>
                <CardDescription>
                  Pour analyser des vidéos YouTube, vous devez configurer une clé API YouTube valide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleGoToSettings}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configurer l'API YouTube
                </Button>
              </CardContent>
            </Card>
          ) : (
            <YouTubeAnalyzer className="mb-8" />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Comment ça marche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Notre analyseur de contenu YouTube vous permet de :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Extraire les informations essentielles des vidéos</li>
                  <li>Générer des PDF avec titres, descriptions et transcriptions</li>
                  <li>Archiver le contenu pour référence future</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Formats d'URL acceptés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Nous acceptons les formats d'URL YouTube suivants :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><code>https://www.youtube.com/watch?v=XXXXXXXXXXX</code></li>
                  <li><code>https://youtu.be/XXXXXXXXXXX</code></li>
                  <li><code>https://youtube.com/embed/XXXXXXXXXXX</code></li>
                  <li>ID de vidéo YouTube (11 caractères)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default YouTubeAnalyzerPage;
