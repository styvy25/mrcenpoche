
import { useState, useCallback } from "react";
import { Message } from "../types/message";
import { useMessageHandler } from "./useMessageHandler";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useOfflineMode } from "./useOfflineMode";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { Feature } from "@/hooks/api-keys/types";
import { useToast } from "@/hooks/use-toast";

export const useChatState = () => {
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
    // Check if user can use AI Chat feature
    const canUse = await checkAndUseFeature(Feature.AI_CHAT);
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
