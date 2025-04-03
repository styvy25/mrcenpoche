
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "../types/message";
import { supabase } from "@/integrations/supabase/client";
import { getPerplexityResponse } from "../services/perplexityService";

export function useMessageHandler() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeMessages();
  }, []);

  // Initialize messages from localStorage if available
  const initializeMessages = () => {
    const savedMessages = localStorage.getItem('mrc_chat_messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        setInitialMessage();
      }
    } else {
      setInitialMessage();
    }
  };
  
  const setInitialMessage = () => {
    setMessages([{
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async (input: string, isOnline: boolean, handleYouTubeSearch: (query: string, isOnline: boolean) => Promise<void>) => {
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
        const offlineResponse = await getPerplexityResponse("", input); // Empty API key triggers offline mode
        
        const aiMessage: Message = {
          role: "assistant",
          content: offlineResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000); // Slight delay for better UX
      
      return;
    }

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
      
      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setInitialMessage();
  };

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
