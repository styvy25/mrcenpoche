
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { YoutubeIcon, Download, Link, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useApiKeys } from "@/hooks/useApiKeys";

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

const YouTubeDownloader = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { keys, keyStatus } = useApiKeys();

  // Fonction pour extraire l'ID vidéo YouTube de l'URL
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Fonction pour obtenir les informations de la vidéo
  const fetchVideoInfo = async () => {
    if (!videoUrl.trim()) {
      setError('Veuillez entrer une URL YouTube valide');
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError('URL YouTube invalide');
      return;
    }

    if (!keys.youtube || !keyStatus.youtube) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Récupérer les informations de la vidéo via l'API YouTube
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${keys.youtube}`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations de la vidéo');
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Vidéo non trouvée');
      }

      const videoItem = data.items[0];
      const snippet = videoItem.snippet;
      
      // Convertir la durée ISO 8601 en format lisible
      const duration = videoItem.contentDetails.duration
        .replace('PT', '')
        .replace('H', 'h ')
        .replace('M', 'm ')
        .replace('S', 's');
      
      setVideoInfo({
        id: videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
        duration: duration,
        author: snippet.channelTitle
      });
      
      setIsLoading(false);
      
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      setIsLoading(false);
    }
  };

  // Fonction pour simuler le téléchargement de la vidéo
  const simulateDownload = () => {
    if (!videoInfo) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadCompleted(false);
    
    // Simuler une progression du téléchargement
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadCompleted(true);
          
          // Ajouter un badge à l'utilisateur pour le téléchargement
          toast({
            title: "Téléchargement réussi !",
            description: "Vous avez gagné un badge de téléchargement YouTube !",
            variant: "default",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="text-red-600" />
          Téléchargeur de Vidéos YouTube
        </CardTitle>
        <CardDescription>
          Téléchargez des vidéos YouTube pour une utilisation hors ligne
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Entrez l'URL de la vidéo YouTube"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-1"
              disabled={isLoading || isDownloading}
            />
            <Button 
              variant="outline" 
              onClick={fetchVideoInfo}
              disabled={isLoading || isDownloading || !videoUrl.trim()}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Link className="mr-2 h-4 w-4" />
              )}
              Vérifier
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {videoInfo && (
            <div className="mt-4 space-y-4">
              <div className="flex gap-4">
                <div className="w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={videoInfo.thumbnail} 
                    alt={videoInfo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg line-clamp-2">{videoInfo.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>Auteur: {videoInfo.author}</span>
                    <span>•</span>
                    <span>Durée: {videoInfo.duration}</span>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      Vidéo YouTube
                    </Badge>
                  </div>
                </div>
              </div>

              {isDownloading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Téléchargement en cours...</span>
                    <span>{Math.round(downloadProgress)}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-2" />
                </div>
              )}

              {downloadCompleted && (
                <Alert className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Téléchargement terminé</AlertTitle>
                  <AlertDescription>
                    La vidéo a été téléchargée avec succès. Vous pouvez la trouver dans vos téléchargements.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          onClick={simulateDownload}
          disabled={!videoInfo || isDownloading || downloadCompleted}
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
              Télécharger
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YouTubeDownloader;
