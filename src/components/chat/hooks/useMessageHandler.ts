
import { useState, useCallback } from 'react';
import { Message } from '@/types/message';
import { useToast } from '@/hooks/use-toast';

export function useMessageHandler() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Helper to generate a mock AI response
  const getAiResponse = useCallback((query: string): string => {
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

  // Handle sending messages
  const handleSendMessage = useCallback((
    input: string, 
    isOnline: boolean = true, 
    handleYouTubeSearch: ((query: string, isOnline: boolean) => Promise<void>) | null = null
  ) => {
    if (!input.trim()) return false;
    
    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Check if the user is asking for YouTube videos
    if (input.toLowerCase().includes('vidéo') || 
        input.toLowerCase().includes('video') || 
        input.toLowerCase().includes('youtube')) {
      // Extract search terms (remove words like "video", "youtube", etc.)
      const searchTerms = input
        .toLowerCase()
        .replace(/vidéo|video|youtube|cherche|trouve|recherche|montre/g, '')
        .trim();
      
      if (handleYouTubeSearch) {
        handleYouTubeSearch(searchTerms, isOnline);
      }
    }
    
    // Regular message response with delay for better UX
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai_${Date.now()}`,
        content: getAiResponse(input),
        sender: 'ai',
        timestamp: new Date(),
        text: getAiResponse(input)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
    
    return true;
  }, [getAiResponse]);
  
  // Initialize conversation with a welcome message
  const clearConversation = useCallback(() => {
    const welcomeMessage: Message = {
      id: 'welcome_1',
      content: "Bonjour ! Je suis votre assistant MRC. Comment puis-je vous aider aujourd'hui ?",
      sender: "ai",
      timestamp: new Date(),
      text: "Bonjour ! Je suis votre assistant MRC. Comment puis-je vous aider aujourd'hui ?"
    };
    
    setMessages([welcomeMessage]);
  }, []);

  // Load messages from localStorage or initialize with welcome message
  const initializeMessages = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem('mrc_chat_messages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Ensure all timestamps are Date objects
        const normalizedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(normalizedMessages);
      } else {
        clearConversation();
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      clearConversation();
      
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les messages précédents.",
        variant: "destructive"
      });
    }
  }, [clearConversation, toast]);

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
