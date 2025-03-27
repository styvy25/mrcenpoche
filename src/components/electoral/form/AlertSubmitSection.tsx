
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";

interface AlertSubmitSectionProps {
  isSubmitting: boolean;
}

const AlertSubmitSection: React.FC<AlertSubmitSectionProps> = ({ isSubmitting }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm text-red-800 dark:text-red-200">
        <p className="font-medium">Important :</p>
        <p>Ce formulaire vous permet de signaler une fraude électorale potentielle. Les informations fournies seront transmises aux autorités compétentes.</p>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-red-600 hover:bg-red-700 text-white" 
        disabled={isSubmitting}
      >
        <AlertOctagon className="mr-2 h-4 w-4" />
        {isSubmitting ? "Envoi en cours..." : "Soumettre l'alerte"}
      </Button>
    </div>
  );
};

export default AlertSubmitSection;
