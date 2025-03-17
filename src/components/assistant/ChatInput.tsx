
import { useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Download, PlusCircle } from "lucide-react";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGeneratePDF: () => void;
}

const ChatInput = memo(({
  isLoading,
  onSendMessage,
  onGeneratePDF
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    onSendMessage(trimmedInput);
    setInput("");
  }, [input, onSendMessage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <div className="p-4 border-t border-white/10 backdrop-blur-lg bg-sky-300">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input 
          value={input} 
          onChange={handleChange} 
          placeholder="Posez votre question à Styvy237..." 
          disabled={isLoading} 
          aria-label="Message input" 
          className="flex-1 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 h-11 my-0 px-[18px] rounded bg-cyan-50" 
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity h-11 px-4 optimize-animation"
        >
          <Send size={18} className="mr-2" />
          <span>Envoyer</span>
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onGeneratePDF} 
          title="Générer un PDF" 
          disabled={isLoading} 
          className="border-white/20 h-11 w-11 p-0 flex items-center justify-center bg-cyan-50"
        >
          <Download size={18} />
        </Button>
      </form>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
