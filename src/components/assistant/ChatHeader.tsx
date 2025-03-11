
import { Button } from "@/components/ui/button";
import { Download, Wifi, WifiOff } from "lucide-react";

interface ChatHeaderProps {
  onGeneratePDF: () => void;
  isOnline?: boolean;
}

const ChatHeader = ({ onGeneratePDF, isOnline = true }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <div>
        <h2 className="text-lg font-bold text-white">Assistant IA - Styvy237</h2>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {isOnline ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-green-400 flex items-center">
                  <Wifi className="h-3 w-3 mr-1" />
                  En ligne
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-xs text-yellow-400 flex items-center">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Hors-ligne
                </span>
              </>
            )}
          </div>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-xs text-gray-400">Assistant politique MRC</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onGeneratePDF}
        className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
      >
        <Download className="h-4 w-4 mr-2" />
        Exporter
      </Button>
    </div>
  );
};

export default ChatHeader;
