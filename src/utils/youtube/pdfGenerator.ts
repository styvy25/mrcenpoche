
import { useState } from 'react';
import { VideoAnalysisResult, PdfGenerationOptions } from '@/types';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';

export const usePdfGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  /**
   * Generates a PDF from a video analysis
   */
  const generateAnalysisPDF = async (
    analysis: VideoAnalysisResult,
    options: PdfGenerationOptions = {}
  ): Promise<boolean> => {
    if (!analysis.success || !analysis.title) {
      toast({
        title: "Erreur",
        description: "Impossible de générer un PDF sans analyse valide",
        variant: "destructive"
      });
      return false;
    }

    setIsGenerating(true);

    try {
      // Create PDF document
      const pdf = new jsPDF();
      let yPos = 20;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(analysis.title, 20, yPos);
      yPos += 10;

      // Add analysis date
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Analyse générée le: ${new Date().toLocaleDateString()}`, 20, yPos);
      yPos += 15;

      // Add summary section
      if (analysis.summary) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Résumé", 20, yPos);
        yPos += 8;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const summaryLines = pdf.splitTextToSize(analysis.summary, 170);
        pdf.text(summaryLines, 20, yPos);
        yPos += summaryLines.length * 5 + 10;
      }

      // Add key points section
      if (analysis.keyPoints && analysis.keyPoints.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Points clés", 20, yPos);
        yPos += 8;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        for (const point of analysis.keyPoints) {
          const pointText = `• ${point}`;
          const pointLines = pdf.splitTextToSize(pointText, 165);
          pdf.text(pointLines, 20, yPos);
          yPos += pointLines.length * 5 + 3;
          
          // Add new page if needed
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }
        }
        
        yPos += 10;
      }

      // Add transcript if requested
      if (options.includeTranscript && analysis.transcript) {
        // Always add transcript on a new page
        pdf.addPage();
        yPos = 20;
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Transcription", 20, yPos);
        yPos += 8;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const transcriptLines = pdf.splitTextToSize(analysis.transcript, 170);
        pdf.text(transcriptLines, 20, yPos);
      }

      // Save the PDF
      pdf.save(`Analyse - ${analysis.title.substring(0, 30)}.pdf`);
      
      toast({
        title: "PDF généré",
        description: "Le PDF d'analyse a été téléchargé avec succès"
      });
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer le PDF",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateAnalysisPDF
  };
};
