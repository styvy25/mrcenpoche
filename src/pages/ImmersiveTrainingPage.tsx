
import React, { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import ImmersiveTrainingSpace from "@/components/modules/training/ImmersiveTrainingSpace";
import { useToast } from "@/components/ui/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Award, BookOpen, Users, Video, Certificate, MessageSquare, Settings } from "lucide-react";
import { Link } from 'react-router-dom';

const ImmersiveTrainingPage: React.FC = () => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  const [activeTab, setActiveTab] = useState<'scenarios' | 'videos' | 'community'>('scenarios');
  
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
        
        <Tabs value={activeTab} onValueChange={(value: 'scenarios' | 'videos' | 'community') => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="scenarios" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Scénarios
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center">
              <Video className="mr-2 h-4 w-4" />
              Vidéos
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Communauté
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scenarios" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Vidéos de formation</CardTitle>
                <CardDescription>
                  Apprenez grâce à nos vidéos explicatives et tutoriels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Video cards will be displayed here */}
                  {/* Placeholder for video content */}
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4 aspect-video flex flex-col">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded aspect-video mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="font-medium">Introduction au MRC</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">15:24 - Histoire et valeurs</p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4 aspect-video flex flex-col">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded aspect-video mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="font-medium">Techniques de mobilisation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">23:10 - Stratégies de terrain</p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4 aspect-video flex flex-col">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded aspect-video mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="font-medium">Communication politique</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">18:45 - Message efficace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Forum de discussion</CardTitle>
                <CardDescription>
                  Échangez avec d'autres militants et partagez vos expériences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Rejoignez la communauté</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Connectez-vous pour accéder au forum de discussion et partager vos idées
                  </p>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Accéder au forum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
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
