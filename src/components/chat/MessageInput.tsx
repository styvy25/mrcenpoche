
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Image, Mic, X } from "lucide-react";
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
    <div className="p-3 sm:p-4 border-t border-white/10 bg-gray-900/90 backdrop-blur-lg shadow-inner">
      {mediaBlob && (
        <div className="mb-3 p-2.5 bg-gray-800 rounded-lg flex items-center justify-between border border-white/10 shadow-inner">
          <div className="flex items-center gap-2">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
              mediaType === 'photo' ? 'bg-mrc-blue/20' : 'bg-mrc-green/20'
            }`}>
              {mediaType === 'photo' ? <Image size={18} className="text-mrc-blue" /> : <Mic size={18} className="text-mrc-green" />}
            </div>
            <span className="text-sm text-gray-300 font-medium">
              {mediaType === 'photo' ? 'Photo attachée' : 'Message vocal attaché'}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full h-8 w-8 p-0"
            onClick={() => {
              setMediaBlob(null);
              setMediaType(null);
            }}
          >
            <X size={16} />
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isRecording ? "Enregistrement en cours..." : "Écrivez votre message..."}
            className="bg-gray-800 border-white/10 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 rounded-full h-12 px-4 shadow-inner text-white"
            disabled={isRecording}
          />
          {newMessage.length > 0 && (
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white"
              onClick={() => setNewMessage("")}
            >
              <X size={14} />
              <span className="sr-only">Effacer</span>
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex space-x-1">
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
            className="h-12 w-12 rounded-full bg-gradient-to-r from-mrc-blue to-purple-600 hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="text-white" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
