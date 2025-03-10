
import { Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "./types/message";

interface MessageDisplayProps {
  message: Message;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const isAssistant = message.role === "assistant";
  
  return (
    <Card 
      className={`p-4 max-w-[85%] ${
        isAssistant 
          ? "bg-mrc-blue/20 backdrop-blur-sm border border-mrc-blue/30 text-white ml-0" 
          : "bg-mrc-green/20 backdrop-blur-sm border border-mrc-green/30 text-white ml-auto"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant ? "bg-mrc-blue text-white" : "bg-mrc-green text-white"
        }`}>
          {isAssistant ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isAssistant ? "Styvy237" : "Vous"}
          </p>
          <p className="mt-1 text-sm">{message.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MessageDisplay;
