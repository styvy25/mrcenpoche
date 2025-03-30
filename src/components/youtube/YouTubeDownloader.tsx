
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePlanLimits } from '@/hooks/usePlanLimits';

interface YouTubeDownloaderProps {
  videoId: string;
  title: string;
  onDownloadComplete?: () => void;
}

const YouTubeDownloader: React.FC<YouTubeDownloaderProps> = ({
  videoId,
  title,
  onDownloadComplete
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { canDownloadYoutube, incrementYoutubeDownloads } = usePlanLimits();

  const handleDownload = async () => {
    if (!canDownloadYoutube()) {
      toast({
        title: "Fonctionnalité Premium",
        description: "Le téléchargement de vidéos YouTube est disponible uniquement pour les utilisateurs Premium",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    setError(null);
    
    try {
      // Simulate download progress - in a real app, this would connect to a backend service
      const intervalId = setInterval(() => {
        setDownloadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(intervalId);
            // Wait a moment before showing completion
            setTimeout(() => {
              setIsDownloading(false);
              setDownloadComplete(true);
              incrementYoutubeDownloads();
              if (onDownloadComplete) onDownloadComplete();
              
              // Create a fake download link to simulate the download
              const link = document.createElement('a');
              // This would be a real file in a production app
              link.href = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              link.download = `${title.replace(/[^\w\s]/gi, '')}.mp4`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              toast({
                title: "Téléchargement réussi",
                description: "La vidéo a été téléchargée sur votre appareil",
              });
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
    } catch (error) {
      console.error("Error downloading video:", error);
      setError("Une erreur est survenue lors du téléchargement. Veuillez réessayer.");
      setIsDownloading(false);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la vidéo",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (downloadComplete) {
    return (
      <Alert className="bg-green-50 border-green-200 text-green-800 mt-4">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Téléchargement terminé</AlertTitle>
        <AlertDescription>
          La vidéo "{title}" a été téléchargée avec succès sur votre appareil.
        </AlertDescription>
      </Alert>
    );
  }

  if (isDownloading) {
    return (
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Téléchargement en cours...</span>
          <span className="text-sm">{Math.round(downloadProgress)}%</span>
        </div>
        <Progress value={downloadProgress} className="h-2" />
        <p className="text-xs text-muted-foreground">
          Ne quittez pas la page pendant le téléchargement.
        </p>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleDownload} 
      className="mt-4"
      variant="outline"
    >
      <Download className="h-4 w-4 mr-2" />
      Télécharger cette vidéo
    </Button>
  );
};

export default YouTubeDownloader;
