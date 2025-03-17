
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Crown, XCircle } from "lucide-react";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import PremiumDialog from "./PremiumDialog";

interface PremiumBannerProps {
  type: 'chat' | 'pdf' | 'modules';
  className?: string;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ type, className = '' }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { userPlan, getUsageStats } = usePlanLimits();
  
  // Si l'utilisateur est déjà premium, ne pas afficher la bannière
  if (userPlan !== 'free' || isDismissed) {
    return null;
  }
  
  const stats = getUsageStats();
  
  let title = '';
  let description = '';
  
  switch (type) {
    case 'chat':
      title = "Limite de messages chat";
      description = `Vous avez utilisé ${stats.chatMessagesToday}/${stats.chatMessagesLimit} messages aujourd'hui. Passez à Premium pour un accès illimité.`;
      break;
    case 'pdf':
      title = "Limite de génération PDF";
      description = `Vous avez utilisé ${stats.pdfGenerationsThisMonth}/${stats.pdfGenerationsLimit} générations ce mois-ci. Passez à Premium pour un accès illimité.`;
      break;
    case 'modules':
      title = "Accès limité aux modules";
      description = "Certains modules avancés nécessitent un abonnement Premium. Débloquez tout le contenu dès maintenant.";
      break;
  }
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };
  
  return (
    <>
      <Alert 
        className={`bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors ${className}`}
        onClick={handleOpenDialog}
      >
        <Crown className="h-4 w-4 text-amber-500" />
        <AlertTitle className="flex items-center gap-2">
          {title}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 w-5 p-0 ml-auto" 
            onClick={handleDismiss}
          >
            <XCircle className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
          <span>{description}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 self-start sm:self-center"
          >
            <Crown className="h-3 w-3 mr-1" />
            Passer à Premium
          </Button>
        </AlertDescription>
      </Alert>
      
      <PremiumDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default PremiumBanner;
