
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePlanLimits, Feature } from '@/hooks/usePlanLimits';
import { usePdfGenerator } from '@/utils/youtube/pdfGenerator';

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
  const { hasFeatureAccess } = usePlanLimits();
  const { generateAnalysisPDF } = usePdfGenerator();

  const generatePDF = async () => {
    if (!hasFeatureAccess(Feature.PDF_EXPORT)) {
      toast({
        title: "Fonctionnalité premium",
        description: "L'export PDF est disponible uniquement pour les utilisateurs Premium",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const pdfUrl = await generateAnalysisPDF({
        videoId,
        title: videoTitle,
        analysis
      });
      
      if (pdfUrl) {
        setPdfUrl(pdfUrl);
        toast({
          title: "PDF généré avec succès",
          description: "L'analyse de la vidéo a été exportée en PDF"
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de générer le PDF",
          variant: "destructive"
        });
      }
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
