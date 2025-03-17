
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "../types/message";
import { supabase } from "@/integrations/supabase/client";
import { getPerplexityResponse } from "../services/perplexityService";
import { generateContextualResponse, getFollowUpSuggestions } from "../services/proactiveAssistant";

export function useMessageHandler() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize messages from localStorage if available
  const initializeMessages = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem('mrc_chat_messages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
          return;
        }
      } 
      // If no valid messages found, set initial message
      setInitialMessage();
    } catch (error) {
      console.error('Error parsing saved messages:', error);
      setInitialMessage();
    }
  }, []);
  
  const setInitialMessage = useCallback(() => {
    setMessages([{
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }]);
  }, []);

  const handleSendMessage = useCallback(async (input: string, isOnline: boolean, handleYouTubeSearch: (query: string, isOnline: boolean) => Promise<void>) => {
    // Handle internal proactive messages
    if (input.startsWith('_internal_proactive_')) {
      const proactiveMessage = input.replace('_internal_proactive_', '');
      const aiMessage: Message = {
        role: "assistant",
        content: proactiveMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      return;
    }
    
    // Handle internal contextual responses
    if (input.startsWith('_internal_contextual_response_')) {
      const contextualResponse = input.replace('_internal_contextual_response_', '');
      const aiMessage: Message = {
        role: "assistant",
        content: contextualResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      return;
    }
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (!isOnline) {
      // In offline mode, we'll use the cached responses
      setTimeout(async () => {
        try {
          const offlineResponse = await getPerplexityResponse("", input); // Empty API key triggers offline mode
          
          // Add follow-up suggestions in offline mode
          const followUpSuggestions = getFollowUpSuggestions();
          const randomSuggestions = followUpSuggestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);
          
          const suggestionText = randomSuggestions.length > 0 
            ? "\n\nVous pourriez aussi me demander:\n- " + randomSuggestions.join("\n- ")
            : "";
          
          const aiMessage: Message = {
            role: "assistant",
            content: offlineResponse + suggestionText,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          toast({
            title: "Erreur en mode hors-ligne",
            description: "Impossible de générer une réponse en mode hors-ligne.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, 1000); // Slight delay for better UX
      
      return;
    }

    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Configuration requise",
          description: "Veuillez d'abord configurer vos clés API.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { perplexity, youtube } = JSON.parse(apiKeys);
      
      // Check if the message is about generating a rugby XV
      const rugbyKeywords = ["xv", "équipe", "composition", "rugby", "joueurs", "team"];
      const isRugbyRequest = rugbyKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
      
      if (isRugbyRequest) {
        try {
          const { data, error } = await supabase.functions.invoke('generate-xv', {
            body: { context: input }
          });

          if (error) throw error;

          const aiMessage: Message = {
            role: "assistant",
            content: data.composition,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('Error generating XV:', error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la génération de la composition d'équipe.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
        return;
      }

      const youtubeKeywords = ["vidéo", "video", "youtube", "regarder", "voir", "discours", "interview", "conférence", "média"];
      const hasYoutubeIntent = youtubeKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
      
      if (hasYoutubeIntent && youtube) {
        const searchTerms = input.replace(/vidéo|video|youtube|regarder|voir|discours|interview|conférence|média/gi, '').trim();
        await handleYouTubeSearch(searchTerms || "MRC Cameroun", isOnline);
      }

      try {
        const responseContent = await getPerplexityResponse(perplexity, input);
        
        // Add follow-up suggestions
        const shouldAddSuggestions = Math.random() < 0.7; // 70% chance to add suggestions
        
        const followUpSuggestions = getFollowUpSuggestions();
        const randomSuggestions = followUpSuggestions
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        
        const suggestionText = shouldAddSuggestions && randomSuggestions.length > 0 
          ? "\n\nVous pourriez aussi me demander:\n- " + randomSuggestions.join("\n- ")
          : "";
        
        const aiMessage: Message = {
          role: "assistant",
          content: responseContent + suggestionText,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la communication avec l'assistant.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearConversation = useCallback(() => {
    setInitialMessage();
  }, [setInitialMessage]);

  return {
    messages,
    isLoading,
    setIsLoading,
    handleSendMessage,
    clearConversation,
    initializeMessages,
    setMessages
  };
}
