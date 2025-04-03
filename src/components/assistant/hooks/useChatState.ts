
import { useState, useCallback } from "react";
import { Message } from "../types/message";
import { useMessageHandler } from "./useMessageHandler";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useOfflineMode } from "./useOfflineMode";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { Feature } from "@/services/paymentService";
import { useToast } from "@/components/ui/use-toast";
import { extractVideoId } from "../services/youtube/videoDownloader";

export type UseChatStateReturn = {
  messages: Message[];
  isLoading: boolean;
  youtubeResults: any[];
  isSearchingYouTube: boolean;
  downloadLinks: any;
  handleSendMessage: (content: string) => Promise<void>;
  handleClearMessages: () => void;
  handleVideoSelect: (videoId: string) => void;
};

export const useChatState = (): UseChatStateReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOnline } = useOfflineMode();
  const { 
    youtubeResults, 
    isSearchingYouTube, 
    downloadLinks,
    handleYouTubeSearch, 
    handleVideoSelect,
    setYoutubeResults,
    setDownloadLinks
  } = useYouTubeSearch();
  const { checkAndUseFeature } = usePlanLimits();
  const { toast } = useToast();
  const messageHandler = useMessageHandler();

  const handleSendMessage = useCallback(async (content: string) => {
    // Check if user can use AI Chat feature - using string literal instead of enum
    const canUse = await checkAndUseFeature("ai_chat");
    if (!canUse) {
      return;
    }

    // Clear YouTube results
    setYoutubeResults([]);
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Check for YouTube search commands
    if (content.toLowerCase().startsWith("/youtube ")) {
      const query = content.substring(9).trim();
      if (query) {
        await handleYouTubeSearch(query, isOnline);
        return;
      }
    }
    
    // Check for YouTube URL
    const youtubeUrlRegex = /(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[a-zA-Z0-9_-]+/i;
    if (youtubeUrlRegex.test(content)) {
      await handleYouTubeSearch(content, isOnline);
      return;
    }
    
    // Check for video download request
    const videoDownloadRegex = /télécharger\s+(?:la|cette)?\s*vidéo|download\s+(?:this)?\s*video/i;
    if (videoDownloadRegex.test(content) && youtubeResults.length > 0) {
      const videoId = youtubeResults[0].id;
      const assistantMessage: Message = {
        role: "assistant",
        content: `Voici les liens de téléchargement pour la vidéo demandée : https://youtube.com/watch?v=${videoId}. Cliquez sur l'une des options de téléchargement ci-dessous.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      return;
    }
    
    // Check if this is a video analysis request
    const videoAnalysisRegex = /analyser?\s+(?:la|cette)?\s*vidéo|analyse\s+(?:de|cette|la)?\s*vidéo/i;
    if (videoAnalysisRegex.test(content) && youtubeResults.length > 0) {
      // If user asks to analyze a video and we have YouTube results, 
      // analyze the first video
      await handleVideoSelect(
        youtubeResults[0].id,
        isOnline,
        setIsLoading,
        setMessages
      );
      return;
    }
    
    // Process regular message
    setIsLoading(true);
    try {
      await messageHandler.handleSendMessage(content, isOnline, handleYouTubeSearch);
      // Use the messages from messageHandler instead of directly setting
      setMessages([...messageHandler.messages]);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du traitement de votre message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    messageHandler,
    isOnline, 
    youtubeResults, 
    handleYouTubeSearch, 
    handleVideoSelect,
    setYoutubeResults,
    setDownloadLinks,
    checkAndUseFeature,
    toast
  ]);

  const handleClearMessages = useCallback(() => {
    setMessages([]);
    setYoutubeResults([]);
    setDownloadLinks(null);
    messageHandler.clearConversation();
  }, [setYoutubeResults, setDownloadLinks, messageHandler]);

  return {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    downloadLinks,
    handleSendMessage,
    handleClearMessages,
    handleVideoSelect: (videoId: string) => 
      handleVideoSelect(videoId, isOnline, setIsLoading, setMessages)
  };
};
