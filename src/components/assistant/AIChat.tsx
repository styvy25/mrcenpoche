
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { useChatState } from "./hooks/useChatState";
import { usePdfGenerator } from "./utils/pdfUtils";
import OfflineAlert from "./alerts/OfflineAlert";
import ConfigurationAlert from "./alerts/ConfigurationAlert";
import InteractiveBackground from "./backgrounds/InteractiveBackground";

const AIChat = () => {
  const { 
    messages, 
    isLoading, 
    youtubeResults, 
    isSearchingYouTube,
    downloadLinks,
    handleSendMessage, 
    handleVideoSelect,
    handleClearMessages
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
          setHasApiKey(Boolean(keys?.perplexity));
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
    if (messages.length > 0) {
      generatePDF(messages);
    }
  };

  return (
    <div 
      className="relative flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl overflow-hidden border border-white/10"
    >
      <InteractiveBackground isLoading={isLoading} messagesLength={messages.length} />
      
      {!isOnline && <OfflineAlert />}
      
      {isOnline && !hasApiKey && (
        <ConfigurationAlert onConfigureClick={handleGoToSettings} />
      )}
      
      <ChatHeader 
        onGeneratePDF={handleGeneratePDF} 
        onClearChat={handleClearMessages}
        isOnline={isOnline}
      />
      
      <ChatContent
        messages={messages}
        youtubeResults={youtubeResults}
        isSearchingYouTube={isSearchingYouTube}
        isLoading={isLoading}
        onVideoSelect={handleVideoSelect}
        downloadLinks={downloadLinks}
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
