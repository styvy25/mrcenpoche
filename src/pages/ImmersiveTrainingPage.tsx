
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import ImmersiveTrainingSpace from "@/components/modules/training/ImmersiveTrainingSpace";
import { useToast } from "@/hooks/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, BookOpen, Users } from "lucide-react";
import { Link } from 'react-router-dom';

const ImmersiveTrainingPage: React.FC = () => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  
  const handleTrainingComplete = async () => {
    await addPoints(50);
    toast({
      title: "Formation complétée !",
      description: "Vous avez gagné 50 points d'expérience",
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/modules">
              <Button variant="outline" size="sm" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux modules
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">Formation Politique Immersive</h1>
            <p className="text-gray-600 dark:text-gray-400">Développez vos compétences avec nos scénarios interactifs</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Ressources
            </Button>
            <Link to="/modules/reunions">
              <Button variant="default" size="sm" className="bg-mrc-blue">
                <Users className="mr-2 h-4 w-4" />
                Réunions virtuelles
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-3">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Scénarios d'apprentissage interactifs</CardTitle>
                <CardDescription>
                  Mettez en pratique vos connaissances dans des situations réelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImmersiveTrainingSpace onTrainingComplete={handleTrainingComplete} />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
          <Award className="h-10 w-10 text-mrc-blue mr-4" />
          <div>
            <h3 className="font-medium text-lg">Gagnez des points et des badges</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complétez des scénarios pour gagner des points d'expérience et débloquer de nouvelles fonctionnalités
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImmersiveTrainingPage;
