
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { usePlanLimits } from '@/hooks/usePlanLimits';

interface UserFormData {
  name: string;
  email: string;
  organization?: string;
}

interface PDFOptions {
  title: string;
  includeHeader: boolean;
  includeFooter: boolean;
  includeDate: boolean;
  pageSize: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
}

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPDFUrl, setGeneratedPDFUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { incrementPDFGenerationCount, checkPDFGenerationLimit } = usePlanLimits();

  const generatePDF = async (
    content: string,
    userInfo: UserFormData,
    options: PDFOptions
  ) => {
    // Check if user has reached the PDF generation limit
    const canGenerate = checkPDFGenerationLimit();
    if (!canGenerate) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de génération de PDF. Passez à Premium pour des générations illimitées.",
        variant: "destructive",
      });
      return null;
    }

    setIsGenerating(true);
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: options.orientation,
        unit: 'mm',
        format: options.pageSize,
      });

      // Set document properties
      doc.setProperties({
        title: options.title,
        subject: 'MRC Formation Document',
        author: userInfo.name || user?.username || user?.displayName || 'Utilisateur MRC',
        creator: 'MRC LearnScape',
      });

      // Add header if enabled
      if (options.includeHeader) {
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('MRC LearnScape', 14, 10);
        doc.text(options.title, 14, 16);
        
        if (options.includeDate) {
          const today = new Date().toLocaleDateString();
          doc.text('Date: ' + today, doc.internal.pageSize.width - 60, 10);
        }
        
        doc.line(14, 20, doc.internal.pageSize.width - 14, 20);
      }

      // Add content
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      // Calculate start position based on whether header is included
      const startY = options.includeHeader ? 30 : 14;
      
      // Split text into lines and add to PDF
      const splitText = doc.splitTextToSize(content, doc.internal.pageSize.width - 28);
      doc.text(splitText, 14, startY);
      
      // Add footer if enabled
      if (options.includeFooter) {
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          
          // Add page number
          doc.text(`Page ${i} / ${pageCount}`, doc.internal.pageSize.width / 2, 
                  doc.internal.pageSize.height - 10, { align: 'center' });
          
          // Add user info
          doc.text(`Généré pour: ${userInfo.name} | ${userInfo.email}`,
                  doc.internal.pageSize.width / 2, 
                  doc.internal.pageSize.height - 5, 
                  { align: 'center' });
        }
      }

      // Convert the PDF to a data URL
      const pdfDataUrl = doc.output('datauristring');
      setGeneratedPDFUrl(pdfDataUrl);
      
      // Increment PDF generation count
      incrementPDFGenerationCount();
      
      return pdfDataUrl;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = (filename: string) => {
    if (!generatedPDFUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedPDFUrl;
    link.download = `${filename}.pdf`;
    link.click();
  };

  const clearPDF = () => {
    setGeneratedPDFUrl(null);
  };

  return {
    isGenerating,
    generatedPDFUrl,
    generatePDF,
    downloadPDF,
    clearPDF,
  };
};
