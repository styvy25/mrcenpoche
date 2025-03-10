
import { Message } from "../types/message";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";

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

    // Create PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Conversation avec l'Assistant Styvy237", 20, 20);
    
    // Set normal font for content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    let yPosition = 30;
    
    // Add each message
    messages.forEach(msg => {
      const roleLabel = msg.role === 'user' ? 'Vous' : 'Assistant';
      const timestamp = new Date(msg.timestamp).toLocaleString();
      
      // If not enough space for new message on page, add new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Add header (role and timestamp)
      doc.setFont("helvetica", "bold");
      doc.text(`${roleLabel} (${timestamp}):`, 20, yPosition);
      yPosition += 7;
      
      // Add message content
      doc.setFont("helvetica", "normal");
      
      // Split long message text into multiple lines
      const contentLines = doc.splitTextToSize(msg.content, 170);
      
      contentLines.forEach(line => {
        doc.text(line, 20, yPosition);
        yPosition += 5;
        
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      // Add spacing between messages
      yPosition += 5;
    });
    
    // Get the PDF as data URI
    const pdfOutput = doc.output('datauristring');
    
    // Create a link to download or open the PDF
    setTimeout(() => {
      // Create an invisible link element
      const link = document.createElement('a');
      link.href = pdfOutput;
      
      if (!isMobile) {
        link.setAttribute('download', `conversation-${new Date().toISOString().slice(0, 10)}.pdf`);
      } else {
        link.setAttribute('target', '_blank');
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportation réussie",
        description: isMobile ? 
          "Votre conversation a été ouverte. Utilisez l'option de téléchargement de votre navigateur." :
          "Votre conversation a été téléchargée.",
        variant: "default",
      });
    }, 1000);
  };

  return { generatePDF };
}
