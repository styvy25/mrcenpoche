
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePdf, Wifi, WifiOff, Trash2 } from 'lucide-react';

export interface ChatHeaderProps {
  onGeneratePDF: () => void;
  onClearChat: () => void;
  isOnline: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onGeneratePDF,
  onClearChat,
  isOnline
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-t-lg">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-400" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-400" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? 'En ligne' : 'Mode hors ligne'}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onGeneratePDF}
          className="h-8 gap-1 text-xs"
        >
          <FilePdf className="h-4 w-4" />
          Exporter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearChat}
          className="h-8 gap-1 text-xs text-red-400 hover:text-red-300 hover:border-red-400/30"
        >
          <Trash2 className="h-4 w-4" />
          Effacer
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
