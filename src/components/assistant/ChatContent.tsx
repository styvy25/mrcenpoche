
import React, { useEffect, useRef } from 'react';
import { Message } from './types/message';
import MessageDisplay from './MessageDisplay';
import LoadingIndicator from './LoadingIndicator';
import YouTubeResults from './YouTubeResults';

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  youtubeResults: any[];
  isSearchingYouTube: boolean;
  onVideoSelect: (videoId: string) => void;
  downloadLinks?: any;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoading,
  youtubeResults,
  isSearchingYouTube,
  onVideoSelect,
  downloadLinks
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, youtubeResults]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-md p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-mrc-red via-mrc-blue to-mrc-green bg-clip-text text-transparent">
              Bienvenue chez Styvy237
            </h3>
            <p className="text-gray-400 mb-4">
              Je suis votre assistant IA dédié à la formation du MRC. Comment puis-je vous aider aujourd'hui ?
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <button className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 text-left transition">
                "Explique-moi les principaux objectifs du MRC"
              </button>
              <button className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 text-left transition">
                "Quelles sont les dernières actualités concernant le MRC ?"
              </button>
              <button className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 text-left transition">
                "Comment puis-je m'impliquer davantage dans le mouvement ?"
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageDisplay key={index} message={message} />
          ))}
          
          {youtubeResults.length > 0 && (
            <YouTubeResults 
              results={youtubeResults} 
              isLoading={isSearchingYouTube}
              onSelect={onVideoSelect}
              downloadLinks={downloadLinks}
            />
          )}
          
          {isLoading && <LoadingIndicator />}
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
};

export default ChatContent;
