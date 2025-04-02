
import React, { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen, Calendar, Clock, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Module, ModuleContent } from './types';
import ModuleContentView, { ModuleContentViewSkeleton } from './ModuleContentView';
import YoutubeEmbed from './YoutubeEmbed';
import { useToast } from '@/hooks/use-toast';
import * as ModuleServices from '@/services/modules';

interface ActiveModuleViewProps {
  module: Module;
  onBack: () => void;
}

const ActiveModuleView: React.FC<ActiveModuleViewProps> = ({ module, onBack }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadModuleContent = async () => {
      try {
        setIsLoading(true);
        const content = await ModuleServices.getModuleContent(module.id);
        setModuleContent(content);
      } catch (error) {
        console.error("Error loading module content:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger le contenu du module.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadModuleContent();
  }, [module.id, toast]);
  
  const handleDownloadContent = () => {
    toast({
      title: "Téléchargement lancé",
      description: "Le contenu du module sera téléchargé dans quelques instants.",
    });
    
    // TODO: Implement actual PDF download functionality
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={onBack}
        >
          <ChevronLeft size={20} className="text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-white">{module.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="border border-gray-800 rounded-lg mt-0 min-h-[400px]">
              <ModuleContentView 
                content={moduleContent?.content} 
                isLoading={isLoading} 
              />
            </TabsContent>
            
            <TabsContent value="videos" className="border border-gray-800 rounded-lg mt-0 min-h-[400px]">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : moduleContent?.videos && moduleContent.videos.length > 0 ? (
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">{moduleContent.videos[0].title}</h3>
                  <YoutubeEmbed videoId={moduleContent.videos[0].videoId} />
                  <p className="text-sm text-gray-400 mt-4">{moduleContent.videos[0].description}</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800/70 flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300">Aucune vidéo disponible</h3>
                    <p className="text-sm text-gray-400 max-w-md">
                      Ce module n'a pas encore de contenu vidéo disponible. Veuillez consulter l'onglet "Contenu" pour accéder au matériel de formation.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="quiz" className="border border-gray-800 rounded-lg mt-0 min-h-[400px]">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-12 w-1/4" />
                </div>
              ) : moduleContent?.quiz ? (
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{moduleContent.quiz.title}</h3>
                  <p className="text-gray-400 mb-6">{moduleContent.quiz.description}</p>
                  <Button className="bg-mrc-blue hover:bg-blue-700">
                    Commencer le quiz
                  </Button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800/70 flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300">Aucun quiz disponible</h3>
                    <p className="text-sm text-gray-400 max-w-md">
                      Ce module n'a pas encore de quiz disponible. Veuillez consulter l'onglet "Contenu" pour accéder au matériel de formation.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BookOpen size={18} className="mr-2 text-mrc-blue" />
              Informations du module
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Durée</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1 text-gray-500" />
                  <span>{module.duration}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Niveau</span>
                <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-none">
                  {module.level}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Catégorie</span>
                <Badge className="bg-mrc-blue/20 text-mrc-blue border-none">
                  {module.category}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date mise à jour</span>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1 text-gray-500" />
                  <span>20/05/2023</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleDownloadContent}
              >
                <Download size={16} className="mr-2" />
                Télécharger PDF
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Progression</h3>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div 
                className="h-full bg-mrc-blue rounded-full" 
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <p className="text-xs text-center mt-2 text-gray-400">
              {module.progress}% complété
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveModuleView;
