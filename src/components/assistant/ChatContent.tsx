
import { useRef, useEffect } from "react";
import MessageDisplay from "./MessageDisplay";
import LoadingIndicator from "./LoadingIndicator";
import YouTubeResults from "./YouTubeResults";
import { Message } from "./types/message";

interface ChatContentProps {
  messages: Message[];
  youtubeResults: any[];
  isSearchingYouTube: boolean;
  isLoading: boolean;
  onVideoSelect: (videoId: string) => void;
}

const ChatContent = ({ 
  messages, 
  youtubeResults, 
  isSearchingYouTube, 
  isLoading, 
  onVideoSelect 
}: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, youtubeResults]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/80 to-black/40">
      {messages.map((message, index) => (
        <MessageDisplay key={index} message={message} />
      ))}
      
      {youtubeResults.length > 0 && (
        <YouTubeResults videos={youtubeResults} onVideoSelect={onVideoSelect} />
      )}
      
      {isSearchingYouTube && (
        <div className="flex items-center gap-2 text-sm text-mrc-red">
          <LoadingIndicator />
          <span>Recherche de vidéos en cours...</span>
        </div>
      )}
      
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContent;
