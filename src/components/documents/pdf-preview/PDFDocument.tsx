
import { Document, Page } from "react-pdf";
import PDFErrorState from "./PDFErrorState";
import PDFLoadingState from "./PDFLoadingState";

interface PDFDocumentProps {
  pdfUrl: string;
  pageNumber: number;
  scale: number;
  loadError: boolean;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onLoadError: (error: Error) => void;
  onRetry: () => void;
  onClose: () => void;
}

const PDFDocument = ({
  pdfUrl,
  pageNumber,
  scale,
  loadError,
  onLoadSuccess,
  onLoadError,
  onRetry,
  onClose
}: PDFDocumentProps) => {
  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      loading={<PDFLoadingState />}
      error={
        <PDFErrorState 
          onRetry={onRetry} 
          onClose={onClose} 
        />
      }
    >
      {!loadError && (
        <Page 
          pageNumber={pageNumber} 
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="shadow-lg bg-white"
        />
      )}
    </Document>
  );
};

export default PDFDocument;
