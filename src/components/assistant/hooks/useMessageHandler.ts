
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";
import { supabase } from "@/integrations/supabase/client";
import { getPerplexityResponse } from "../services/perplexityService";
import { createMessage, normalizeMessages, loadMessagesFromStorage } from "@/utils/MessageUtils";
import { Feature, usePlanLimits } from "@/hooks/usePlanLimits";

export function useMessageHandler() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { hasFeatureAccess, incrementChatMessages } = usePlanLimits();

  // Initialize messages from localStorage if available
  const initializeMessages = useCallback(() => {
    try {
      const savedMessages = loadMessagesFromStorage();
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
        return;
      } 
      // If no valid messages found, set initial message
      setInitialMessage();
    } catch (error) {
      console.error('Error parsing saved messages:', error);
      setInitialMessage();
    }
  }, []);
  
  const setInitialMessage = useCallback(() => {
    const initialMessage = createMessage(
      "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?", 
      "assistant"
    );
    setMessages([initialMessage]);
  }, []);

  const handleRugbyRequest = useCallback(async (input: string): Promise<Message | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-xv', {
        body: { context: input }
      });

      if (error) throw error;

      return createMessage(data.composition, "assistant");
    } catch (error) {
      console.error('Error generating XV:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la composition d'équipe.",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const getApiKeys = useCallback((): { perplexity?: string, youtube?: string } => {
    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) return {};
      return JSON.parse(apiKeys);
    } catch (error) {
      console.error("Error parsing API keys:", error);
      return {};
    }
  }, []);

  const detectYoutubeIntent = useCallback((input: string): boolean => {
    const youtubeKeywords = ["vidéo", "video", "youtube", "regarder", "voir", "discours", "interview", "conférence", "média"];
    return youtubeKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
  }, []);

  const detectRugbyIntent = useCallback((input: string): boolean => {
    const rugbyKeywords = ["xv", "équipe", "composition", "rugby", "joueurs", "team"];
    return rugbyKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
  }, []);

  // Simple AI response generator without API key
  const getSimpleAIResponse = useCallback((query: string): string => {
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
  }, []);

  const handleSendMessage = useCallback(async (
    input: string, 
    isOnline: boolean = navigator.onLine
  ): Promise<boolean> => {
    if (!input.trim()) return false;
    
    // Check if user has access to chat feature
    if (!hasFeatureAccess(Feature.CHAT)) {
      toast({
        title: "Fonctionnalité premium",
        description: "Le chat est disponible avec un abonnement premium",
        variant: "destructive",
      });
      return false;
    }
    
    // Increment chat message count
    incrementChatMessages();
    
    // Add user message
    const userMessage = createMessage(input, "user");
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (!isOnline) {
      // In offline mode, we'll use the cached responses
      setTimeout(async () => {
        try {
          const offlineResponse = await getPerplexityResponse("", input); // Empty API key triggers offline mode
          
          const aiMessage = createMessage(offlineResponse, "assistant");
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
      
      return true;
    }

    try {
      const { perplexity, youtube } = getApiKeys();
      
      // Check if the message is about generating a rugby XV
      if (detectRugbyIntent(input)) {
        const rugbyResponse = await handleRugbyRequest(input);
        if (rugbyResponse) {
          setMessages(prev => [...prev, rugbyResponse]);
          setIsLoading(false);
          return true;
        }
      }

      try {
        let responseContent;
        if (perplexity) {
          responseContent = await getPerplexityResponse(perplexity, input);
        } else {
          responseContent = getSimpleAIResponse(input);
        }
        
        const aiMessage = createMessage(responseContent, "assistant");
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
    return true;
  }, [toast, hasFeatureAccess, incrementChatMessages, getSimpleAIResponse, detectRugbyIntent, detectYoutubeIntent, handleRugbyRequest, getApiKeys]);

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
