
import { useState, useEffect, useCallback, useRef } from "react";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useMessageHandler } from "./useMessageHandler";
import { useOfflineMode } from "./useOfflineMode";
import { Message } from "@/types/message";
import { 
  normalizeMessages, 
  formatMessageTime, 
  formatLastSeen,
  saveMessagesToStorage 
} from "@/utils/MessageUtils";

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
  
  // Use a ref to track if we've already initialized messages
  const hasInitialized = useRef(false);

  // Initialize messages from localStorage if available
  useEffect(() => {
    if (!hasInitialized.current) {
      initializeMessages();
      hasInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save messages to localStorage whenever they change - with debounce
  useEffect(() => {
    if (messages.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      // Make sure all messages have proper timestamps before saving
      const normalizedMessages = normalizeMessages(messages);
      saveMessagesToStorage(normalizedMessages);
      
      // Update messages with normalized timestamps if needed
      if (JSON.stringify(messages) !== JSON.stringify(normalizedMessages)) {
        setMessages(normalizedMessages);
      }
    }, 500); // Add debounce to prevent excessive writes
    
    return () => clearTimeout(timeoutId);
  }, [messages, setMessages]);

  const handleSendMessage = useCallback((input: string) => {
    return baseHandleSendMessage(input, isOnline, (query) => handleYouTubeSearch(query, isOnline));
  }, [baseHandleSendMessage, isOnline, handleYouTubeSearch]);

  const handleVideoSelect = useCallback((videoId: string) => {
    return baseHandleVideoSelect(videoId, isOnline, setIsLoading, setMessages);
  }, [baseHandleVideoSelect, isOnline, setIsLoading, setMessages]);

  // Mock active users for demo
  const activeUsers = [
    { id: '1', name: 'Jean Doe', status: 'online', lastSeen: new Date(), avatar: '', isOnline: true },
    { id: '2', name: 'Pierre Smith', status: 'online', lastSeen: new Date(), avatar: '', isOnline: true },
    { id: '3', name: 'Marie Johnson', status: 'away', lastSeen: new Date(Date.now() - 30 * 60000), avatar: '', isOnline: false },
  ];

  // Chat settings
  const chatSettings = {
    isVisible: true,
    allowAttachments: true,
    allowVoiceMessages: true
  };

  return {
    messages: normalizeMessages(messages),
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    isOnline,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch: useCallback((query: string) => handleYouTubeSearch(query, isOnline), [handleYouTubeSearch, isOnline]),
    clearConversation,
    activeUsers,
    CURRENT_USER_ID: '1',
    formatTime: formatMessageTime,
    formatLastSeen,
    chatSettings
  };
}
