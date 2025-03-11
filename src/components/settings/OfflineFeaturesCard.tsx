
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const OfflineFeaturesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Fonctionnalités hors-ligne
        </CardTitle>
        <CardDescription>
          Informations sur le fonctionnement de l'application en mode hors-ligne
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <p>
            MRC en Poche est conçu pour fonctionner même sans connexion Internet. Voici comment les fonctionnalités principales se comportent en mode hors-ligne:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Assistant IA:</strong> Utilise des réponses prédéfinies et des réponses précédemment mises en cache.
            </li>
            <li>
              <strong>Vidéos YouTube:</strong> Affiche des vidéos préchargées liées au MRC.
            </li>
            <li>
              <strong>Modules de formation:</strong> Tout le contenu des modules est disponible hors-ligne.
            </li>
            <li>
              <strong>Documents PDF:</strong> Les documents précédemment générés sont accessibles hors-ligne.
            </li>
          </ul>
          
          <p>
            Pour une expérience optimale, nous recommandons de vous connecter périodiquement à Internet afin de mettre à jour le contenu et d'accéder à toutes les fonctionnalités.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineFeaturesCard;
