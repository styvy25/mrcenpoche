
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
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden border border-white/10">
      {!localStorage.getItem("api_keys") && (
        <div className="p-4">
          <APIKeyForm />
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
