
import { useRef, useEffect, memo } from "react";
import MessageDisplay from "./MessageDisplay";
import LoadingIndicator from "./LoadingIndicator";
import YouTubeResults from "./YouTubeResults";
import { Message } from "./types/message";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

interface ChatContentProps {
  messages: Message[];
  youtubeResults: any[];
  isSearchingYouTube: boolean;
  isLoading: boolean;
  onVideoSelect: (videoId: string) => void;
}

const ChatContent = memo(({ 
  messages, 
  youtubeResults, 
  isSearchingYouTube, 
  isLoading, 
  onVideoSelect 
}: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Improved scroll handling with debounce for performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages, youtubeResults]);
  
  // Apply content stabilization to prevent layout jumps
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.minHeight = `${contentRef.current.offsetHeight}px`;
      return () => {
        if (contentRef.current) {
          contentRef.current.style.minHeight = '';
        }
      };
    }
  }, []);

  return (
    <div 
      ref={contentRef}
      className={`
        flex-1 overflow-y-auto space-y-4 
        bg-gradient-to-b from-gray-900/80 to-black/40 
        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
        ${isMobile ? 'p-2' : 'p-4'}
      `}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full opacity-70">
          <div className="text-center p-6 rounded-lg border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2`}>Assistant IA à votre service</h3>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
              Posez vos questions concernant le MRC, la politique, ou vos besoins de formation.
            </p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageDisplay 
            key={`message-${index}-${message.timestamp.getTime()}`} 
            message={message} 
          />
        ))
      )}
      
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
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
});

ChatContent.displayName = 'ChatContent';

export default ChatContent;
