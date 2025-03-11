
import { useEffect } from "react";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useMessageHandler } from "./useMessageHandler";
import { useOfflineMode } from "./useOfflineMode";

export function useChatState() {
  const { 
    messages, 
    isLoading, 
    setIsLoading,
    handleSendMessage: baseHandleSendMessage, 
    clearConversation,
    initializeMessages,
    setMessages
  } = useMessageHandler();
  
  const {
    youtubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect: baseHandleVideoSelect,
    setYoutubeResults
  } = useYouTubeSearch();
  
  const { isOnline } = useOfflineMode();

  // Initialize messages from localStorage if available
  useEffect(() => {
    initializeMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mrc_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = (input: string) => {
    return baseHandleSendMessage(input, isOnline, handleYouTubeSearch);
  };

  const handleVideoSelect = (videoId: string) => {
    return baseHandleVideoSelect(videoId, isOnline, setIsLoading, setMessages);
  };

  return {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    isOnline,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch: (query: string) => handleYouTubeSearch(query, isOnline),
    clearConversation
  };
}
