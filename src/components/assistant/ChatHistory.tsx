
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Message } from './types/message';
import FuturisticMessage from './FuturisticMessage';

interface ChatHistoryProps {
  messages: Message[];
  onClear: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onClear }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-300">Conversation</h3>
        {messages.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="h-8 px-2 text-gray-400 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        )}
      </div>
      
      {messages.map((message, index) => (
        <FuturisticMessage key={index} message={message} index={index} />
      ))}
    </div>
  );
};

export default ChatHistory;
