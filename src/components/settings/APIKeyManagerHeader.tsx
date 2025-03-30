
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key } from "lucide-react";

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
      <Alert className="mt-4 bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
        <AlertDescription>
          Ces clés sont stockées localement et ne sont jamais envoyées à nos serveurs. 
          Elles sont utilisées pour accéder aux services externes comme Perplexity AI et YouTube.
        </AlertDescription>
      </Alert>
    </CardHeader>
  );
};

export default APIKeyManagerHeader;
