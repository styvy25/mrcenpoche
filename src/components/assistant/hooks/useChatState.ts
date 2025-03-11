
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

  // Ensure all messages have a timestamp that's a Date object
  const normalizeMessages = (msgs) => {
    return msgs.map(msg => {
      if (msg.timestamp && typeof msg.timestamp === 'string') {
        return {
          ...msg,
          timestamp: new Date(msg.timestamp)
        };
      } else if (!msg.timestamp) {
        return {
          ...msg,
          timestamp: new Date()
        };
      }
      return msg;
    });
  };

  // Initialize messages from localStorage if available
  useEffect(() => {
    initializeMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      // Make sure all messages have proper timestamps before saving
      const normalizedMessages = normalizeMessages(messages);
      localStorage.setItem('mrc_chat_messages', JSON.stringify(normalizedMessages));
      
      // Update messages with normalized timestamps
      if (JSON.stringify(messages) !== JSON.stringify(normalizedMessages)) {
        setMessages(normalizedMessages);
      }
    }
  }, [messages, setMessages]);

  const handleSendMessage = (input: string) => {
    return baseHandleSendMessage(input, isOnline, handleYouTubeSearch);
  };

  const handleVideoSelect = (videoId: string) => {
    return baseHandleVideoSelect(videoId, isOnline, setIsLoading, setMessages);
  };

  return {
    messages: normalizeMessages(messages),
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
