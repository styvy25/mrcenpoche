
import React from "react";
import PoliticalHeatmap from "@/components/political/PoliticalHeatmap";
import { Separator } from "@/components/ui/separator";

const PoliticalMapPage = () => {
  return (
    <div className="container mx-auto p-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Carte Politique du Cameroun</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Analyse de la répartition des forces politiques au Cameroun
        </p>
      </div>
      
      <Separator />
      
      <PoliticalHeatmap />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-3">À propos de cette carte</h3>
          <p className="text-sm">
            Cette carte thermique offre une visualisation des tendances politiques au Cameroun. 
            Elle est générée en mode hors-ligne avec des données synthétiques représentatives.
            Vous pouvez explorer différents partis politiques, métriques et années pour analyser
            l'évolution du paysage politique au fil du temps.
          </p>
        </div>
        
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-3">Comment interpréter les données</h3>
          <p className="text-sm mb-2">
            Les couleurs plus intenses indiquent une présence ou influence plus forte du parti
            sélectionné dans cette région. Les données sont basées sur:
          </p>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>L'implantation historique des partis dans chaque région</li>
            <li>Les résultats des dernières élections</li>
            <li>L'activité politique récente</li>
            <li>Les tendances démographiques</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PoliticalMapPage;
