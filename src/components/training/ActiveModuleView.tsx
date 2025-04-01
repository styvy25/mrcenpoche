
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Video, FileText, Badge, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Module } from '@/components/training/types';
import AdaptiveModuleService from '@/services/adaptiveModuleService';
import YoutubeEmbed from './YoutubeEmbed';
import ModuleContentView from './ModuleContentView';
import ModuleQuizView from './ModuleQuizView';
import { useSubscription } from '@/hooks/useSubscription';

interface ActiveModuleViewProps {
  module: Module;
  onBack: () => void;
}

const ActiveModuleView: React.FC<ActiveModuleViewProps> = ({ module, onBack }) => {
  const { toast } = useToast();
  const { isPremium } = useSubscription();
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  
  useEffect(() => {
    const loadModuleContent = async () => {
      try {
        setLoading(true);
        const moduleData = await AdaptiveModuleService.getModuleContent(module.id);
        setContent(moduleData);
        
        // If the user has completed this module, load certificates
        if (module.progress === 100) {
          const certificateData = await AdaptiveModuleService.getModuleCertificates(module.id);
          setCertificates(certificateData);
        }
      } catch (error) {
        console.error("Error loading module content:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger le contenu du module.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadModuleContent();
  }, [module.id, module.progress, toast]);
  
  const handleDownloadPDF = async () => {
    if (!isPremium) {
      toast({
        title: "Fonctionnalité Premium",
        description: "Passez à l'abonnement Premium pour télécharger le contenu en PDF.",
      });
      return;
    }
    
    try {
      toast({
        title: "Préparation du PDF",
        description: "Votre PDF est en cours de génération...",
      });
      
      const pdfUrl = await AdaptiveModuleService.generateModulePDF(module.id);
      
      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
      
      toast({
        title: "PDF généré",
        description: "Votre PDF a été généré avec succès.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div>
            <h2 className="text-xl font-bold text-white">{module.title}</h2>
            {module.categoryName && (
              <p className="text-sm text-gray-400">{module.categoryName}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Progress value={module.progress} className="w-24 h-2 bg-gray-700" />
            <span className="text-sm text-gray-400">{module.progress}%</span>
          </div>
          
          <Button 
            size="sm"
            variant="outline" 
            onClick={handleDownloadPDF}
            className="gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-800">
          <TabsTrigger value="content" className="data-[state=active]:bg-gray-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Contenu
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-gray-700">
            <Video className="h-4 w-4 mr-2" />
            Vidéos
          </TabsTrigger>
          <TabsTrigger value="quiz" className="data-[state=active]:bg-gray-700">
            <FileText className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
          {module.progress === 100 && (
            <TabsTrigger value="certificate" className="data-[state=active]:bg-gray-700">
              <Award className="h-4 w-4 mr-2" />
              Certificat
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="content" className="mt-2">
          {loading ? (
            <LoadingState />
          ) : (
            <ModuleContentView content={content?.content} />
          )}
        </TabsContent>
        
        <TabsContent value="video" className="mt-2">
          {loading ? (
            <LoadingState />
          ) : content?.videos?.length > 0 ? (
            <div className="space-y-6">
              {content.videos.map((video: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                  <YoutubeEmbed videoId={video.videoId} title={video.title} />
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-400">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={<Video className="h-10 w-10" />} 
              title="Aucune vidéo disponible" 
              description="Ce module ne contient pas encore de vidéos."
            />
          )}
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-2">
          {loading ? (
            <LoadingState />
          ) : content?.quiz ? (
            <ModuleQuizView quiz={content.quiz} moduleId={module.id} />
          ) : (
            <EmptyState 
              icon={<FileText className="h-10 w-10" />} 
              title="Aucun quiz disponible" 
              description="Ce module ne contient pas encore de quiz."
            />
          )}
        </TabsContent>
        
        {module.progress === 100 && (
          <TabsContent value="certificate" className="mt-2">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-900/30 via-yellow-900/30 to-red-900/30 p-6 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{certificate.title}</h3>
                        <p className="text-sm text-gray-400">{certificate.description}</p>
                      </div>
                      <Badge className="h-10 w-10 bg-yellow-600 flex items-center justify-center p-1">
                        <Award className="h-6 w-6" />
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-400">
                        Obtenu le {new Date(certificate.issuedAt).toLocaleDateString()}
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1.5" />
                        Télécharger
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<Award className="h-10 w-10" />} 
                title="Aucun certificat disponible" 
                description="Terminez ce module pour obtenir votre certificat."
              />
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-800/50 rounded-lg">
      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-gray-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  );
};

const LoadingState: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-800 rounded w-1/4"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="h-64 bg-gray-800 rounded w-full"></div>
    </div>
  );
};

export default ActiveModuleView;
