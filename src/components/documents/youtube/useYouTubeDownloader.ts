
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useApiKeys } from "@/hooks/useApiKeys";

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

export const useYouTubeDownloader = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { keys, keyStatus } = useApiKeys();

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get video information
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
      // Get video info via YouTube API
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
      
      // Convert ISO 8601 duration to readable format
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

  // Function to simulate download
  const simulateDownload = () => {
    if (!videoInfo) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadCompleted(false);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadCompleted(true);
          
          // Add badge for download
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

  return {
    videoUrl,
    setVideoUrl,
    videoInfo,
    isLoading,
    isDownloading,
    downloadProgress,
    downloadCompleted,
    error,
    fetchVideoInfo,
    simulateDownload
  };
};
