
import { useState, useCallback } from 'react';

export function useMessageHandler() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Refactored: Extracted message response handling into a separate function
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

  // Refactored: handleSendMessage with clearer responsibilities
  const handleSendMessage = useCallback((input: string, isOnline: boolean = true, handleYouTubeSearch: any = null) => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Check if the user is asking for YouTube videos
    if (input.toLowerCase().includes('vidéo') || input.toLowerCase().includes('video') || input.toLowerCase().includes('youtube')) {
      // Extract search terms (remove words like "video", "youtube", etc.)
      const searchTerms = input
        .toLowerCase()
        .replace(/vidéo|video|youtube|cherche|trouve|recherche|montre/g, '')
        .trim();
      
      if (handleYouTubeSearch) {
        handleYouTubeSearch(searchTerms, isOnline);
      }
    }
    
    // Regular message response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: getAiResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
    
    return true;
  }, [messages, getAiResponse]);
  
  // Refactored: Extracted conversation management into separate functions
  const clearConversation = useCallback(() => {
    setMessages([{
      id: 1,
      content: "Bonjour ! Je suis votre assistant MRC. Comment puis-je vous aider aujourd'hui ?",
      sender: "ai",
      timestamp: new Date()
    }]);
  }, []);

  const initializeMessages = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem('mrc_chat_messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        clearConversation();
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      clearConversation();
    }
  }, [clearConversation]);

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
