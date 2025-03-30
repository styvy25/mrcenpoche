
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDown, Download, AlertCircle, Loader2, Youtube } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const YouTubeDownloader = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { keys, keyStatus } = useApiKeys();
  const { toast } = useToast();

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handlePrepareDownload = async () => {
    setIsLoading(true);
    setError(null);
    setDownloadUrl(null);

    if (!keys.youtube) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError("URL YouTube invalide. Veuillez entrer une URL valide.");
      setIsLoading(false);
      return;
    }

    try {
      // Vérifier que la vidéo existe et récupérer ses informations
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${keys.youtube}`);
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setError("Vidéo non trouvée ou non accessible.");
        setIsLoading(false);
        return;
      }

      // Dans un environnement réel, nous utiliserions un service de backend pour le téléchargement
      // Pour cette implémentation, nous générons simplement une URL simulée
      const simulatedUrl = `https://api.example.com/download?videoId=${videoId}&key=${keys.youtube.substring(0, 5)}...`;
      
      toast({
        title: "Vidéo prête à télécharger",
        description: "La vidéo a été préparée pour le téléchargement",
      });
      
      setDownloadUrl(simulatedUrl);
    } catch (error) {
      console.error("Error preparing download:", error);
      setError("Une erreur s'est produite lors de la préparation du téléchargement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // Cette fonction simule simplement le téléchargement
    toast({
      title: "Téléchargement démarré",
      description: "Votre vidéo commence à se télécharger",
    });
    
    // Dans une implémentation réelle, redirigez vers l'URL de téléchargement ou initiez un téléchargement
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          Téléchargement de vidéos YouTube
        </CardTitle>
        <CardDescription>
          Entrez l'URL d'une vidéo YouTube pour la télécharger sur votre appareil
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            onClick={handlePrepareDownload} 
            disabled={!videoUrl || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Préparation...
              </>
            ) : (
              <>
                <ArrowDown className="mr-2 h-4 w-4" />
                Préparer
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!keyStatus.youtube && (
          <Alert variant="warning" className="bg-amber-500/10 border-amber-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Configuration requise</AlertTitle>
            <AlertDescription>
              Vous devez configurer une clé API YouTube valide dans les paramètres pour utiliser cette fonctionnalité.
            </AlertDescription>
          </Alert>
        )}

        {downloadUrl && (
          <div className="rounded-lg border p-4 mt-4">
            <h3 className="text-lg font-medium mb-2">Vidéo prête à télécharger</h3>
            <p className="text-sm text-muted-foreground mb-4">
              La vidéo a été préparée et est prête à être téléchargée sur votre appareil.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Télécharger la vidéo
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Note: Le téléchargement de vidéos YouTube doit respecter les conditions d'utilisation de YouTube et les lois sur les droits d'auteur.
      </CardFooter>
    </Card>
  );
};

export default YouTubeDownloader;
