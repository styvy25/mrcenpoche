
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SendHorizonal, Image, Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendMedia?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onSendMedia,
  placeholder = "Tapez votre message...",
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    }
  }, [message, disabled, onSendMessage, resetTranscript]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleAttachMedia = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendMedia) {
      onSendMedia(file);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onSendMedia]);

  const toggleRecording = useCallback(() => {
    if (isListening) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
      toast({
        title: "Enregistrement en cours",
        description: "Parlez clairement...",
      });
    }
  }, [isListening, stopListening, startListening, toast]);

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

  return (
    <div className="p-3 border-t bg-card flex items-end gap-2">
      {onSendMedia && (
        <>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-accent hover:text-accent-foreground"
            onClick={handleAttachMedia}
            disabled={disabled}
          >
            <Image className="h-5 w-5" />
          </Button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </>
      )}
      
      {browserSupportsSpeechRecognition && (
        <Button
          type="button"
          size="icon"
          variant={isRecording ? "default" : "ghost"}
          disabled={disabled}
          onClick={toggleRecording}
          className={`rounded-full ${
            isRecording
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}
      
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
        className="rounded-full bg-gradient-to-r from-mrc-blue to-purple-600 text-white"
        onClick={handleSendMessage}
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default React.memo(MessageInput);
