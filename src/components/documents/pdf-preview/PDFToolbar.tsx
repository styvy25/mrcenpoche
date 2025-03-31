
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

interface PDFToolbarProps {
  pageNumber: number;
  numPages: number;
  scale: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
}

const PDFToolbar = ({
  pageNumber,
  numPages,
  scale,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onDownload
}: PDFToolbarProps) => {
  return (
    <div className="p-4 border-t flex flex-wrap justify-between items-center gap-2 bg-mrc-blue/10">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className="bg-white"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="mx-2 text-sm">
          {Math.round(scale * 100)}%
        </span>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomIn}
          disabled={scale >= 2.5}
          className="bg-white"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onPrevPage} 
          disabled={pageNumber <= 1}
          className="bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="mx-2 text-sm">
          Page {pageNumber} sur {numPages || '--'}
        </span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onNextPage} 
          disabled={!numPages || pageNumber >= numPages}
          className="bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <Button onClick={onDownload} className="bg-mrc-blue hover:bg-blue-700">
        <Download className="h-4 w-4 mr-2" />
        Télécharger
      </Button>
    </div>
  );
};

export default PDFToolbar;
