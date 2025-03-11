
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

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
