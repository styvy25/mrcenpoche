
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Mic, MicOff, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ChatInput = ({ 
  onSendMessage, 
  isLoading, 
  placeholder = "Posez votre question..." 
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { canSendChatMessage, incrementChatMessages, getUsageStats } = usePlanLimits();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition();

  // Update message with transcription
  useEffect(() => {
    if (transcript) {
      setMessage(prev => prev + transcript);
    }
  }, [transcript]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      // Check if user can send a message
      if (!canSendChatMessage()) {
        setIsPremiumDialogOpen(true);
        return;
      }
      
      // Increment message counter
      const canSend = incrementChatMessages();
      if (!canSend) return;
      
      onSendMessage(trimmedMessage);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const stats = getUsageStats();
  const showBanner = stats.userPlan === 'free' && stats.chatMessagesToday > Math.max(1, Math.floor(stats.chatMessagesLimit * 0.7));

  return (
    <div className="w-full">
      {showBanner && (
        <PremiumBanner type="chat" className="mb-4" />
      )}
      
      <div className="relative flex w-full items-end rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm shadow-inner">
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          className="min-h-[50px] max-h-[200px] flex-1 resize-none border-0 bg-transparent p-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
          rows={1}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="flex items-center gap-1 p-2">
          {hasRecognitionSupport && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={`rounded-full transition-all ${isListening ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-700/50'}`}
              onClick={handleVoiceToggle}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            variant={message.trim() ? "default" : "ghost"}
            className={`rounded-full ${message.trim() ? 'bg-gradient-to-r from-mrc-blue to-mrc-green text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
          </Button>
        </div>
        
        {message.length > 100 && !isLoading && (
          <div className="absolute -top-7 right-2 text-xs text-gray-400 bg-gray-800/90 px-2 py-1 rounded">
            <Sparkles className="h-3 w-3 inline mr-1 text-yellow-500" />
            Message détaillé
          </div>
        )}
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </div>
  );
};

export default ChatInput;
