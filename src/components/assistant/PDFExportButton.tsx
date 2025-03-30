
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { Message } from "./types/message";
import { jsPDF } from "jspdf";
import PremiumDialog from "@/components/premium/PremiumDialog";

interface PDFExportButtonProps {
  messages: Message[];
  buttonText?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({
  messages,
  buttonText = "Exporter en PDF",
  variant = "outline",
  size = "sm",
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { toast } = useToast();
  const { canGeneratePdf, incrementPdfGenerations } = usePlanLimits();

  const handleGeneratePDF = async () => {
    if (!messages || messages.length === 0) {
      toast({
        title: "Aucun contenu",
        description: "Il n'y a pas de messages à exporter",
        variant: "destructive",
      });
      return;
    }

    if (!canGeneratePdf()) {
      setIsPremiumDialogOpen(true);
      return;
    }

    try {
      setIsGenerating(true);

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
      
      for (const message of messages) {
        if (!message.content) continue;
        
        // Skip system messages or initial greeting
        if (message.role === 'system') continue;
        if (
          message.role === 'assistant' && 
          message.content === "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?"
        ) {
          continue;
        }
        
        const isAssistant = message.role === "assistant";
        const messageHeader = isAssistant ? "Assistant Styvy237" : "Vous";
        const messageDate = message.timestamp ? (
          new Date(message.timestamp).toLocaleDateString('fr-FR') + ' ' + 
          new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
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
        if (message !== messages[messages.length - 1]) {
          doc.setDrawColor(230);
          doc.line(margin, y - 5, pageWidth - margin, y - 5);
        }
      }
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `MRC en Poche - Page ${i} sur ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
      
      // Save the PDF
      doc.save("Conversation-Styvy237.pdf");
      
      // Update usage counter
      incrementPdfGenerations();
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre conversation a été exportée au format PDF",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleGeneratePDF}
        disabled={isGenerating || messages.length === 0}
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <FileText className="h-4 w-4 mr-2" />
        )}
        {buttonText}
      </Button>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </>
  );
};

export default PDFExportButton;
