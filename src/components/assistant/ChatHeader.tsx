
import { Bot, Download } from "lucide-react";
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
          onClick={handleGeneratePDF}
          title="Télécharger la conversation en PDF"
        >
          <Download size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
