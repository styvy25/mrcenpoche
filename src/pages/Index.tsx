
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeContent from "@/components/home/HomeContent";
import { useSEO } from "@/hooks/useSEO";
import { useEffect } from "react";
import ChatButton from "@/components/chat/ChatButton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronUp, Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  const isMobile = useIsMobile();

  useEffect(() => {
    setPageTitle("MRC en Poche - Votre application pour rester informé et engagé");
    setPageDescription("MRC en Poche vous permet de rester informé et engagé grâce à des outils interactifs et des ressources à jour.");
  }, [setPageTitle, setPageDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-grow relative">
        <HomeContent />
        
        {/* Interface améliorée pour les boutons d'action */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Collapsible>
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
                  onClick={() => window.open('/alerte-fraude', '_blank')}
                  label="Signaler une fraude"
                  colorClass="from-mrc-red to-rose-700"
                  icon={<AlertTriangle size={14} className="mr-1" />}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Position optimisée du bouton de chat */}
        <div className="fixed bottom-16 right-6 z-40">
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
