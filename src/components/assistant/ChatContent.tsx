
import React, { useEffect, useRef } from 'react';
import { Message } from './types/message';
import LoadingIndicator from './LoadingIndicator';
import YouTubeResults from './YouTubeResults';
import { FileDown, Sparkles, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FuturisticMessage from './FuturisticMessage';
import AmazonBooksAd from './ads/AmazonBooksAd';
import { motion } from 'framer-motion';

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

  // Détermine si une pub doit être affichée après un message (après chaque 3ème message)
  const shouldShowAdAfterMessage = (index: number) => {
    return (index + 1) % 3 === 0 && index !== messages.length - 1;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <motion.div 
            className="text-center max-w-md p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-mrc-blue via-purple-600 to-mrc-green p-0.5"
              animate={{ 
                boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-full">
                <Sparkles className="w-8 h-8 text-mrc-blue" />
              </div>
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-mrc-red via-mrc-blue to-mrc-green bg-clip-text text-transparent">
              Bienvenue chez Styvy237
            </h3>
            <p className="text-gray-400 mb-4">
              Je suis votre assistant IA dédié à la formation du MRC. Comment puis-je vous aider aujourd'hui ?
            </p>
            
            <motion.div 
              className="grid grid-cols-1 gap-2 text-sm"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                "Explique-moi les principaux objectifs du MRC",
                "Quelles sont les dernières actualités concernant le MRC ?",
                "Comment puis-je m'impliquer davantage dans le mouvement ?",
                "Trouve-moi des vidéos sur Maurice Kamto"
              ].map((suggestion, index) => (
                <motion.button 
                  key={index}
                  className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 text-left transition flex items-center group"
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <MessageSquare className="h-3.5 w-3.5 mr-2 flex-shrink-0 text-mrc-blue" />
                  <span>{suggestion}</span>
                  <Star className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-mrc-green" />
                </motion.button>
              ))}
            </motion.div>
            
            <div className="mt-6">
              <AmazonBooksAd compact={true} className="mt-6" />
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <FuturisticMessage message={message} index={index} />
              
              {shouldShowAdAfterMessage(index) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AmazonBooksAd className="my-6" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
          
          {youtubeResults && youtubeResults.length > 0 && (
            <YouTubeResults 
              results={youtubeResults} 
              isLoading={isSearchingYouTube}
              onSelect={onVideoSelect}
              downloadLinks={downloadLinks}
            />
          )}
          
          {downloadLinks && (
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 mt-4">
              <h3 className="text-lg font-medium mb-2">Liens de téléchargement</h3>
              <p className="text-gray-400 text-sm mb-3">Utilisez ces services pour télécharger la vidéo:</p>
              <div className="flex flex-wrap gap-2">
                {downloadLinks.downloadServices && downloadLinks.downloadServices.map((service: any, idx: number) => (
                  <Button 
                    key={idx}
                    variant="outline" 
                    size="sm" 
                    className="flex items-center bg-gray-800/80 hover:bg-gray-700"
                    onClick={() => window.open(service.url, '_blank')}
                  >
                    <FileDown className="h-4 w-4 mr-1" /> {service.name}
                  </Button>
                ))}
                {downloadLinks.watchUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center bg-gray-800/80 hover:bg-gray-700"
                    onClick={() => window.open(downloadLinks.watchUrl, '_blank')}
                  >
                    Voir sur YouTube
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {isLoading && <LoadingIndicator />}
          
          {/* Publicité en fin de conversation */}
          {messages.length >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <AmazonBooksAd />
            </motion.div>
          )}
          
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
};

export default ChatContent;
