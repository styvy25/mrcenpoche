
import { jsPDF } from "jspdf";
import { Message } from "../types/message";
import { useToast } from "@/hooks/use-toast";

export const usePdfGenerator = () => {
  const { toast } = useToast();

  const generatePDF = (messages: Message[]) => {
    if (!messages || messages.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucun message à exporter en PDF",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a new PDF document
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(31, 87, 164); // MRC blue
      doc.text("Conversation avec Styvy237", pageWidth / 2, margin, { align: "center" });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      const today = new Date().toLocaleDateString('fr-FR');
      doc.text(`Généré le ${today}`, pageWidth / 2, margin + 7, { align: "center" });
      
      // Add line
      doc.setDrawColor(200);
      doc.line(margin, margin + 10, pageWidth - margin, margin + 10);
      
      let y = margin + 20;
      const lineHeight = 5;
      
      // Add messages
      doc.setFontSize(11);
      
      messages.forEach((message, index) => {
        if (index === 0 && message.role === 'assistant' && message.content === "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?") {
          // Skip the initial greeting message
          return;
        }
        
        const isAssistant = message.role === "assistant";
        const messageHeader = isAssistant ? "Assistant Styvy237" : "Vous";
        const messageDate = message.timestamp ? (
          message.timestamp.toLocaleDateString('fr-FR') + ' ' + 
          message.timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit'
          })
        ) : "Date inconnue";
        
        // Set colors based on role
        if (isAssistant) {
          doc.setTextColor(31, 87, 164); // MRC blue for assistant
        } else {
          doc.setTextColor(46, 125, 50); // Green for user
        }
        
        // Add message header
        doc.setFont(undefined, 'bold');
        doc.text(`${messageHeader} (${messageDate})`, margin, y);
        doc.setFont(undefined, 'normal');
        
        y += lineHeight + 2;
        
        // Add message content
        doc.setTextColor(60);
        
        // Split long text into multiple lines
        const contentLines = doc.splitTextToSize(message.content, contentWidth);
        
        // Check if we need a new page
        if (y + contentLines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        
        // Add message content
        doc.text(contentLines, margin, y);
        
        // Update y position for next message
        y += contentLines.length * lineHeight + 10;
        
        // Add separator line except for the last message
        if (index < messages.length - 1) {
          doc.setDrawColor(230);
          doc.line(margin, y - 5, pageWidth - margin, y - 5);
        }
      });
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `MRC LearnScape - Page ${i} sur ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
      
      // Save the PDF
      doc.save("Conversation-Styvy237.pdf");
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre conversation a été exportée au format PDF",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du PDF",
        variant: "destructive",
      });
    }
  };

  return { generatePDF };
};
