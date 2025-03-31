
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download
} from "lucide-react";

interface PDFToolbarProps {
  pageNumber: number;
  numPages: number;
  scale: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  isMobile: boolean;
}

const PDFToolbar = ({
  pageNumber,
  numPages,
  scale,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onDownload,
  isMobile
}: PDFToolbarProps) => {
  return (
    <div className="flex items-center justify-between p-2 sm:p-4 border-t gap-2">
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size={isMobile ? "icon" : "default"}
          onClick={onPrevPage}
          disabled={pageNumber <= 1}
          className={isMobile ? "h-8 w-8" : ""}
        >
          {isMobile ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Précédent
            </>
          )}
        </Button>
        
        <span className={`text-center ${isMobile ? "text-xs min-w-16" : "min-w-24"}`}>
          Page {pageNumber} / {numPages}
        </span>
        
        <Button
          variant="outline"
          size={isMobile ? "icon" : "default"}
          onClick={onNextPage}
          disabled={pageNumber >= numPages}
          className={isMobile ? "h-8 w-8" : ""}
        >
          {isMobile ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              Suivant
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className={isMobile ? "h-8 w-8" : "h-9 w-9"}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <span className={`text-center ${isMobile ? "text-xs w-12" : "w-16"}`}>
          {Math.round(scale * 100)}%
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          disabled={scale >= 2.5}
          className={isMobile ? "h-8 w-8" : "h-9 w-9"}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button
          variant="default"
          size={isMobile ? "icon" : "default"}
          onClick={onDownload}
          className={`bg-mrc-blue hover:bg-blue-700 ${isMobile ? "h-8 w-8 ml-1" : "ml-2"}`}
        >
          {isMobile ? (
            <Download className="h-4 w-4" />
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PDFToolbar;
