
import React from 'react';
import { AlertTriangle, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const OfflineAlert = () => {
  return (
    <Alert variant="destructive" className="mx-4 mt-4 bg-amber-500/20 border-amber-500/30 backdrop-blur-lg z-10">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        Mode hors-ligne
      </AlertTitle>
      <AlertDescription>
        Vous êtes actuellement en mode hors-ligne. L'assistant utilise des réponses prédéfinies et précédemment mises en cache.
      </AlertDescription>
    </Alert>
  );
};

export default OfflineAlert;
