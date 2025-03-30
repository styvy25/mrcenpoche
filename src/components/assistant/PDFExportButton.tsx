
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '@/hooks/use-toast';
import MRCLogoNew from '@/components/branding/MRCLogoNew';

interface Message {
  id: string;
  text: string;
  sender: string;
  content?: string;
  timestamp: Date;
}

interface PDFExportButtonProps {
  messages: Message[];
  title?: string;
  disabled?: boolean;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ 
  messages, 
  title = "Conversation avec l'assistant MRC",
  disabled = false
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const exportToPDF = async () => {
    if (messages.length === 0 || disabled) return;
    
    setIsExporting(true);
    
    try {
      // Create PDF document
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(18);
      pdf.setTextColor(33, 86, 219); // MRC blue
      pdf.text(title, 20, 20);
      
      // Add date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Généré le: ${formatDate(new Date())}`, 20, 28);
      
      // Add content
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      
      const tableData = messages.map(msg => {
        const isAssistant = msg.sender === "assistant";
        // Make sure we're not comparing 'assistant'/'user' with 'system'
        return [
          isAssistant ? 'Assistant MRC' : 'Vous',
          msg.content || msg.text || '',
          formatDate(msg.timestamp)
        ];
      });
      
      autoTable(pdf, {
        startY: 35,
        head: [['Expéditeur', 'Message', 'Heure']],
        body: tableData,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [33, 86, 219], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [240, 244, 255] },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 30 }
        }
      });
      
      // Add footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('MRC en Poche - Document généré automatiquement', 20, pdf.internal.pageSize.height - 10);
        pdf.text('Page ' + i + ' / ' + pageCount, pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10);
      }
      
      // Save PDF
      pdf.save('conversation-assistant-mrc.pdf');
      
      toast({
        title: "Exportation réussie",
        description: "Votre conversation a été exportée au format PDF",
      });
    } catch (error) {
      console.error("Erreur lors de l'exportation en PDF:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation du PDF",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline"
      size="sm"
      disabled={isExporting || disabled || messages.length === 0}
      onClick={exportToPDF}
      className="flex items-center gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exportation...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Exporter PDF
        </>
      )}
    </Button>
  );
};

export default PDFExportButton;
