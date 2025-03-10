
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Trophy, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModuleProgressProps {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  totalTime: string;
  rank: string;
}

const ModuleProgress: React.FC<ModuleProgressProps> = ({
  totalModules,
  completedModules,
  totalLessons,
  completedLessons,
  totalTime,
  rank,
}) => {
  const moduleProgressPercentage = (completedModules / totalModules) * 100;
  const lessonProgressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Votre progression</CardTitle>
        <CardDescription>
          Suivez votre avancement dans la formation MRC
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-mrc-blue" />
                Modules complétés
              </h3>
              <span className="text-lg font-bold text-mrc-blue">
                {completedModules}/{totalModules}
              </span>
            </div>
            <Progress value={moduleProgressPercentage} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {moduleProgressPercentage.toFixed(0)}% des modules terminés
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-mrc-green" />
                Leçons complétées
              </h3>
              <span className="text-lg font-bold text-mrc-green">
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <Progress value={lessonProgressPercentage} className="h-2 bg-gray-200 text-mrc-green" />
            <p className="text-xs text-gray-500 mt-2">
              {lessonProgressPercentage.toFixed(0)}% des leçons terminées
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Clock className="h-8 w-8 text-mrc-blue mb-2" />
            <span className="text-lg font-bold">{totalTime}</span>
            <span className="text-xs text-gray-500">Temps d'étude</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-lg font-bold">{rank}</span>
            <span className="text-xs text-gray-500">Votre rang</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 text-mrc-green mb-2" />
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">254</span>
              <Badge className="bg-green-500 text-white font-normal">+12</Badge>
            </div>
            <span className="text-xs text-gray-500">Autres apprenants</span>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-mrc-blue/10 to-mrc-green/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-mrc-blue/20 rounded-full p-2">
              <User className="h-5 w-5 text-mrc-blue" />
            </div>
            <div>
              <h3 className="font-medium">Prochaine étape recommandée</h3>
              <p className="text-sm text-gray-600 mt-1">
                Complétez le module "Techniques de Mobilisation" pour progresser au niveau Militant.
              </p>
              <div className="mt-3">
                <Progress value={35} className="h-1.5 mb-1" />
                <p className="text-xs text-gray-500">
                  35% vers le prochain niveau
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleProgress;
