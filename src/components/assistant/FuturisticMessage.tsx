
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "./types/message";

interface FuturisticMessageProps {
  message: Message;
  index: number;
}

const FuturisticMessage: React.FC<FuturisticMessageProps> = ({ message, index }) => {
  const isAssistant = message.role === "assistant";
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Effet de surbrillance lorsque le message apparaît
  useEffect(() => {
    if (messageRef.current && isAssistant) {
      const element = messageRef.current;
      element.classList.add('highlight-glow');
      
      const timeout = setTimeout(() => {
        element.classList.remove('highlight-glow');
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isAssistant]);

  return (
    <motion.div 
      ref={messageRef}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Card 
        className={`p-4 max-w-[85%] backdrop-blur-sm border transition-all duration-300 rounded-2xl group-hover:shadow-lg ${
          isAssistant 
            ? "bg-gradient-to-r from-mrc-blue/20 to-blue-950/30 border-mrc-blue/30 text-white ml-0 hover:border-mrc-blue/50" 
            : "bg-gradient-to-r from-mrc-green/20 to-green-950/30 border-mrc-green/30 text-white ml-auto hover:border-mrc-green/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-offset-2 ring-offset-gray-900 ${
            isAssistant 
              ? "bg-gradient-to-br from-mrc-blue to-blue-700 ring-mrc-blue/30 text-white" 
              : "bg-gradient-to-br from-mrc-green to-green-700 ring-mrc-green/30 text-white"
          }`}>
            {isAssistant ? (
              <>
                <Bot size={18} />
                <motion.span 
                  className="absolute -right-1 -top-1 w-3 h-3"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                >
                  <Sparkles className="w-full h-full text-yellow-400" />
                </motion.span>
              </>
            ) : (
              <User size={18} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {isAssistant ? "Styvy237" : "Vous"}
              {!isAssistant && <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>}
            </p>
            <div className="mt-1 text-sm leading-relaxed space-y-2">
              {message.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right flex items-center justify-end gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green"></span>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FuturisticMessage;
