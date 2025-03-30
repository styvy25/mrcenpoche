
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, Check } from "lucide-react";

const OfflineFeaturesCard = () => {
  return (
    <Card className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-blue-500" />
          Fonctionnalités disponibles hors-ligne
        </CardTitle>
        <CardDescription>
          Ces fonctionnalités restent disponibles même sans connexion internet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <span className="font-medium">Assistant IA en mode hors-ligne</span>
              <p className="text-sm text-muted-foreground">
                L'assistant utilise des réponses en cache lorsque vous êtes hors-ligne
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <span className="font-medium">Documents téléchargés</span>
              <p className="text-sm text-muted-foreground">
                Accédez aux documents et vidéos que vous avez téléchargés précédemment
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <span className="font-medium">Quiz et modules éducatifs</span>
              <p className="text-sm text-muted-foreground">
                Continuez votre apprentissage même sans connexion internet
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default OfflineFeaturesCard;
