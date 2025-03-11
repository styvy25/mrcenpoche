
import { Bot, User, Sparkles, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "./types/message";
import { useState, useEffect } from "react";

interface MessageDisplayProps {
  message: Message;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const isAssistant = message.role === "assistant";
  const [isVisible, setIsVisible] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Randomly animate the icon for assistant messages
    let iconAnimationInterval: NodeJS.Timeout;
    if (isAssistant) {
      iconAnimationInterval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to animate
          setAnimateIcon(true);
          setTimeout(() => setAnimateIcon(false), 2000);
        }
      }, 5000);
    }
    
    return () => {
      clearTimeout(visibilityTimer);
      if (iconAnimationInterval) clearInterval(iconAnimationInterval);
    };
  }, [isAssistant]);
  
  const getRandomOffset = () => Math.floor(Math.random() * 10) - 5; // Random offset between -5 and 5
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}>
      <Card 
        className={`p-4 max-w-[85%] backdrop-blur-sm border transition-all duration-500 rounded-2xl ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
        } 
          ${isAssistant 
            ? "bg-gradient-to-r from-mrc-blue/20 to-mrc-blue/40 border-mrc-blue/30 text-white ml-0 hover:shadow-[0_0_15px_rgba(0,91,170,0.3)]" 
            : "bg-gradient-to-r from-mrc-green/20 to-mrc-green/40 border-mrc-green/30 text-white ml-auto hover:shadow-[0_0_15px_rgba(0,154,68,0.3)]"
          } relative overflow-hidden`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {isAssistant && Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-mrc-blue/10"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 3 + 5}s infinite ease-in-out ${Math.random() * 2}s`,
                opacity: 0.7
              }}
            />
          ))}
          
          {!isAssistant && Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-mrc-green/10"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 3 + 5}s infinite ease-in-out ${Math.random() * 2}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
        
        <div className="flex items-start gap-3 relative z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-offset-2 ring-offset-gray-900 relative ${
            isAssistant 
              ? "bg-gradient-to-br from-mrc-blue to-blue-500 ring-mrc-blue/30 text-white" 
              : "bg-gradient-to-br from-mrc-green to-green-500 ring-mrc-green/30 text-white"
          } ${animateIcon && isAssistant ? 'animate-pulse' : ''}`}>
            {isAssistant ? (
              <div className="relative">
                <Bot size={18} className={animateIcon ? 'animate-bounce' : ''} />
                <Sparkles 
                  className={`absolute -top-1 -right-2 text-yellow-300 ${animateIcon ? 'animate-ping' : ''}`} 
                  size={12} 
                />
              </div>
            ) : (
              <User size={18} />
            )}
            
            {/* Occasional star animation for assistant icon */}
            {isAssistant && animateIcon && (
              <div className="absolute -top-2 -right-1">
                <Star size={10} className="text-yellow-300 animate-ping" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {isAssistant ? "Styvy237" : "Vous"}
              {!isAssistant && <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${isAssistant ? 'text-gray-200' : 'text-gray-100'}`}>
              {message.content}
            </p>
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
