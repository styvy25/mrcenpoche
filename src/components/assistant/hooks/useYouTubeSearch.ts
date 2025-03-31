import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { searchMRCVideos, getVideoInfo } from "../services/youtubeService";
import { extractVideoId, generateDownloadLinks } from "../services/youtube/videoDownloader";
import { Message } from "../types/message";

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<any>(null);
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
    
    // Check if input looks like a YouTube URL
    const videoId = extractVideoId(query);
    if (videoId) {
      // Process as direct video URL
      try {
        const { getYouTubeApiKey } = await import("../services/youtubeApiService");
        const apiKey = await getYouTubeApiKey();
        
        if (!apiKey) {
          toast({
            title: "Configuration requise",
            description: "Veuillez d'abord configurer votre clé API YouTube dans les paramètres.",
            variant: "destructive",
          });
          return;
        }
        
        setIsSearchingYouTube(true);
        
        // Get video details
        const videoInfo = await getVideoInfo(apiKey, videoId);
        
        // Create a single result with the video
        const video = {
          id: videoId,
          title: videoInfo.title,
          description: videoInfo.description,
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          publishedAt: new Date().toISOString()
        };
        
        setYoutubeResults([video]);
        
        // Generate download links
        const links = generateDownloadLinks(videoId);
        setDownloadLinks(links);
        
        toast({
          title: "Vidéo trouvée",
          description: "Les liens de téléchargement sont disponibles",
        });
      } catch (error) {
        console.error("Error processing video URL:", error);
        toast({
          title: "Erreur",
          description: "Impossible de traiter cette URL vidéo",
          variant: "destructive",
        });
      } finally {
        setIsSearchingYouTube(false);
      }
      return;
    }
    
    // Regular search query
    const { getYouTubeApiKey } = await import("../services/youtubeApiService");
    const apiKey = await getYouTubeApiKey();
    
    if (!apiKey) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
        variant: "destructive",
      });
      return;
    }

    setIsSearchingYouTube(true);
    try {
      const videos = await searchMRCVideos(apiKey, query);
      setYoutubeResults(videos);
      setDownloadLinks(null); // Reset download links for regular search
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
    
    const { getYouTubeApiKey } = await import("../services/youtubeApiService");
    const youtubeKey = await getYouTubeApiKey();
    
    if (!youtubeKey) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
        variant: "destructive",
      });
      return;
    }
    
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) return;

    const { perplexity } = JSON.parse(apiKeys);
    if (!perplexity) {
      toast({
        title: "Clé Perplexity manquante",
        description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const videoInfo = await getVideoInfo(youtubeKey, videoId);
      
      // Generate download links
      const links = generateDownloadLinks(videoId);
      setDownloadLinks(links);
      
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
    downloadLinks,
    handleYouTubeSearch,
    handleVideoSelect,
    setYoutubeResults,
    setDownloadLinks
  };
}
