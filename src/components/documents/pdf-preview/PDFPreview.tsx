
import { useState } from "react";
import PDFDocument from "./PDFDocument";
import PDFToolbar from "./PDFToolbar";
import PDFHeader from "./PDFHeader";
import PDFErrorState from "./PDFErrorState";
import { useToast } from "@/hooks/use-toast";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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
  const [scale, setScale] = useState(1.0);
  const [loadError, setLoadError] = useState(false);
  const { toast } = useToast();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoadError(false);
    toast({
      title: "PDF chargé avec succès",
      description: `Document de ${numPages} pages chargé et prêt à être consulté.`,
    });
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF loading error:", error);
    setLoadError(true);
    toast({
      title: "Erreur de chargement",
      description: "Le chargement du PDF a échoué. Veuillez réessayer.",
      variant: "destructive",
    });
  }

  const handlePrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    if (numPages) {
      setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
    }
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  const handleRetry = () => {
    setLoadError(false);
    // Force reload the PDF by creating a cache-busting URL
    const cacheBuster = `?cache=${Date.now()}`;
    const refreshedUrl = pdfUrl.includes('?') ? `${pdfUrl}&cache=${Date.now()}` : `${pdfUrl}${cacheBuster}`;
    
    // We need to temporarily change the URL to force a reload
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = refreshedUrl;
    }
    
    toast({
      title: "Nouvelle tentative",
      description: "Tentative de rechargement du PDF en cours...",
    });
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <PDFHeader moduleName={moduleName} onClose={onClose} />
        
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
          <PDFDocument 
            pdfUrl={pdfUrl}
            pageNumber={pageNumber}
            scale={scale}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loadError={loadError}
            onRetry={handleRetry}
            onClose={onClose}
          />
        </div>
        
        {!loadError && numPages && (
          <PDFToolbar 
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
