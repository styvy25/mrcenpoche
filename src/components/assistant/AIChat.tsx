
import { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { useChatState } from "./hooks/useChatState";
import { usePdfGenerator } from "./utils/pdfUtils";
import { Button } from "@/components/ui/button";
import { Key, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateProactiveMessage, generateContextualResponse, getFollowUpSuggestions } from "./services/proactiveAssistant";

const AIChat = memo(() => {
  const { 
    messages, 
    isLoading, 
    youtubeResults, 
    isSearchingYouTube, 
    isOnline: chatIsOnline,
    handleSendMessage, 
    handleVideoSelect 
  } = useChatState();
  
  const { generatePDF } = usePdfGenerator();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasApiKey, setHasApiKey] = useState(false);
  const proactiveTimerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  
  // Track user activity
  const updateLastActivity = () => {
    lastActivityRef.current = Date.now();
  };
  
  useEffect(() => {
    // Add event listeners to track user activity
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, updateLastActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateLastActivity);
      });
    };
  }, []);
  
  // Proactive assistant timer
  useEffect(() => {
    // Check for inactivity and send proactive messages
    const checkInactivity = () => {
      const inactivityThreshold = 60000; // 1 minute
      const now = Date.now();
      
      if (now - lastActivityRef.current > inactivityThreshold && !isLoading && messages.length > 0) {
        // Check if the last message was from the assistant
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'user') {
          // If the last message was from the user, send a contextual response
          const contextualResponse = generateContextualResponse(lastMessage.content);
          if (contextualResponse) {
            handleSendMessage('_internal_contextual_response_' + contextualResponse);
          }
        } else {
          // If the last message was from the assistant, send a proactive message
          const proactiveMessage = generateProactiveMessage();
          handleSendMessage('_internal_proactive_' + proactiveMessage);
        }
        lastActivityRef.current = now; // Reset the activity timer
      }
    };
    
    inactivityTimerRef.current = window.setInterval(checkInactivity, 30000); // Check every 30 seconds
    
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [messages, isLoading, handleSendMessage]);
  
  // Initial proactive message
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      // First message is the welcome message, wait 2 seconds and send a proactive message
      const timer = setTimeout(() => {
        const proactiveMessage = generateProactiveMessage();
        handleSendMessage('_internal_proactive_' + proactiveMessage);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [messages, handleSendMessage]);
  
  useEffect(() => {
    // Check if API keys are configured
    const checkApiKeys = () => {
      try {
        const savedKeys = localStorage.getItem("api_keys");
        if (savedKeys) {
          const keys = JSON.parse(savedKeys);
          setHasApiKey(Boolean(keys.perplexity));
        } else {
          setHasApiKey(false);
        }
      } catch (error) {
        console.error("Error checking API keys:", error);
        setHasApiKey(false);
      }
    };
    
    checkApiKeys();
    
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check again for API keys when window gains focus
    window.addEventListener('focus', checkApiKeys);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('focus', checkApiKeys);
    };
  }, []);
  
  const handleGoToSettings = () => {
    navigate('/settings');
  };
  
  const handleGeneratePDF = () => {
    generatePDF(messages);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl overflow-hidden border border-white/10 optimize-animation">
      {!isOnline && (
        <Alert variant="destructive" className="mx-4 mt-4 bg-amber-500/20 border-amber-500/30">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            Mode hors-ligne
          </AlertTitle>
          <AlertDescription>
            Vous êtes actuellement en mode hors-ligne. L'assistant utilise des réponses prédéfinies et précédemment mises en cache.
          </AlertDescription>
        </Alert>
      )}
      
      {isOnline && !hasApiKey && (
        <Alert variant="default" className="mx-4 mt-4 bg-blue-500/10 border-blue-500/20">
          <AlertTitle className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Configuration requise
          </AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Configurez votre clé API Perplexity pour activer toutes les fonctionnalités de l'assistant IA.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoToSettings}
              className="self-start mt-1"
            >
              <Key className="h-3 w-3 mr-1" />
              Configurer API
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <ChatHeader 
        onGeneratePDF={handleGeneratePDF} 
        isOnline={chatIsOnline}
      />
      
      <ChatContent
        messages={messages}
        youtubeResults={youtubeResults}
        isSearchingYouTube={isSearchingYouTube}
        isLoading={isLoading}
        onVideoSelect={handleVideoSelect}
      />
      
      <ChatInput 
        isLoading={isLoading} 
        onSendMessage={handleSendMessage} 
        onGeneratePDF={handleGeneratePDF} 
      />
    </div>
  );
});

AIChat.displayName = 'AIChat';

export default AIChat;
