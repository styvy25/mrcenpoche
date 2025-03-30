
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SendHorizonal, Image, Mic, Paperclip, Smile, Globe, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onOpenCamera?: () => void;
  onOpenAudio?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onOpenCamera,
  onOpenAudio,
  placeholder = "Tapez votre message...",
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript, 
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition();

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(prev => `${prev} ${transcript}`.trim());
    }
  }, [transcript]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      resetTranscript();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [message, disabled, onSendMessage, resetTranscript]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Auto-resize textarea
  const autoResizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, []);

  useEffect(() => {
    autoResizeTextarea();
  }, [message, autoResizeTextarea]);

  const handleAttachment = (type: string) => {
    toast({
      title: `${type} sélectionné`,
      description: `L'envoi de ${type.toLowerCase()} sera disponible prochainement`
    });
  };

  return (
    <div className="p-3 border-t bg-card flex items-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-accent hover:text-accent-foreground"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onOpenCamera && onOpenCamera()}>
            <Image className="h-4 w-4 mr-2" />
            Photo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAttachment("Document")}>
            <Globe className="h-4 w-4 mr-2" />
            Document
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAttachment("Localisation")}>
            <MapPin className="h-4 w-4 mr-2" />
            Localisation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-accent hover:text-accent-foreground"
        disabled={disabled}
        onClick={() => onOpenAudio && onOpenAudio()}
      >
        <Mic className="h-5 w-5" />
      </Button>
      
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-10 flex-1 resize-none rounded-md border bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={1}
      />
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-accent hover:text-accent-foreground"
        disabled={disabled}
      >
        <Smile className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        size="icon"
        className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        onClick={handleSendMessage}
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default React.memo(MessageInput);
