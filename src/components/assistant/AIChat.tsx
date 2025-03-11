
import { useState } from "react";
import { APIKeyForm } from "../settings/APIKeyForm";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { useChatState } from "./hooks/useChatState";
import { usePdfGenerator } from "./utils/pdfUtils";

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
  
  const handleGeneratePDF = () => {
    generatePDF(messages);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl overflow-hidden border border-white/10">
      {!localStorage.getItem("api_keys") && (
        <div className="p-4 bg-black/40 backdrop-blur-sm">
          <APIKeyForm 
            serviceKey="perplexity-api-key"
            serviceLabel="Clé API Perplexity"
            serviceDescription="Entrez votre clé API Perplexity pour activer les fonctionnalités d'assistant IA."
          />
        </div>
      )}
      
      <ChatHeader onGeneratePDF={handleGeneratePDF} />
      
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
