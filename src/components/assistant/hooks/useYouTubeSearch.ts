
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { searchMRCVideos, getVideoInfo } from "../services/youtubeService";
import { Message } from "../types/message";

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSearch = async (query: string, isOnline: boolean) => {
    if (!isOnline) {
      toast({
        title: "Fonctionnalité non disponible",
        description: "La recherche YouTube n'est pas disponible en mode hors-ligne.",
        variant: "destructive",
      });
      return;
    }
    
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer votre clé API YouTube.",
        variant: "destructive",
      });
      return;
    }

    const { youtube } = JSON.parse(apiKeys);
    if (!youtube) {
      toast({
        title: "Clé API YouTube manquante",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
        variant: "destructive",
      });
      return;
    }

    setIsSearchingYouTube(true);
    try {
      const videos = await searchMRCVideos(youtube, query);
      setYoutubeResults(videos);
    } catch (error) {
      toast({
        title: "Erreur YouTube",
        description: "Impossible de récupérer les vidéos. Vérifiez votre clé API YouTube.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingYouTube(false);
    }
  };

  const handleVideoSelect = async (videoId: string, isOnline: boolean, setIsLoading: (value: boolean) => void, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    if (!isOnline) {
      toast({
        title: "Fonctionnalité non disponible",
        description: "L'analyse de vidéos n'est pas disponible en mode hors-ligne.",
        variant: "destructive",
      });
      return;
    }
    
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) return;

    const { youtube, perplexity } = JSON.parse(apiKeys);
    if (!youtube || !perplexity) return;

    setIsLoading(true);
    try {
      const videoInfo = await getVideoInfo(youtube, videoId);
      
      const systemMessage: Message = {
        role: "assistant",
        content: `Analyse de la vidéo: "${videoInfo.title}"\n\nJe suis en train d'examiner le contenu de cette vidéo...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);

      const prompt = `Analyse cette vidéo YouTube du MRC intitulée "${videoInfo.title}". 
                     Description: ${videoInfo.description}
                     ${videoInfo.transcript ? `Transcription: ${videoInfo.transcript}` : ''}
                     
                     Fais un résumé des points clés, identifie les messages politiques principaux et explique comment cette vidéo s'inscrit dans la stratégie de communication du MRC.`;
      
      const { getPerplexityResponse } = await import("../services/perplexityService");
      const analysisContent = await getPerplexityResponse(perplexity, prompt);
      
      const analysisMessage: Message = {
        role: "assistant",
        content: analysisContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, analysisMessage]);
    } catch (error) {
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser cette vidéo. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    youtubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect,
    setYoutubeResults
  };
}
