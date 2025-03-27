
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, PaperclipIcon, Mic, MicOff, Image } from "lucide-react";
import MediaCapture from "./MediaCapture";

interface MessageInputProps {
  onSendMessage: (content: string, mediaBlob?: Blob, mediaType?: 'photo' | 'audio') => Promise<any>;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMediaCaptureOpen, setIsMediaCaptureOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      await onSendMessage(message);
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMediaCapture = async (mediaBlob: Blob, mediaType: 'photo' | 'audio') => {
    try {
      await onSendMessage("", mediaBlob, mediaType);
      setIsMediaCaptureOpen(false);
    } catch (error) {
      console.error("Error sending media:", error);
    }
  };

  return (
    <div className="p-3 bg-gray-900/80 border-t border-gray-700/50 backdrop-blur-sm">
      {isMediaCaptureOpen ? (
        <MediaCapture 
          onCancel={() => setIsMediaCaptureOpen(false)}
          onCapture={handleMediaCapture}
        />
      ) : (
        <div className="flex gap-2 items-end">
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMediaCaptureOpen(true)}
              className="rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            >
              <Image className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className={`rounded-full ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'} hover:bg-gray-700/50`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
          
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez un message..."
            className="resize-none bg-gray-800 border-gray-700 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[44px] max-h-[120px] placeholder:text-gray-500"
            rows={1}
          />
          
          <Button
            type="button"
            variant={message.trim() ? "default" : "ghost"}
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`rounded-full transition-all ${message.trim() ? 'bg-mrc-blue text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}`}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
