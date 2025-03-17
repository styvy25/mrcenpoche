import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Mic } from "lucide-react";
interface MessageInputProps {
  onSendMessage: (content: string) => void;
}
const MessageInput = ({
  onSendMessage
}: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  // Simuler la reconnaissance vocale (non fonctionnelle dans cette version)
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simuler un enregistrement et sa fin après 3 secondes
      setTimeout(() => {
        setIsRecording(false);
        setNewMessage(prev => prev + " Message vocal transcrit");
      }, 3000);
    }
  };
  return <div className="p-2 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg my-0 px-[40px]">
      <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2">
        <Button type="button" size="icon" variant="ghost" className="hidden sm:flex h-10 w-10 rounded-full">
          <Paperclip size={18} className="text-mrc-blue" />
          <span className="sr-only">Joindre un fichier</span>
        </Button>
        
        <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Écrivez votre message..." className="flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 rounded-full h-10 px-4" />
        
        <Button type="button" size="icon" variant="ghost" onClick={toggleRecording} className={`h-10 w-10 rounded-full ${isRecording ? 'bg-red-500/20 text-red-500' : ''}`}>
          <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : "text-mrc-green"} />
          <span className="sr-only">Enregistrer un message</span>
        </Button>
        
        <Button type="submit" size="icon" disabled={!newMessage.trim()} className="h-10 w-10 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity">
          <Send size={18} />
          <span className="sr-only">Envoyer</span>
        </Button>
      </form>
    </div>;
};
export default MessageInput;