
import React, { useState } from 'react';
import { SendHorizonal, Image, PaperclipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachMedia = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendMedia) {
      onSendMedia(file);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
      
      <Textarea
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

export default MessageInput;
