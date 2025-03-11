
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Key, AlertTriangle, WifiOff, CheckCircle } from 'lucide-react';
import { useApplicationStatus } from '@/hooks/useApplicationStatus';

const ApplicationStatus = () => {
  const { isOnline, isApiKeySet, apiKeyStatus } = useApplicationStatus();
  const navigate = useNavigate();

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  // Si tout est configuré correctement, ne rien afficher
  if (isOnline && isApiKeySet) {
    return null;
  }

  // Récupérer la liste des services configurés
  const configuredServices = [];
  if (apiKeyStatus?.perplexity) configuredServices.push('Perplexity');
  if (apiKeyStatus?.youtube) configuredServices.push('YouTube');
  if (apiKeyStatus?.stripe) configuredServices.push('Stripe');

  return (
    <div className="space-y-3 mb-4">
      {!isOnline && (
        <Alert variant="destructive" className="bg-amber-500/20 border-amber-500/30">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            Mode hors-ligne
          </AlertTitle>
          <AlertDescription>
            Vous êtes actuellement en mode hors-ligne. L'application utilise des données mises en cache, certaines fonctionnalités peuvent être limitées.
          </AlertDescription>
        </Alert>
      )}
      
      {isOnline && !isApiKeySet && (
        <Alert variant="default" className="bg-blue-500/10 border-blue-500/20">
          <AlertTitle className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Configuration requise
          </AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Configurez au moins une clé API pour activer toutes les fonctionnalités de l'application.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoToSettings}
              className="self-start mt-1"
            >
              <Key className="h-3 w-3 mr-1" />
              Configurer les APIs
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {isOnline && isApiKeySet && configuredServices.length > 0 && (
        <Alert variant="default" className="bg-green-500/10 border-green-500/20">
          <AlertTitle className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Services configurés
          </AlertTitle>
          <AlertDescription>
            Les services suivants sont actifs: {configuredServices.join(', ')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ApplicationStatus;
