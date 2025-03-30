
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Wifi, WifiOff } from "lucide-react";

const OfflineFeaturesCard = () => {
  return (
    <Card className="mt-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <WifiOff className="h-4 w-4 text-gray-500" />
          Fonctionnalités hors-ligne
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Ces fonctionnalités sont disponibles même sans clés API configurées.
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Assistant IA en mode de base (réponses génériques)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Générateur de documents de base
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Consulter les modules et quizzes MRC
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Chat en mode texte
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineFeaturesCard;
