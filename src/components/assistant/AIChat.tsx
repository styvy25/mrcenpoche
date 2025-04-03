
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import YouTubeResults from './YouTubeResults';
import { useChatState } from './hooks/useChatState';
import AITypingIndicator from './AITypingIndicator';

const AIChat: React.FC = () => {
  const {
    messages,
    isLoading,
    youtubeResults,
    isSearchingYouTube,
    downloadLinks,
    handleSendMessage,
    handleClearMessages,
    handleVideoSelect
  } = useChatState();

  // Function to handle PDF generation (empty for now)
  const handleGeneratePDF = () => {
    console.log("Generate PDF functionality");
    // PDF generation logic would go here
  };

  return (
    <Card className="relative h-full flex flex-col overflow-hidden bg-gray-950 border-gray-800">
      <CardContent className="flex-grow p-0 flex flex-col h-full overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <ChatHistory 
            messages={messages} 
            onClear={handleClearMessages} 
          />

          {(youtubeResults && youtubeResults.length > 0) && (
            <YouTubeResults 
              results={youtubeResults} 
              isLoading={isSearchingYouTube}
              onSelect={handleVideoSelect}
              downloadLinks={downloadLinks}
            />
          )}

          {isLoading && (
            <div className="px-4 py-2 rounded-lg bg-gray-800/50 dark:text-white w-fit">
              <AITypingIndicator />
            </div>
          )}
        </div>

        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          onGeneratePDF={handleGeneratePDF} 
        />
      </CardContent>
    </Card>
  );
};

export default AIChat;
