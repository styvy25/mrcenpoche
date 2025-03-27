
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeContent from "@/components/home/HomeContent";
import { useSEO } from "@/hooks/useSEO";
import { useEffect, useState } from "react";
import ChatButton from "@/components/chat/ChatButton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronUp, Info, Video } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ApiKeysDialog from "@/components/settings/ApiKeysDialog";
import DomainAnnouncement from "@/components/layout/DomainAnnouncement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LivestreamingView from "@/components/streaming/LivestreamingView";

const Index = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  const isMobile = useIsMobile();
  const { keyStatus } = useApiKeys();
  const [activeTab, setActiveTab] = useState<string>("home");
  
  useEffect(() => {
    setPageTitle("MRC en Poche - Votre application pour rester informé et engagé");
    setPageDescription("MRC en Poche vous permet de rester informé et engagé grâce à des outils interactifs et des ressources à jour.");
    
    // Enregistrer le domaine dans le localStorage pour confirmer le déploiement
    const currentHost = window.location.hostname;
    localStorage.setItem('deployment_domain', currentHost);
  }, [setPageTitle, setPageDescription]);

  const isApiConfigured = keyStatus.perplexity || keyStatus.youtube || keyStatus.stripe;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-grow relative mt-16 px-4 sm:px-8">
        {/* Annonce de domaine personnalisé */}
        <DomainAnnouncement customDomain="mrcenpoche.xyz" />
        
        {/* Alerte de configuration API si nécessaire */}
        {!isApiConfigured && (
          <div className="mb-6">
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="flex flex-col gap-2">
                <p>Certaines fonctionnalités nécessitent une configuration API</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <ApiKeysDialog 
                    triggerButton={
                      <Button variant="outline" size="sm" className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10 border-amber-500/30 text-amber-700 dark:text-amber-400">
                        Configurer les API
                      </Button>
                    }
                  />
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {/* Navigation par onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Info className="h-4 w-4" /> Accueil
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-1">
              <Video className="h-4 w-4" /> Livestreams
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="mt-4">
            <HomeContent />
          </TabsContent>
          
          <TabsContent value="live" className="mt-4">
            <LivestreamingView />
          </TabsContent>
        </Tabs>
        
        {/* Interface améliorée pour les boutons d'action */}
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <Collapsible defaultOpen>
            <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 py-2 px-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-blue-400" />
                <p className="text-xs text-gray-200">
                  {isMobile ? "Actions rapides" : "Accédez rapidement aux fonctionnalités importantes"}
                </p>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                  <ChevronUp size={14} className="text-gray-400" />
                  <span className="sr-only">Afficher/Masquer les actions</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm p-4 border-t border-gray-800/50 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ActionButton 
                  href="/assistant"
                  label="Assistant IA"
                  colorClass="from-blue-600 to-blue-800"
                />
                <ActionButton 
                  href="/news"
                  label="Actualités"
                  colorClass="from-green-600 to-green-800"
                />
                <ActionButton 
                  href="/quiz"
                  label="Quiz"
                  colorClass="from-purple-600 to-purple-800"
                />
                <ActionButton 
                  href="/alerte-fraude"
                  label="Signaler une fraude"
                  colorClass="from-mrc-red to-rose-700"
                  icon={<AlertTriangle size={14} className="mr-1" />}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Position optimisée du bouton de chat */}
        <div className="fixed bottom-20 right-6 z-30">
          <ChatButton />
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface ActionButtonProps {
  href?: string;
  onClick?: () => void;
  label: string;
  colorClass: string;
  icon?: React.ReactNode;
}

const ActionButton = ({ href, onClick, label, colorClass, icon }: ActionButtonProps) => {
  const buttonContent = (
    <Button 
      size="sm"
      className={`w-full text-xs font-medium py-2 bg-gradient-to-br ${colorClass} hover:shadow-lg transition-all duration-300`}
      onClick={onClick}
    >
      {icon}{label}
    </Button>
  );
  
  if (href) {
    return <a href={href}>{buttonContent}</a>;
  }
  
  return buttonContent;
};

export default Index;
