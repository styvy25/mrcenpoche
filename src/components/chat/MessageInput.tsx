
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile, Image, Mic } from "lucide-react";
import MediaCapture from "./MediaCapture";

interface MessageInputProps {
  onSendMessage: (content: string, mediaBlob?: Blob, mediaType?: 'photo' | 'audio') => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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
    setIsRecording(false);
  };

  return (
    <div className="p-3 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg">
      {mediaBlob && (
        <div className="mb-3 p-2 bg-gray-800/70 rounded-md flex items-center justify-between border border-white/10 shadow-inner">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded flex items-center justify-center ${
              mediaType === 'photo' ? 'bg-mrc-blue/20' : 'bg-mrc-green/20'
            }`}>
              {mediaType === 'photo' ? <Image size={18} className="text-mrc-blue" /> : <Mic size={18} className="text-mrc-green" />}
            </div>
            <span className="text-sm text-gray-300">
              {mediaType === 'photo' ? 'Photo attachée' : 'Message vocal attaché'}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            onClick={() => {
              setMediaBlob(null);
              setMediaType(null);
            }}
          >
            Supprimer
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isRecording ? "Enregistrement en cours..." : "Écrivez votre message..."}
            className="bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 rounded-full h-11 px-4 shadow-inner"
            disabled={isRecording}
          />
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex">
            <MediaCapture 
              onCapture={handleMediaCapture} 
              type="photo" 
              onRecordingStateChange={(recording) => setIsRecording(recording)}
            />
            <MediaCapture 
              onCapture={handleMediaCapture} 
              type="audio" 
              onRecordingStateChange={(recording) => setIsRecording(recording)}
            />
          </div>
          
          <Button 
            type="submit" 
            size="icon"
            disabled={(!newMessage.trim() && !mediaBlob) || isRecording}
            className="h-11 w-11 rounded-full bg-gradient-to-r from-mrc-blue to-purple-600 hover:opacity-90 transition-all shadow-md"
          >
            <Send size={18} />
            <span className="sr-only">Envoyer</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
