
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import APIKeyManager from "@/components/settings/APIKeyManager";
import OfflineFeaturesCard from "@/components/settings/OfflineFeaturesCard";
import { useApiKeys } from "@/hooks/api-keys";

const APIKeysSection = () => {
  const { isAuthenticated } = useApiKeys();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Configuration des API</h2>
      </div>
      <Separator className="my-2" />
      
      {isAuthenticated && (
        <Alert variant="default" className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
          <Info className="h-4 w-4" />
          <AlertTitle>Gestion centralisée des clés API</AlertTitle>
          <AlertDescription>
            Vos clés API sont stockées de manière sécurisée sur le serveur et partagées entre tous vos appareils.
            Les modifications apportées ici seront disponibles partout où vous vous connectez.
          </AlertDescription>
        </Alert>
      )}
      
      {!isAuthenticated && (
        <Alert variant="default" className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4" />
          <AlertTitle>Mode stockage local</AlertTitle>
          <AlertDescription>
            Vous n'êtes pas connecté. Vos clés API seront stockées uniquement sur cet appareil.
            Connectez-vous pour bénéficier d'une gestion centralisée de vos clés.
          </AlertDescription>
        </Alert>
      )}
      
      <APIKeyManager />
      <OfflineFeaturesCard />
    </div>
  );
};

export default APIKeysSection;
