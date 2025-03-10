
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "../types/message";
import { getPerplexityResponse } from "../services/perplexityService";
import { searchMRCVideos, getVideoInfo } from "../services/youtubeService";

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSearch = async (query: string) => {
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

  const handleVideoSelect = async (videoId: string) => {
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

  const handleSendMessage = async (input: string) => {
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer vos clés API.",
        variant: "destructive",
      });
      return;
    }

    const { perplexity, youtube } = JSON.parse(apiKeys);
    
    if (!perplexity) {
      toast({
        title: "Clé API Perplexity manquante",
        description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const youtubeKeywords = ["vidéo", "video", "youtube", "regarder", "voir", "discours", "interview", "conférence", "média"];
    const hasYoutubeIntent = youtubeKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
    
    if (hasYoutubeIntent && youtube) {
      const searchTerms = input.replace(/vidéo|video|youtube|regarder|voir|discours|interview|conférence|média/gi, '').trim();
      await handleYouTubeSearch(searchTerms || "MRC Cameroun");
    }

    try {
      const responseContent = await getPerplexityResponse(perplexity, input);
      
      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch
  };
}
