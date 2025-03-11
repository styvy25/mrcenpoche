
import { Bot, Download, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface ChatHeaderProps {
  onGeneratePDF: () => void;
}

const ChatHeader = ({ onGeneratePDF }: ChatHeaderProps) => {
  const { toast } = useToast();
  const [animating, setAnimating] = useState(false);
  const [shine, setShine] = useState(false);

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

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 2000);
    }, 5000);
    
    const shineInterval = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 1500);
    }, 7000);
    
    return () => {
      clearInterval(animationInterval);
      clearInterval(shineInterval);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-mrc-blue via-blue-500 to-mrc-green text-white p-4 backdrop-blur-lg border-b border-white/10 flex items-center justify-between transition-all duration-500 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg border border-white/30 transition-all duration-300 ${animating ? 'scale-110 rotate-12' : ''} relative`}>
          <Bot className="text-white" size={28} />
          {shine && (
            <span className="absolute inset-0 rounded-full bg-white/50 animate-pulse opacity-0 animate-[fade-in_0.2s_ease-out_forwards]"></span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold flex items-center">
            Assistant IA Styvy237
            <Sparkles className={`ml-2 text-yellow-300 ${animating ? 'animate-ping' : 'animate-pulse'}`} size={18} />
          </h2>
          <p className="text-sm opacity-90 flex items-center">
            <span>Votre guide personnalisé pour la formation MRC</span>
            <Zap className="ml-2 text-yellow-300" size={14} />
            {animating && <Star className="ml-1 text-yellow-300 animate-ping" size={12} />}
          </p>
        </div>
      </div>
      <div className="flex gap-2 relative z-10">
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group" 
          onClick={handleGeneratePDF}
          title="Télécharger la conversation en PDF"
        >
          <Download size={18} className="mr-2 group-hover:translate-y-1 transition-transform duration-300" />
          <span className="hidden sm:inline">Télécharger</span>
          
          {/* Shine effect */}
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg] transform -translate-x-32 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out"></span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
