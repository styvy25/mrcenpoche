
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface PDFErrorStateProps {
  onRetry: () => void;
  onClose: () => void;
}

const PDFErrorState = ({ onRetry, onClose }: PDFErrorStateProps) => {
  return (
    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <AlertTriangle className="text-red-500 h-12 w-12 mx-auto mb-4" />
      <p className="text-lg font-bold mb-2 text-red-600">Erreur de chargement</p>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Le chargement du PDF a échoué. Cela peut être dû à des restrictions CORS ou à un problème de connexion.
      </p>
      <div className="space-x-3">
        <Button className="bg-mrc-blue hover:bg-blue-700" onClick={onRetry}>
          Réessayer
        </Button>
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default PDFErrorState;
