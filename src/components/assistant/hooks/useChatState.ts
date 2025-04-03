
import { useState, useCallback } from 'react';
import { Message } from '../types/message';
import { usePlanLimits } from '@/hooks/usePlanLimits';

export interface UseChatStateReturn {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useChatState = (): UseChatStateReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const planLimits = usePlanLimits();

  const addMessage = useCallback((message: Message) => {
    if (message.role === 'user') {
      // Use this for tracking usage limits if implemented
      try {
        planLimits.checkUsageQuota?.('chat_messages');
      } catch (error) {
        console.error('Error checking usage quota:', error);
      }
    }
    
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [planLimits]);

  const updateLastMessage = useCallback((content: string) => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) return prevMessages;
      
      const newMessages = [...prevMessages];
      newMessages[newMessages.length - 1] = {
        ...newMessages[newMessages.length - 1],
        content
      };
      
      return newMessages;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    updateLastMessage,
    clearMessages,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};

export default useChatState;
