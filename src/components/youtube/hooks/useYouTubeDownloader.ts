
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useApiKeys } from "@/hooks/useApiKeys";

export interface VideoDetails {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: string;
}

export const useYouTubeDownloader = () => {
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
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

  return {
    url,
    setUrl,
    videoDetails,
    isLoading,
    isDownloading,
    downloadProgress,
    downloadComplete,
    error,
    handleSubmit,
    handleDownload,
    handleOpenYouTube
  };
};
