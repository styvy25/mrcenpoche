
import { useState, useCallback } from 'react';
import { usePlanLimits } from '@/hooks/usePlanLimits';

// Mock chat message types
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UseChatStateReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
}

export const useChatState = (): UseChatStateReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { checkAndUseFeature } = usePlanLimits();

  const sendMessage = useCallback(async (content: string) => {
    try {
      // Check if user can use the AI chat feature
      const { canUse, remaining } = checkAndUseFeature('ai-chat');
      
      if (!canUse) {
        throw new Error(`Vous avez atteint votre limite de messages AI. Passez à Premium pour continuer.`);
      }
      
      setIsLoading(true);
      setError(null);
      
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content,
        role: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: `Voici une réponse à votre message: "${content}". Il vous reste ${remaining - 1} messages ce mois-ci.`,
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsLoading(false);
    }
  }, [checkAndUseFeature]);
  
  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat
  };
};
