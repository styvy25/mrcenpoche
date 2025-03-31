
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useScreenSize } from "@/hooks/useScreenSize";

interface PDFActionsProps {
  isGenerating: boolean;
  pdfGenerated: boolean;
  selectedModule: string;
  handleGeneratePDF: () => void;
  handlePreviewPDF: () => void;
  handleDownloadPDF: () => void;
}

const PDFActions = ({
  isGenerating,
  pdfGenerated,
  selectedModule,
  handleGeneratePDF,
  handlePreviewPDF,
  handleDownloadPDF,
}: PDFActionsProps) => {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <>
        {!pdfGenerated ? (
          <Button 
            onClick={handleGeneratePDF} 
            disabled={isGenerating || !selectedModule}
            className="w-full bg-mrc-blue hover:bg-blue-700 text-sm"
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Génération...
              </>
            ) : (
              <>
                <Download className="mr-1 h-3 w-3" />
                Générer le PDF
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-2 w-full">
            <Button 
              onClick={handlePreviewPDF} 
              className="w-full bg-mrc-blue hover:bg-blue-700 text-sm"
            >
              <Eye className="mr-1 h-3 w-3" />
              Aperçu
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              className="w-full border-mrc-blue text-mrc-blue hover:bg-mrc-blue/10 text-sm"
              variant="outline"
            >
              <Download className="mr-1 h-3 w-3" />
              Télécharger
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {!pdfGenerated ? (
        <Button 
          onClick={handleGeneratePDF} 
          disabled={isGenerating || !selectedModule}
          className="w-full bg-mrc-blue hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Génération en cours...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Générer le PDF
            </>
          )}
        </Button>
      ) : (
        <>
          <Button 
            onClick={handlePreviewPDF} 
            className="w-full sm:w-1/2 bg-mrc-blue hover:bg-blue-700"
          >
            <Eye className="mr-2 h-4 w-4" />
            Aperçu
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            className="w-full sm:w-1/2 border-mrc-blue text-mrc-blue hover:bg-mrc-blue/10"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </>
      )}
    </>
  );
};

export default PDFActions;
