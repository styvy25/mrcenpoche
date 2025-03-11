
import { Bot, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "./types/message";
import { useState, useEffect } from "react";

interface MessageDisplayProps {
  message: Message;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const isAssistant = message.role === "assistant";
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}>
      <Card 
        className={`p-4 max-w-[85%] backdrop-blur-sm border transition-all duration-300 rounded-2xl ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'} 
          ${isAssistant 
            ? "bg-gradient-to-r from-mrc-blue/20 to-mrc-blue/40 border-mrc-blue/30 text-white ml-0 hover:shadow-[0_0_15px_rgba(0,91,170,0.3)]" 
            : "bg-gradient-to-r from-mrc-green/20 to-mrc-green/40 border-mrc-green/30 text-white ml-auto hover:shadow-[0_0_15px_rgba(0,154,68,0.3)]"
          }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-offset-2 ring-offset-gray-900 ${
            isAssistant 
              ? "bg-gradient-to-br from-mrc-blue to-blue-500 ring-mrc-blue/30 text-white animate-pulse" 
              : "bg-gradient-to-br from-mrc-green to-green-500 ring-mrc-green/30 text-white"
          }`}>
            {isAssistant ? (
              <div className="relative">
                <Bot size={18} />
                <Sparkles className="absolute -top-1 -right-2 text-yellow-300" size={12} />
              </div>
            ) : (
              <User size={18} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {isAssistant ? "Styvy237" : "Vous"}
              {!isAssistant && <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${isAssistant ? 'text-gray-200' : 'text-gray-100'}`}>{message.content}</p>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessageDisplay;
