import { useRef, useEffect, memo } from "react";
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

// Use memo to prevent unnecessary re-renders
const ChatContent = memo(({
  messages,
  youtubeResults,
  isSearchingYouTube,
  isLoading,
  onVideoSelect
}: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // Improved scroll handling with debounce for performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, youtubeResults]);

  // Apply content stabilization
  useEffect(() => {
    if (contentRef.current) {
      // Set a minimum height to prevent layout jumps when messages are loading
      contentRef.current.style.minHeight = `${contentRef.current.offsetHeight}px`;
      return () => {
        if (contentRef.current) {
          contentRef.current.style.minHeight = '';
        }
      };
    }
  }, []);
  return <div ref={contentRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/80 to-black/40 scrollable my-0">
      {messages.map((message, index) => <MessageDisplay key={`message-${index}-${message.timestamp.getTime()}`} message={message} />)}
      
      {youtubeResults.length > 0 && <YouTubeResults videos={youtubeResults} onVideoSelect={onVideoSelect} />}
      
      {isSearchingYouTube && <div className="flex items-center gap-2 text-sm text-mrc-red">
          <LoadingIndicator />
          <span>Recherche de vidéos en cours...</span>
        </div>}
      
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>;
});
ChatContent.displayName = 'ChatContent';
export default ChatContent;