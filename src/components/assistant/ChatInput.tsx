
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSendMessage, isProcessing, placeholder = "Posez votre question..." }: ChatInputProps) => {
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

  // Mettre à jour le message avec la transcription
  useEffect(() => {
    if (transcript) {
      setMessage(prev => prev + transcript);
    }
  }, [transcript]);

  // Ajuster automatiquement la hauteur du textarea
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
    if (trimmedMessage && !isProcessing) {
      // Vérifier si l'utilisateur peut envoyer un message
      if (!canSendChatMessage()) {
        setIsPremiumDialogOpen(true);
        return;
      }
      
      // Incrémenter le compteur de messages
      const canSend = incrementChatMessages();
      if (!canSend) return;
      
      onSendMessage(trimmedMessage);
      setMessage('');
      
      // Réinitialiser la hauteur du textarea
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
      
      <div className="flex w-full items-end rounded-lg border bg-background shadow-sm">
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          className="min-h-[50px] max-h-[200px] flex-1 resize-none border-0 bg-transparent p-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
        <div className="flex items-center gap-1 p-1">
          {hasRecognitionSupport && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={`rounded-full ${isListening ? 'text-red-500' : ''}`}
              onClick={handleVoiceToggle}
              disabled={isProcessing}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            variant={message.trim() ? "default" : "ghost"}
            className="rounded-full"
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
          >
            {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </div>
  );
};

export default ChatInput;
