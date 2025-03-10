
import { Message } from "../types/message";
import { useToast } from "@/components/ui/use-toast";

export function usePdfGenerator() {
  const { toast } = useToast();

  const generatePDF = (messages: Message[]) => {
    if (messages.length <= 1) {
      toast({
        title: "Pas de contenu à exporter",
        description: "Veuillez d'abord avoir une conversation avec l'assistant.",
        variant: "destructive",
      });
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    toast({
      title: "PDF en cours de génération",
      description: "Votre document sera " + (isMobile ? "ouvert" : "téléchargé") + " dans quelques instants.",
    });
    
    let content = "Conversation avec l'Assistant Styvy237\n\n";
    messages.forEach(msg => {
      const roleLabel = msg.role === 'user' ? 'Vous' : 'Assistant';
      const timestamp = new Date(msg.timestamp).toLocaleString();
      content += `${roleLabel} (${timestamp}):\n${msg.content}\n\n`;
    });
    
    setTimeout(() => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      
      if (!isMobile) {
        link.setAttribute('download', `conversation-${new Date().toISOString().slice(0, 10)}.txt`);
      } else {
        link.setAttribute('target', '_blank');
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Exportation réussie",
        description: isMobile ? 
          "Votre conversation a été ouverte. Utilisez l'option de téléchargement de votre navigateur." :
          "Votre conversation a été téléchargée.",
        variant: "default",
      });
    }, 2000);
  };

  return { generatePDF };
}
