
import { useState, useEffect, useCallback, useRef } from "react";
import { useYouTubeSearch } from "./useYouTubeSearch";
import { useMessageHandler } from "./useMessageHandler";
import { useOfflineMode } from "./useOfflineMode";
import { Message } from "@/types/message";

export function useChatState() {
  const { 
    messages: handlerMessages, 
    isLoading, 
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

  // Sync messages from messageHandler
  useEffect(() => {
    if (handlerMessages.length > 0) {
      const normalizedMessages = handlerMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp),
        type: msg.type || "text",
        senderId: msg.senderId || "user",
        content: msg.content || ""
      }));
      setMessages(normalizedMessages);
    }
  }, [handlerMessages]);

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
      const normalizedMessages = messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
      }));
      
      localStorage.setItem('mrc_chat_messages', JSON.stringify(normalizedMessages));
      
      // Update messages with normalized timestamps if needed
      if (JSON.stringify(messages) !== JSON.stringify(normalizedMessages)) {
        setHandlerMessages(normalizedMessages);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [messages, setHandlerMessages]);

  const handleSendMessage = useCallback((input: string) => {
    return baseHandleSendMessage(input);
  }, [baseHandleSendMessage]);

  const handleVideoSelect = useCallback((videoId: string) => {
    return baseHandleVideoSelect(videoId);
  }, [baseHandleVideoSelect]);

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
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    isOnline,
    handleSendMessage,
    handleVideoSelect,
    handleYouTubeSearch,
    clearConversation,
    activeUsers,
    CURRENT_USER_ID: '1',
    formatTime: (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    formatLastSeen: (date: Date) => {
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      if (diffMinutes < 1) return 'just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString();
    },
    chatSettings
  };
}
