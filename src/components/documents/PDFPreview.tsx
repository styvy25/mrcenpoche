
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  pdfUrl: string;
  onClose: () => void;
  moduleName: string;
}

const PDFPreview = ({ pdfUrl, onClose, moduleName }: PDFPreviewProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { toast } = useToast();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    if (numPages) {
      setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
    }
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Votre PDF est en cours de téléchargement...",
    });

    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Create an invisible link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Set download attribute for desktop browsers
    if (!isMobile) {
      link.setAttribute('download', `MRC-Support-${moduleName.replace(/\s+/g, '-')}.pdf`);
    } else {
      // For mobile, open in a new tab which will usually trigger the browser's built-in PDF viewer
      link.setAttribute('target', '_blank');
      
      toast({
        title: "Téléchargement sur mobile",
        description: "Utilisez l'option 'Télécharger' de votre navigateur après l'ouverture du PDF.",
      });
    }
    
    // Trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Aperçu du PDF - {moduleName}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mrc-blue"></div>
              </div>
            }
            error={
              <div className="text-center p-4 text-red-500">
                Le chargement du PDF a échoué. Veuillez réessayer.
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={1.0}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        </div>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrevPage} 
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="mx-2 text-sm">
              Page {pageNumber} sur {numPages || '--'}
            </span>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextPage} 
              disabled={!numPages || pageNumber >= numPages}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <Button onClick={handleDownload} className="bg-mrc-blue hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
