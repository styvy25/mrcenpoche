
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw, Trash2, Wifi, WifiOff } from "lucide-react";

export interface ChatHeaderProps {
  onClearConversation: () => void;
  onRefresh: () => Promise<boolean> | boolean;
  isOnline?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClearConversation, 
  onRefresh,
  isOnline = true
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Assistant MRC</h3>
        {isOnline !== undefined && (
          <div className="flex items-center gap-1">
            {isOnline ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-amber-500" />
            )}
            <span className="text-xs text-gray-500">
              {isOnline ? "En ligne" : "Hors-ligne"}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRefresh}
          title="Rafraîchir la conversation"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearConversation}
          title="Effacer la conversation"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
