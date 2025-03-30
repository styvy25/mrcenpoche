
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Shield, YoutubeIcon } from "lucide-react";

const APIKeyManagerHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Key className="h-5 w-5 text-blue-500" />
        Configuration des clés API
      </CardTitle>
      <CardDescription>
        Configurez vos clés API pour activer toutes les fonctionnalités de l'application
      </CardDescription>
      <div className="mt-4 grid gap-3">
        <Alert className="bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            Ces clés sont stockées localement et ne sont jamais envoyées à nos serveurs.
          </AlertDescription>
        </Alert>
        
        <Alert className="bg-red-50/50 dark:bg-red-950/50 border-red-200 dark:border-red-800">
          <YoutubeIcon className="h-4 w-4 text-red-500" />
          <AlertDescription>
            La clé API YouTube est nécessaire pour l'analyse et le téléchargement de vidéos YouTube.
          </AlertDescription>
        </Alert>
      </div>
    </CardHeader>
  );
};

export default APIKeyManagerHeader;
