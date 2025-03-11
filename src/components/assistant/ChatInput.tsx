
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Download, Sparkles, BrainCircuit } from "lucide-react";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGeneratePDF: () => void;
}

const ChatInput = ({ isLoading, onSendMessage, onGeneratePDF }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };

  useEffect(() => {
    // Show hint after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (!input.trim() && !isLoading) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 5000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [input, isLoading]);

  return (
    <div className="p-4 border-t border-white/10 bg-gradient-to-r from-black/70 to-gray-900/70 backdrop-blur-lg relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(0,91,170,0.5) 0%, rgba(0,154,68,0.3) 70%, transparent 100%)`,
                filter: 'blur(20px)',
                animation: `float ${Math.random() * 3 + 5}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {showHint && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 animate-bounce shadow-lg border border-blue-400/30 backdrop-blur-sm">
          <BrainCircuit size={16} />
          <span>Posez une question sur le MRC...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 relative z-10">
        <div className={`flex-1 relative ${isFocused ? 'ring-2 ring-mrc-blue rounded-lg' : ''}`}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Posez votre question à Styvy237..."
            className={`flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 h-12 px-4 transition-all duration-300 ${isFocused ? 'pl-6' : ''}`}
          />
          {isFocused && (
            <Sparkles 
              size={16} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-300 animate-pulse"
            />
          )}
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-blue/90 hover:to-mrc-green/90 hover:scale-105 active:scale-95 transition-all duration-300 h-12 px-5 shadow-lg shadow-blue-500/20"
          variant="glow"
        >
          <Send size={18} className={`mr-2 ${isLoading ? 'animate-pulse' : ''}`} />
          <span>Envoyer</span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onGeneratePDF}
          title="Générer un PDF"
          className="bg-gray-800/70 border-white/20 hover:bg-gray-700/70 hover:scale-105 active:scale-95 transition-all duration-300 h-12 w-12 p-0 flex items-center justify-center"
        >
          <Download size={18} className="transition-transform hover:scale-110" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
