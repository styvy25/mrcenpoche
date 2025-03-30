
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "../types/message";
import { supabase } from "@/integrations/supabase/client";
import { getPerplexityResponse } from "../services/perplexityService";
import { v4 as uuidv4 } from "uuid";

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
      id: uuidv4(),
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date(),
      text: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?"
    }]);
  }, []);

  const handleSendMessage = useCallback(async (input: string, isOnline: boolean, handleYouTubeSearch: (query: string, isOnline: boolean) => Promise<void>) => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (!isOnline) {
      // In offline mode, we'll use the cached responses
      setTimeout(async () => {
        try {
          const offlineResponse = await getPerplexityResponse("", input); // Empty API key triggers offline mode
          
          const aiMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: offlineResponse,
            timestamp: new Date(),
            text: offlineResponse
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
        // If no API keys, generate a simple response
        setTimeout(() => {
          const simpleResponse: Message = {
            id: uuidv4(),
            role: "assistant",
            content: getSimpleAIResponse(input),
            timestamp: new Date(),
            text: getSimpleAIResponse(input)
          };
          
          setMessages(prev => [...prev, simpleResponse]);
          setIsLoading(false);
        }, 1000);
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
            id: uuidv4(),
            role: "assistant",
            content: data.composition,
            timestamp: new Date(),
            text: data.composition
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
        let responseContent;
        if (perplexity) {
          responseContent = await getPerplexityResponse(perplexity, input);
        } else {
          responseContent = getSimpleAIResponse(input);
        }
        
        const aiMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: responseContent,
          timestamp: new Date(),
          text: responseContent
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

  // Simple AI response generator without API key
  const getSimpleAIResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mrc')) {
      return "Le MRC (Mouvement pour la Renaissance du Cameroun) est un parti politique camerounais fondé en 2012. Son président est Maurice Kamto. Le parti prône des valeurs démocratiques et une meilleure gouvernance pour le Cameroun.";
    }
    
    if (lowercaseQuery.includes('kamto')) {
      return "Maurice Kamto est un homme politique camerounais, président du MRC et ancien candidat à l'élection présidentielle de 2018. Il est également juriste international et a été ministre délégué à la Justice du Cameroun de 2004 à 2011.";
    }
    
    if (lowercaseQuery.includes('cameroun')) {
      return "Le Cameroun est un pays d'Afrique centrale. Sa capitale politique est Yaoundé et sa capitale économique est Douala. Le pays fait face à divers défis politiques et économiques, avec plusieurs partis politiques actifs dont le MRC.";
    }
    
    if (lowercaseQuery.includes('bonjour') || lowercaseQuery.includes('salut') || lowercaseQuery.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui concernant le MRC ou les actualités du Cameroun ?";
    }
    
    return "Je n'ai pas d'information spécifique sur ce sujet. Pourriez-vous préciser votre question concernant le MRC ou le Cameroun ? Je peux aussi rechercher des vidéos YouTube pour vous si vous le souhaitez.";
  };

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
