
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";

interface TrainingStatistic {
  id: number;
  title: string;
  module: string;
  completionRate: number;
  downloads: number;
  lastUpdated: string;
}

const demoStatistics: TrainingStatistic[] = [
  {
    id: 1,
    title: "Histoire du MRC",
    module: "Histoire et Valeurs du MRC",
    completionRate: 85,
    downloads: 178,
    lastUpdated: "15/06/2023"
  },
  {
    id: 2,
    title: "Techniques de Mobilisation - Module 1",
    module: "Techniques de Mobilisation",
    completionRate: 92,
    downloads: 221,
    lastUpdated: "02/07/2023"
  },
  {
    id: 3,
    title: "Communication Politique Efficace",
    module: "Communication Politique",
    completionRate: 78,
    downloads: 143,
    lastUpdated: "20/07/2023"
  },
  {
    id: 4,
    title: "Enjeux Politiques au Cameroun",
    module: "Enjeux Politiques au Cameroun",
    completionRate: 63,
    downloads: 110,
    lastUpdated: "05/08/2023"
  },
  {
    id: 5,
    title: "Organisation de Campagne - Bases",
    module: "Organisation de Campagne",
    completionRate: 71,
    downloads: 132,
    lastUpdated: "18/08/2023"
  }
];

const TrainingStatistics = () => {
  const [stats, setStats] = useState<TrainingStatistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = () => {
      setTimeout(() => {
        setStats(demoStatistics);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-mrc-blue">Statistiques de Formation</CardTitle>
        <CardDescription>
          Aperçu des documents de formation les plus populaires
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{stat.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.module}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Download className="h-3 w-3" /> 
                    <span className="font-medium">{stat.downloads}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Progress value={stat.completionRate} className="h-2" />
                  <span className="text-xs font-medium">{stat.completionRate}%</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Dernière mise à jour: {stat.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingStatistics;
