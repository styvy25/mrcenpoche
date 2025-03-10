
import { Bot, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onGeneratePDF: () => void;
}

const ChatHeader = ({ onGeneratePDF }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-mrc text-white p-4 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold flex items-center">
          <Bot className="mr-2" /> Assistant IA Styvy237
        </h2>
        <p className="text-sm opacity-80">Votre guide personnalisé pour la formation MRC</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 hover:bg-white/20" 
          onClick={onGeneratePDF}
        >
          <Download size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
