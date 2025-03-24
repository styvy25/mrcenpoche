
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip } from "lucide-react";
import MediaCapture from "./MediaCapture";

interface MessageInputProps {
  onSendMessage: (content: string, mediaBlob?: Blob, mediaType?: 'photo' | 'audio') => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !mediaBlob) return;
    
    onSendMessage(newMessage, mediaBlob || undefined, mediaType || undefined);
    setNewMessage("");
    setMediaBlob(null);
    setMediaType(null);
  };

  const handleMediaCapture = (blob: Blob, type: 'photo' | 'audio') => {
    setMediaBlob(blob);
    setMediaType(type);
  };

  return (
    <div className="p-2 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg">
      {mediaBlob && (
        <div className="mb-2 p-2 bg-gray-800/70 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded flex items-center justify-center ${
              mediaType === 'photo' ? 'bg-mrc-blue/20' : 'bg-mrc-green/20'
            }`}>
              {mediaType === 'photo' ? '📷' : '🎤'}
            </div>
            <span className="text-sm text-gray-300">
              {mediaType === 'photo' ? 'Photo attachée' : 'Message vocal attaché'}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => {
              setMediaBlob(null);
              setMediaType(null);
            }}
          >
            Supprimer
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2">
        <div className="flex items-center gap-1">
          <MediaCapture onCapture={handleMediaCapture} type="photo" />
          <MediaCapture onCapture={handleMediaCapture} type="audio" />
        </div>
        
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 rounded-full h-10 px-4"
        />
        
        <Button 
          type="submit" 
          size="icon"
          disabled={!newMessage.trim() && !mediaBlob}
          className="h-10 w-10 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
          <span className="sr-only">Envoyer</span>
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
