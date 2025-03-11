
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!newMessage.trim()}
          className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
