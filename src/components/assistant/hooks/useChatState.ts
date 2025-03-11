
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "../types/message";
import { getPerplexityResponse } from "../services/perplexityService";
import { searchMRCVideos, getVideoInfo } from "../services/youtubeService";

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  // Initialize messages from localStorage if available
  useEffect(() => {
    const savedMessages = localStorage.getItem('mrc_chat_messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        setInitialMessage();
      }
    } else {
      setInitialMessage();
    }
    
    // Set up online/offline event listeners
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mrc_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);
  
  const setInitialMessage = () => {
    setMessages([{
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }]);
  };
  
  const handleOnlineStatusChange = () => {
    const online = navigator.onLine;
    setIsOnline(online);
    
    if (online) {
      toast({
        title: "Connexion rétablie",
        description: "Vous êtes de nouveau connecté à Internet.",
        variant: "default",
      });
    } else {
      toast({
        title: "Mode hors-ligne activé",
        description: "L'application fonctionne désormais en mode hors-ligne avec des fonctionnalités limitées.",
        variant: "destructive",
      });
    }
  };

  const handleYouTubeSearch = async (query: string) => {
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

  const handleVideoSelect = async (videoId: string) => {
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
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (!isOnline) {
      // In offline mode, we'll use the cached responses
      setTimeout(async () => {
        const offlineResponse = await getPerplexityResponse("", input); // Empty API key triggers offline mode
        
        const aiMessage: Message = {
          role: "assistant",
          content: offlineResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000); // Slight delay for better UX
      
      return;
    }

    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer vos clés API.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { perplexity, youtube } = JSON.parse(apiKeys);
    
    if (!perplexity) {
      toast({
        title: "Clé API Perplexity manquante",
        description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
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

  const clearConversation = () => {
    setInitialMessage();
    setYoutubeResults([]);
  };

  return {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    isOnline,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch,
    clearConversation
  };
}
