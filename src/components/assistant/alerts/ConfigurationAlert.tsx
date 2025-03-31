
import React from 'react';
import { Key } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ConfigurationAlertProps {
  onConfigureClick: () => void;
}

const ConfigurationAlert: React.FC<ConfigurationAlertProps> = ({ onConfigureClick }) => {
  return (
    <Alert variant="default" className="mx-4 mt-4 bg-blue-500/10 border-blue-500/20 backdrop-blur-lg z-10">
      <AlertTitle className="flex items-center gap-2">
        <Key className="h-4 w-4" />
        Configuration requise
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Configurez votre clé API Perplexity pour activer toutes les fonctionnalités de l'assistant IA.</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onConfigureClick}
          className="self-start mt-1 bg-blue-500/10 border-blue-500/40 hover:bg-blue-500/20"
        >
          <Key className="h-3 w-3 mr-1" />
          Configurer API
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ConfigurationAlert;
