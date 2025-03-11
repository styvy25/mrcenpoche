
import { Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "./types/message";

interface MessageDisplayProps {
  message: Message;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const isAssistant = message.role === "assistant";
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}>
      <Card 
        className={`p-4 max-w-[85%] backdrop-blur-sm border transition-all duration-200 rounded-2xl group-hover:shadow-lg ${
          isAssistant 
            ? "bg-mrc-blue/20 border-mrc-blue/30 text-white ml-0" 
            : "bg-mrc-green/20 border-mrc-green/30 text-white ml-auto"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-offset-2 ring-offset-gray-900 ${
            isAssistant ? "bg-mrc-blue ring-mrc-blue/30 text-white" : "bg-mrc-green ring-mrc-green/30 text-white"
          }`}>
            {isAssistant ? <Bot size={18} /> : <User size={18} />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {isAssistant ? "Styvy237" : "Vous"}
              {!isAssistant && <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{message.content}</p>
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
