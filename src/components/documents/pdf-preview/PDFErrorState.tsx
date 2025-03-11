
import { Button } from "@/components/ui/button";

interface PDFErrorStateProps {
  onRetry: () => void;
  onClose: () => void;
}

const PDFErrorState = ({ onRetry, onClose }: PDFErrorStateProps) => {
  return (
    <div className="text-center p-4 text-red-500">
      <p className="text-lg font-bold mb-2">Erreur de chargement</p>
      <p className="mb-4">Le chargement du PDF a échoué. Veuillez réessayer.</p>
      <Button className="bg-mrc-blue hover:bg-blue-700 mr-2" onClick={onRetry}>
        Réessayer
      </Button>
      <Button variant="outline" onClick={onClose}>
        Fermer
      </Button>
    </div>
  );
};

export default PDFErrorState;
