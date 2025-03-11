
import { Bot, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ChatHeaderProps {
  onGeneratePDF: () => void;
}

const ChatHeader = ({ onGeneratePDF }: ChatHeaderProps) => {
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      toast({
        title: "Téléchargement sur mobile",
        description: "Le PDF va s'ouvrir dans un nouvel onglet. Utilisez l'option de téléchargement de votre navigateur.",
      });
    }
    
    onGeneratePDF();
  };

  return (
    <div className="bg-gradient-to-r from-mrc-blue to-mrc-green text-white p-4 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md">
          <Bot className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold flex items-center">
            Assistant IA Styvy237
            <Sparkles className="ml-2 text-yellow-300" size={16} />
          </h2>
          <p className="text-sm opacity-90">Votre guide personnalisé pour la formation MRC</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 hover:bg-white/20" 
          onClick={handleGeneratePDF}
          title="Télécharger la conversation en PDF"
        >
          <Download size={18} className="mr-2" />
          <span className="hidden sm:inline">Télécharger</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
