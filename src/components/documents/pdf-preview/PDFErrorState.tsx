
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface PDFErrorStateProps {
  onRetry: () => void;
  onClose: () => void;
}

const PDFErrorState = ({ onRetry, onClose }: PDFErrorStateProps) => {
  return (
    <div className="text-center p-6 flex flex-col items-center justify-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-lg font-bold mb-2 text-red-500">Erreur de chargement</p>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Le chargement du PDF a échoué. Cela peut être dû à des problèmes de réseau ou de restrictions d'accès.
      </p>
      <div className="flex gap-3 mt-2">
        <Button 
          className="bg-mrc-blue hover:bg-blue-700" 
          onClick={onRetry}
        >
          Réessayer
        </Button>
        <Button 
          variant="outline" 
          onClick={onClose}
        >
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default PDFErrorState;
