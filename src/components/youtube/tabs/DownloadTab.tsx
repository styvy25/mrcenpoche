
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import YouTubeURLInput from '../YouTubeURLInput';

interface DownloadSectionProps {
  videoId: string | null;
  videoTitle: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ videoId, videoTitle }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!videoId) return;
    
    setIsDownloading(true);
    
    try {
      // Simuler le téléchargement
      toast({
        title: "Téléchargement démarré",
        description: "La vidéo YouTube est en cours de téléchargement"
      });
      
      // Simuler un délai de téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Téléchargement terminé",
        description: "La vidéo a été téléchargée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!videoId) {
    return (
      <div className="text-center py-8">
        <Download className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-xl font-bold mb-2">Téléchargeur YouTube</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne. Entrez une URL YouTube pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">{videoTitle}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">ID: {videoId}</p>
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Téléchargement...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Télécharger la vidéo
              </>
            )}
          </Button>
        </div>
      </div>
      <Alert>
        <AlertTitle>Informations sur le téléchargement</AlertTitle>
        <AlertDescription>
          Le téléchargement de vidéos YouTube est uniquement destiné à un usage personnel et éducatif. 
          Veuillez respecter les droits d'auteur et les conditions d'utilisation de YouTube.
        </AlertDescription>
      </Alert>
    </div>
  );
};

interface DownloadTabProps {
  videoId: string | null;
  videoTitle: string;
  isVideoLoading: boolean;
  isLoading: boolean;
  handleValidateUrl: (url: string) => Promise<void>;
}

const DownloadTab: React.FC<DownloadTabProps> = ({
  videoId,
  videoTitle,
  isVideoLoading,
  isLoading,
  handleValidateUrl
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Téléchargeur YouTube</CardTitle>
        <CardDescription>
          Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne
        </CardDescription>
      </CardHeader>
      <CardContent>
        <YouTubeURLInput 
          onVideoSelect={() => {}}
          onSubmit={handleValidateUrl} 
          isLoading={isVideoLoading}
          disabled={isLoading}
          title="Télécharger une vidéo YouTube"
        />
        
        <DownloadSection 
          videoId={videoId} 
          videoTitle={videoTitle} 
        />
      </CardContent>
    </Card>
  );
};

export default DownloadTab;
