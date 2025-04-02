import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Download, Sparkles } from "lucide-react";
interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGeneratePDF: () => void;
}
const ChatInput = ({
  isLoading,
  onSendMessage,
  onGeneratePDF
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTypingTime = useRef<number>(0);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle typing indicator
  useEffect(() => {
    const typingIndicatorTimeout = () => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime.current;
      if (timeDiff >= 1000 && isTyping) {
        setIsTyping(false);
      }
    };
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    typingTimer.current = setTimeout(typingIndicatorTimeout, 1000);
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, [input, isTyping]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    lastTypingTime.current = new Date().getTime();
    if (!isTyping) {
      setIsTyping(true);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
    setIsTyping(false);
  };
  return <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-lg relative z-10">
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <div className="relative flex-1 group">
          <Input ref={inputRef} value={input} onChange={handleInputChange} placeholder="Posez votre question à Styvy237..." className="flex-1 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 h-12 px-4 pr-10 transition-all duration-300 rounded-xl bg-cyan-400" />
          {isTyping && <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center pointer-events-none">
              <div className="h-1.5 w-1.5 bg-mrc-blue/70 rounded-full animate-pulse" style={{
            animationDelay: "0ms"
          }}></div>
              <div className="h-1.5 w-1.5 bg-mrc-blue/70 rounded-full animate-pulse" style={{
            animationDelay: "200ms"
          }}></div>
              <div className="h-1.5 w-1.5 bg-mrc-blue/70 rounded-full animate-pulse" style={{
            animationDelay: "400ms"
          }}></div>
            </div>}
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-mrc-red via-mrc-blue to-mrc-green group-focus-within:w-full transition-all duration-1000 ease-in-out"></div>
        </div>
        <Button type="submit" disabled={isLoading || !input.trim()} className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-all h-12 px-5 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-mrc-blue to-mrc-green opacity-0 hover:opacity-30 transition-opacity"></div>
          <Send size={18} className="mr-2" />
          <span>Envoyer</span>
        </Button>
        <Button type="button" variant="outline" onClick={onGeneratePDF} title="Générer un PDF" className="bg-gray-800/70 border-white/20 hover:bg-gray-700/70 h-12 w-12 p-0 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 text-gray-100">
          <Download size={18} />
        </Button>
      </form>
    </div>;
};
export default ChatInput;