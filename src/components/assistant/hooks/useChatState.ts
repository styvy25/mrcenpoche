import { useEffect, useCallback, useRef, useState } from "react";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useMessageHandler } from "./useMessageHandler";
import { useOfflineMode } from "./useOfflineMode";
import { Message } from "../types/message";

export function useChatState() {
  const { 
    messages: initialMessages, 
    isLoading, 
    setIsLoading,
    handleSendMessage: baseHandleSendMessage, 
    clearConversation,
    initializeMessages,
    setMessages: setHandlerMessages
  } = useMessageHandler();
  
  const [messages, setMessages] = useState<Message[]>([]);
  
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

  // Ensure all messages have a timestamp that's a Date object
  const normalizeMessages = useCallback((msgs: Message[]) => {
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
  }, []);

  // Sync messages from messageHandler
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(normalizeMessages(initialMessages));
    }
  }, [initialMessages, normalizeMessages]);

  // Initialize messages from localStorage if available
  useEffect(() => {
    if (!hasInitialized.current) {
      initializeMessages();
      hasInitialized.current = true;
    }
  }, [initializeMessages]);
  
  // Save messages to localStorage whenever they change - with debounce
  useEffect(() => {
    if (messages.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      // Make sure all messages have proper timestamps before saving
      const normalizedMessages = normalizeMessages(messages);
      localStorage.setItem('mrc_chat_messages', JSON.stringify(normalizedMessages));
      
      // Update handler messages to keep things in sync
      setHandlerMessages(normalizedMessages);
    }, 500); // Add debounce to prevent excessive writes
    
    return () => clearTimeout(timeoutId);
  }, [messages, normalizeMessages, setHandlerMessages]);

  const handleSendMessage = useCallback(async (input: string): Promise<boolean> => {
    return await baseHandleSendMessage(input, isOnline);
  }, [baseHandleSendMessage, isOnline]);

  const handleVideoSelect = useCallback((videoId: string) => {
    return baseHandleVideoSelect(videoId);
  }, [baseHandleVideoSelect]);

  // Reset function that clears both local and handler states
  const resetConversation = useCallback(() => {
    clearConversation();
    setMessages([]);
  }, [clearConversation]);

  return {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    isOnline,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch,
    clearConversation: resetConversation
  };
}
