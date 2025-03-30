
import { useRef, useEffect, memo, useState } from "react";
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

const ChatContent = memo(({ 
  messages, 
  youtubeResults, 
  isSearchingYouTube, 
  isLoading, 
  onVideoSelect 
}: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [renderedMessages, setRenderedMessages] = useState<Message[]>([]);

  // Improved message rendering with batches for better performance
  useEffect(() => {
    if (messages.length === 0) {
      setRenderedMessages([]);
      return;
    }

    // If the difference is small, just update directly
    if (Math.abs(messages.length - renderedMessages.length) <= 2) {
      setRenderedMessages(messages);
      return;
    }

    // For larger differences, batch render messages
    const renderBatch = async () => {
      // Render initial batch immediately
      setRenderedMessages(messages.slice(0, Math.min(5, messages.length)));
      
      // If there are more messages, render them in batches
      if (messages.length > 5) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setRenderedMessages(messages);
      }
    };
    
    renderBatch();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  // Improved scroll handling with debounce for performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [renderedMessages, youtubeResults]);

  return (
    <div 
      ref={contentRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/80 dark:from-gray-900/80 to-white/40 dark:to-black/40 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
    >
      {renderedMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full opacity-70">
          <div className="text-center p-8 rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-2">Assistant IA à votre service</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Posez vos questions concernant le MRC, la politique, ou vos besoins de formation.
            </p>
          </div>
        </div>
      ) : (
        renderedMessages.map((message, index) => (
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
