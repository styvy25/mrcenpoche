
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import YouTubeDownloader from '@/components/youtube/YouTubeDownloader';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YouTubeDownloaderPage = () => {
  const { canUseFeature } = usePlanLimits();
  const navigate = useNavigate();
  
  const canDownloadYoutube = canUseFeature('youtubeDownload');
  
  const handleUpgrade = () => {
    navigate('/payment');
  };
  
  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Download className="h-7 w-7 text-red-500" />
          Téléchargement de vidéos MRC
        </h1>
        <p className="text-muted-foreground mb-8">
          Téléchargez les vidéos du MRC pour les visionner hors-ligne ou les partager avec d'autres militants
        </p>
        
        {canDownloadYoutube ? (
          <YouTubeDownloader />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalité Premium</CardTitle>
              <CardDescription>
                Le téléchargement de vidéos YouTube est une fonctionnalité réservée aux utilisateurs Premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Passez à la version premium pour accéder au téléchargement de vidéos YouTube du MRC
                et pouvoir les visionner hors-ligne.
              </p>
              <Button onClick={handleUpgrade}>
                <CreditCard className="mr-2 h-4 w-4" />
                Passer à Premium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default YouTubeDownloaderPage;
