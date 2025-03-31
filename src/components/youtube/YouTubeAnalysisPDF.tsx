
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { usePlanLimits } from '@/hooks/usePlanLimits';

interface YouTubeAnalysisPDFProps {
  videoId: string;
  videoTitle: string;
  analysis: string;
}

const YouTubeAnalysisPDF: React.FC<YouTubeAnalysisPDFProps> = ({
  videoId,
  videoTitle,
  analysis
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { canGeneratePdf, incrementPdfGenerations } = usePlanLimits();

  const generatePDF = async () => {
    if (!canGeneratePdf()) {
      toast({
        title: "Fonctionnalité premium",
        description: "L'export PDF est disponible uniquement pour les utilisateurs Premium",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(31, 87, 164); // MRC blue
      doc.text("Analyse Vidéo MRC", 105, 20, { align: "center" });
      
      // Add video title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const titleLines = doc.splitTextToSize(videoTitle, 180);
      doc.text(titleLines, 105, 35, { align: "center" });
      
      // Add YouTube link
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("Vidéo YouTube:", 20, 55);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink("Ouvrir la vidéo sur YouTube", 70, 55, {
        url: `https://www.youtube.com/watch?v=${videoId}`
      });

      // Add video thumbnail if possible
      try {
        const img = new Image();
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        doc.addImage(img, 'JPEG', 55, 60, 100, 60);
      } catch (error) {
        console.error("Could not add thumbnail:", error);
      }
      
      // Add analysis content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Analyse détaillée:", 20, 130);
      
      // Format analysis content
      const analysisLines = doc.splitTextToSize(analysis, 170);
      let yPosition = 140;
      
      // Add line break for readability
      for (let i = 0; i < analysisLines.length; i++) {
        // Check if we need to add a new page
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add line of text
        doc.text(analysisLines[i], 20, yPosition);
        yPosition += 7; // Line spacing
      }
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Analyse MRC | Page ${i} sur ${pageCount}`, 105, 290, { align: "center" });
      }
      
      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      // Increment usage counter
      incrementPdfGenerations();
      
      toast({
        title: "PDF généré avec succès",
        description: "L'analyse de la vidéo a été exportée en PDF"
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Analyse-MRC-${videoId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {!pdfUrl ? (
        <Button 
          onClick={generatePDF} 
          disabled={isGenerating || !videoId || !analysis}
          className="w-full"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <FileText className="h-4 w-4 mr-2" />
          )}
          Générer PDF
        </Button>
      ) : (
        <>
          <Button 
            onClick={handlePreview} 
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          <Button 
            onClick={handleDownload} 
            variant="outline" 
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </>
      )}
    </div>
  );
};

export default YouTubeAnalysisPDF;
