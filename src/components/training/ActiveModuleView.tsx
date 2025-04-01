
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Module } from '@/components/training/types';
import * as ModuleServices from '@/services/modules';
import { useSubscription } from '@/hooks/useSubscription';
import ModuleContentView from './ModuleContentView';
import ModuleQuizView from './ModuleQuizView';
import ModuleHeader from './module-view/ModuleHeader';
import ModuleTabs from './module-view/ModuleTabs';
import LoadingState from './module-view/LoadingState';
import EmptyState from './module-view/EmptyState';
import VideoTabContent from './module-view/VideoTabContent';
import CertificateTabContent from './module-view/CertificateTabContent';
import { TabsContent } from '@/components/ui/tabs';

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
        const moduleData = await ModuleServices.getModuleContent(module.id);
        setContent(moduleData);
        
        // If the user has completed this module, load certificates
        if (module.progress === 100) {
          const certificateData = await ModuleServices.getModuleCertificates(module.id);
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
      
      const pdfUrl = await ModuleServices.generateModulePDF(module.id);
      
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
      <ModuleHeader 
        module={module} 
        onBack={onBack} 
        onDownloadPdf={handleDownloadPDF} 
      />
      
      <ModuleTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        showCertificateTab={module.progress === 100}
      >
        <TabsContent value="content" className="mt-2">
          {loading ? (
            <LoadingState />
          ) : (
            <ModuleContentView content={content?.content} />
          )}
        </TabsContent>
        
        <TabsContent value="video" className="mt-2">
          <VideoTabContent loading={loading} videos={content?.videos} />
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
            <CertificateTabContent certificates={certificates} />
          </TabsContent>
        )}
      </ModuleTabs>
    </div>
  );
};

export default ActiveModuleView;
