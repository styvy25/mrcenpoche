
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Trash2, 
  Wifi, 
  WifiOff,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onGeneratePDF?: () => void;
  onClearConversation?: () => void;
  onRefresh?: () => void;
  isOnline?: boolean;
}

const ChatHeader = ({ 
  onGeneratePDF, 
  onClearConversation, 
  onRefresh,
  isOnline = true 
}: ChatHeaderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-white">
          Assistant MRC
        </h2>
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-400" />
        ) : (
          <WifiOff className="h-4 w-4 text-yellow-400" />
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={isRefreshing ? "animate-spin" : ""}
          aria-label="Rafraîchir la conversation"
          title="Rafraîchir la conversation"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onGeneratePDF && (
              <DropdownMenuItem onClick={onGeneratePDF}>
                <FileText className="h-4 w-4 mr-2" />
                <span>Exporter en PDF</span>
              </DropdownMenuItem>
            )}
            {onClearConversation && (
              <DropdownMenuItem onClick={onClearConversation}>
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Effacer la conversation</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
