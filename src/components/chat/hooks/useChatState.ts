
import { useState, useEffect, useCallback, useRef } from "react";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useMessageHandler } from "./useMessageHandler";
import { useOfflineMode } from "./useOfflineMode";
import { Message } from "@/types/message";

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

  // Ensure all messages have a timestamp that's a Date object
  const normalizeMessages = useCallback((msgs: Message[]) => {
    return msgs.map(msg => {
      if (msg.timestamp && typeof msg.timestamp === 'string') {
        return {
          ...msg,
          timestamp: new Date(msg.timestamp),
          sender: msg.sender || (msg.role === 'assistant' ? 'ai' : 'user')
        };
      } else if (!msg.timestamp) {
        return {
          ...msg,
          timestamp: new Date(),
          sender: msg.sender || (msg.role === 'assistant' ? 'ai' : 'user')
        };
      }
      return {
        ...msg,
        sender: msg.sender || (msg.role === 'assistant' ? 'ai' : 'user')
      };
    });
  }, []);

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
      localStorage.setItem('mrc_chat_messages', JSON.stringify(normalizedMessages));
      
      // Update messages with normalized timestamps if needed
      if (JSON.stringify(messages) !== JSON.stringify(normalizedMessages)) {
        setMessages(normalizedMessages);
      }
    }, 500); // Add debounce to prevent excessive writes
    
    return () => clearTimeout(timeoutId);
  }, [messages, normalizeMessages, setMessages]);

  const handleSendMessage = useCallback((input: string) => {
    return baseHandleSendMessage(input, isOnline, handleYouTubeSearch);
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

  // Helper functions for time formatting
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'à l\'instant';
    if (minutes < 60) return `il y a ${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;
    
    return date.toLocaleDateString('fr-FR');
  };

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
    formatTime,
    formatLastSeen,
    chatSettings
  };
}
