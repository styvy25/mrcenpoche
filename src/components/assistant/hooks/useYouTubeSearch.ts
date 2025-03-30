
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { searchMRCVideos, getVideoInfo, YouTubeVideo } from '../services/youtubeService';
import { Message } from '../types/message';
import { v4 as uuidv4 } from 'uuid';

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<YouTubeVideo[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSearch = useCallback(async (query: string, isOnline: boolean = true) => {
    if (!isOnline) {
      toast({
        title: "Mode hors-ligne",
        description: "La recherche YouTube n'est pas disponible en mode hors-ligne.",
        variant: "destructive",
      });
      return;
    }

    setIsSearchingYouTube(true);
    setYoutubeResults([]);

    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Clé API manquante",
          description: "Veuillez configurer une clé API YouTube dans les paramètres.",
          variant: "destructive",
        });
        setIsSearchingYouTube(false);
        return;
      }

      const { youtube } = JSON.parse(apiKeys);
      if (!youtube) {
        toast({
          title: "Clé API YouTube manquante",
          description: "Veuillez configurer une clé API YouTube dans les paramètres.",
          variant: "destructive",
        });
        setIsSearchingYouTube(false);
        return;
      }

      const videos = await searchMRCVideos(youtube, query);
      setYoutubeResults(videos);
    } catch (error) {
      console.error("Error searching YouTube:", error);
      toast({
        title: "Erreur de recherche",
        description: "Une erreur est survenue lors de la recherche YouTube.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingYouTube(false);
    }
  }, [toast]);

  const handleVideoSelect = useCallback(async (
    videoId: string, 
    isOnline: boolean = true,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    if (!isOnline) {
      toast({
        title: "Mode hors-ligne",
        description: "L'analyse de vidéos n'est pas disponible en mode hors-ligne.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setYoutubeResults([]);

    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Clé API manquante",
          description: "Veuillez configurer une clé API YouTube dans les paramètres.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { youtube } = JSON.parse(apiKeys);
      if (!youtube) {
        toast({
          title: "Clé API YouTube manquante",
          description: "Veuillez configurer une clé API YouTube dans les paramètres.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const videoInfo = await getVideoInfo(youtube, videoId);
      
      // Add response about the video
      const aiMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: `**${videoInfo.title}**\n\n${videoInfo.description}\n\nVoici ce que j'ai compris de cette vidéo :\n\n${videoInfo.transcript}`,
        timestamp: new Date(),
        text: `**${videoInfo.title}**\n\n${videoInfo.description}\n\nVoici ce que j'ai compris de cette vidéo :\n\n${videoInfo.transcript}`
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur est survenue lors de l'analyse de la vidéo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    youtubeResults,
    setYoutubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect
  };
}
