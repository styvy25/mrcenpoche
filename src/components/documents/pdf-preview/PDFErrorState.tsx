
import { AlertCircle, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFErrorStateProps {
  onRetry: () => void;
  onClose: () => void;
}

const PDFErrorState = ({ onRetry, onClose }: PDFErrorStateProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col items-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Erreur de chargement du PDF</h3>
      <p className="text-muted-foreground text-center mb-4">
        Une erreur s'est produite lors du chargement du document. Veuillez réessayer.
      </p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="flex items-center"
        >
          <X className="mr-2 h-4 w-4" />
          Fermer
        </Button>
        <Button 
          onClick={onRetry}
          className="flex items-center"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </div>
    </div>
  );
};

export default PDFErrorState;
