
import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { useToast } from '@/components/ui/use-toast';

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { canGeneratePDF } = usePlanLimits();
  const { toast } = useToast();

  // Fonction pour générer un PDF à partir des messages
  const generatePDF = useCallback(async (messages: any[]) => {
    if (!canGeneratePDF()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite mensuelle de génération de PDF. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsGenerating(true);
      
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add a title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Conversation MRC en Poche", 105, 20, { align: "center" });
      doc.setFont("helvetica", "normal");
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 30, { align: "center" });
      
      // Add a separator line
      doc.setDrawColor(0, 102, 204);
      doc.setLineWidth(0.5);
      doc.line(20, 35, 190, 35);
      
      // Configure text settings
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      // Set variables for text position
      let y = 45;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const textWidth = pageWidth - (2 * margin);
      
      // Add messages
      for (const message of messages) {
        // Skip system messages
        if (message.sender === 'system') continue;
        
        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        // Set font based on sender
        if (message.sender === 'user') {
          doc.setFont("helvetica", "bold");
          doc.text("Vous:", margin, y);
        } else {
          doc.setFont("helvetica", "bold");
          doc.text("Assistant MRC:", margin, y);
        }
        
        y += 7;
        doc.setFont("helvetica", "normal");
        
        // Split text into lines to fit width
        const lines = doc.splitTextToSize(message.content, textWidth);
        
        // Add lines to PDF
        doc.text(lines, margin, y);
        
        // Update y position based on number of lines
        y += 7 * lines.length;
        
        // Add timestamp
        const timestamp = new Date(message.timestamp).toLocaleString('fr-FR');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(timestamp, pageWidth - margin, y - 4, { align: "right" });
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        // Add spacing
        y += 10;
      }
      
      // Add footer with page count
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${i} sur ${pageCount} - MRC en Poche`, 105, 290, { align: "center" });
      }
      
      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre conversation a été convertie en PDF",
      });

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `conversation-mrc-${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      
      return url;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [canGeneratePDF, toast]);

  return {
    generatePDF,
    isGenerating,
    pdfUrl,
    clearPdfUrl: () => setPdfUrl(null),
  };
};
