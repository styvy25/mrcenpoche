
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface AlertSubmitSectionProps {
  isSubmitting: boolean;
  description: string;
  location: string;
  onSubmit: () => void;
}

const AlertSubmitSection: React.FC<AlertSubmitSectionProps> = ({
  isSubmitting,
  description,
  location,
  onSubmit
}) => {
  return (
    <Button 
      type="submit" 
      onClick={onSubmit}
      disabled={isSubmitting || !description || !location}
      className="bg-mrc-red hover:bg-mrc-red/80"
    >
      {isSubmitting ? (
        <>
          <span className="animate-spin mr-2">⏳</span>
          Envoi...
        </>
      ) : (
        <>
          <Send className="h-4 w-4 mr-2" />
          Envoyer l'alerte
        </>
      )}
    </Button>
  );
};

export default AlertSubmitSection;
