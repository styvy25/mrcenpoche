
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { useChatState } from "./hooks/useChatState";
import { usePdfGenerator } from "./utils/pdfUtils";
import { Button } from "@/components/ui/button";
import { Key, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AIChat = () => {
  const { 
    messages, 
    isLoading, 
    youtubeResults, 
    isSearchingYouTube, 
    handleSendMessage, 
    handleVideoSelect 
  } = useChatState();
  
  const { generatePDF } = usePdfGenerator();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasApiKey, setHasApiKey] = useState(false);
  
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
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl overflow-hidden border border-white/10">
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
        isOnline={isOnline}
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
};

export default AIChat;
