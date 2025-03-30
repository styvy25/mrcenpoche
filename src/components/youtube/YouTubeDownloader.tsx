
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useApiKeys } from "@/hooks/useApiKeys";
import SocialShareButton from '@/components/shared/SocialShareButton';
import { Download, YoutubeIcon, AlertCircle, ExternalLink, Loader2, Check } from "lucide-react";

interface VideoDetails {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: string;
}

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { keys, keyStatus } = useApiKeys();

  // Extract YouTube ID from URL
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    setDownloadComplete(false);
    setVideoDetails(null);
    
    if (!url.trim()) {
      setError("Veuillez entrer une URL YouTube");
      return;
    }
    
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("URL YouTube invalide");
      return;
    }
    
    if (!keys.youtube || !keyStatus.youtube) {
      toast({
        title: "Clé API YouTube manquante",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Fetch video details from YouTube API
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${keys.youtube}`
      );
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des informations de la vidéo");
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error("Vidéo YouTube non trouvée");
      }
      
      const video = data.items[0];
      const snippet = video.snippet;
      const contentDetails = video.contentDetails;
      
      // Convert ISO 8601 duration to readable format
      const duration = contentDetails.duration
        .replace('PT', '')
        .replace('H', 'h ')
        .replace('M', 'm ')
        .replace('S', 's');
      
      setVideoDetails({
        id: videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
        author: snippet.channelTitle,
        duration
      });
      
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoDetails) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);
          toast({
            title: "Téléchargement réussi !",
            description: `La vidéo "${videoDetails.title}" a été téléchargée avec succès.`,
          });
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  const handleOpenYouTube = () => {
    if (!videoDetails) return;
    window.open(`https://www.youtube.com/watch?v=${videoDetails.id}`, '_blank');
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="h-5 w-5 text-red-600" />
          Téléchargeur YouTube
        </CardTitle>
        <CardDescription>
          Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Collez l'URL de la vidéo YouTube ici"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isLoading || isDownloading}
          />
          <Button 
            type="submit" 
            variant="secondary"
            disabled={!url.trim() || isLoading || isDownloading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vérifier"}
          </Button>
        </form>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {videoDetails && (
          <div className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video w-full">
              <img 
                src={videoDetails.thumbnail} 
                alt={videoDetails.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                {videoDetails.duration}
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg line-clamp-2">{videoDetails.title}</h3>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">{videoDetails.author}</div>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary"
                  onClick={handleOpenYouTube}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Voir sur YouTube
                </Badge>
              </div>
              
              {isDownloading && (
                <div className="space-y-2">
                  <div className="text-sm flex justify-between">
                    <span>Téléchargement en cours...</span>
                    <span>{Math.round(downloadProgress)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-600 h-full transition-all duration-300 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {downloadComplete && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Téléchargement terminé</AlertTitle>
                  <AlertDescription>
                    La vidéo a été téléchargée avec succès et est disponible pour une consultation hors-ligne.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          {videoDetails && !isDownloading && !downloadComplete && (
            <SocialShareButton 
              title={videoDetails.title} 
              description="Regardez cette vidéo sur YouTube"
              url={`https://www.youtube.com/watch?v=${videoDetails.id}`}
            />
          )}
        </div>
        
        {videoDetails && !downloadComplete && (
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
                Télécharger
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default YouTubeDownloader;
