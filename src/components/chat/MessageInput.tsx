
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
    <div className="p-3 border-t bg-gradient-to-r from-gray-900 to-gray-800 flex items-end gap-2 rounded-b-lg backdrop-blur-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
          <DropdownMenuItem 
            onClick={() => onOpenCamera && onOpenCamera()}
            className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer"
          >
            <Image className="h-4 w-4 mr-2 text-blue-400" />
            Photo
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleAttachment("Document")}
            className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer"
          >
            <Globe className="h-4 w-4 mr-2 text-green-400" />
            Document
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleAttachment("Localisation")}
            className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer"
          >
            <MapPin className="h-4 w-4 mr-2 text-red-400" />
            Localisation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className={`rounded-full ${isRecording ? 'bg-red-600/20 text-red-400' : 'hover:bg-blue-500/20 hover:text-blue-400'} transition-colors`}
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
        className="min-h-10 flex-1 resize-none rounded-md border bg-gray-800/50 border-gray-700 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 text-white placeholder:text-gray-400"
        rows={1}
      />
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
        disabled={disabled}
      >
        <Smile className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        size="icon"
        className={`rounded-full ${!message.trim() ? 'bg-gray-700 text-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white transition-all hover:shadow-lg hover:shadow-blue-500/20`}
        onClick={handleSendMessage}
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default React.memo(MessageInput);
