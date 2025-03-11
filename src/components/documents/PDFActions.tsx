
import { Button } from "@/components/ui/button";
import { Download, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [showGlow, setShowGlow] = useState(false);
  
  // Create a pulsing effect to draw attention
  useEffect(() => {
    if (!pdfGenerated && !isGenerating && selectedModule) {
      const interval = setInterval(() => {
        setShowGlow(prev => !prev);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [pdfGenerated, isGenerating, selectedModule]);
  
  return (
    <>
      {!pdfGenerated ? (
        <Button 
          onClick={handleGeneratePDF} 
          disabled={isGenerating || !selectedModule}
          className={`w-full relative overflow-hidden transition-all duration-300 ${
            showGlow && !isGenerating ? 'button-glow scale-105' : ''
          } ${
            isGenerating ? 'bg-blue-600' : 'bg-gradient-to-r from-mrc-blue to-blue-500 hover:from-blue-500 hover:to-mrc-blue'
          } hover:scale-105 active:scale-95`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Générer le PDF</span>
              
              {/* Shine effect */}
              <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
                <span 
                  className={`absolute -inset-[10px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-40deg] transition-all duration-1000 ease-out ${
                    showGlow ? 'left-full opacity-0' : 'left-[-100%] opacity-100'
                  }`}
                  style={{
                    width: '60%',
                    height: '200%',
                  }}
                ></span>
              </span>
            </>
          )}
        </Button>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <Button 
            onClick={handlePreviewPDF} 
            className="w-full bg-gradient-to-r from-mrc-blue to-blue-600 hover:from-blue-600 hover:to-mrc-blue hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Aperçu</span>
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            className="w-full border-mrc-blue text-mrc-blue hover:bg-mrc-blue/10 hover:scale-105 active:scale-95 transition-transform duration-300 shadow-md"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            <span>Télécharger</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default PDFActions;
