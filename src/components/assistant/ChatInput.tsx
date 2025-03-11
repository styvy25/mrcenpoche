
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Download, PlusCircle } from "lucide-react";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGeneratePDF: () => void;
}

const ChatInput = ({ isLoading, onSendMessage, onGeneratePDF }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question à Styvy237..."
          className="flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 h-11 px-4"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity h-11 px-4"
        >
          <Send size={18} className="mr-2" />
          <span>Envoyer</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onGeneratePDF}
          title="Générer un PDF"
          className="bg-gray-800/70 border-white/20 hover:bg-gray-700/70 h-11 w-11 p-0 flex items-center justify-center"
        >
          <Download size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
