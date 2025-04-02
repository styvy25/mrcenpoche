
import React, { useState, useEffect, useCallback } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadModuleContent = async () => {
      try {
        setLoading(true);
        const moduleData = await ModuleServices.getModuleContent(module.id);
        
        if (isMounted) {
          setContent(moduleData);
          
          // If the user has completed this module, load certificates
          if (module.progress === 100) {
            const certificateData = await ModuleServices.getModuleCertificates(module.id);
            setCertificates(certificateData);
          }
          
          // Small delay to ensure smooth transition
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 300);
        }
      } catch (error) {
        console.error("Error loading module content:", error);
        if (isMounted) {
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger le contenu du module.",
            variant: "destructive"
          });
          setLoading(false);
        }
      }
    };
    
    loadModuleContent();
    
    return () => {
      isMounted = false;
    };
  }, [module.id, module.progress, toast]);
  
  const handleTabChange = (tab: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setLoading(true);
    
    // Small delay to prevent flickering
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setLoading(false);
        setIsTransitioning(false);
      }, 200);
    }, 100);
  };
  
  const handleDownloadPDF = useCallback(async () => {
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
  }, [isPremium, module.id, toast]);

  const renderTabContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    
    switch(activeTab) {
      case 'content':
        return <ModuleContentView content={content?.content} />;
      case 'video':
        return <VideoTabContent loading={false} videos={content?.videos} />;
      case 'quiz':
        return content?.quiz ? (
          <ModuleQuizView quiz={content.quiz} moduleId={module.id} />
        ) : (
          <EmptyState 
            icon={<FileText className="h-10 w-10" />} 
            title="Aucun quiz disponible" 
            description="Ce module ne contient pas encore de quiz."
          />
        );
      case 'certificate':
        return <CertificateTabContent certificates={certificates} />;
      default:
        return null;
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
        onTabChange={handleTabChange} 
        showCertificateTab={module.progress === 100}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab + (loading ? "-loading" : "-content")}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="pt-2 no-flicker"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </ModuleTabs>
    </div>
  );
};

export default React.memo(ActiveModuleView);
