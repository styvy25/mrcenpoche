
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { CheckCircle, X, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PremiumDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/9AQ17sdSNgb25xufZi";

const PremiumDialog: React.FC<PremiumDialogProps> = ({ isOpen, onClose }) => {
  const { updateUserPlan } = usePlanLimits();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const premiumFeatures = [
    "Accès illimité à tous les modules",
    "Assistant IA Styvy237 sans limite",
    "Génération de PDF illimitée",
    "Suivi de progression avancé",
    "Accès aux webinaires exclusifs",
    "Certificats de formation"
  ];

  const handleUpgradeClick = () => {
    setIsRedirecting(true);
    
    // Simuler un délai avant la redirection
    setTimeout(() => {
      // Dans un environnement de production, vous devriez
      // idéalement rediriger vers une page de paiement et
      // attendre une confirmation avant de mettre à jour le plan
      window.open(STRIPE_CHECKOUT_URL, '_blank');
      
      // Pour la démonstration, nous mettons à jour le plan après 
      // l'ouverture de la fenêtre (dans un cas réel, cela se ferait 
      // après confirmation du paiement via webhook)
      toast({
        title: "Redirection vers la page de paiement",
        description: "Une nouvelle fenêtre a été ouverte pour finaliser votre achat.",
      });
      
      setIsRedirecting(false);
      onClose();
    }, 1000);
  };

  const handleDemoUpgrade = () => {
    // Uniquement pour la démonstration - en production, cela viendrait après confirmation du paiement
    updateUserPlan('premium');
    toast({
      title: "Mode premium activé",
      description: "Pour la démonstration uniquement. En production, cela se ferait après confirmation du paiement.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isRedirecting && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Passez à l'offre Premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Débloquez toutes les fonctionnalités de MRC en Poche pour seulement 9,99€/mois
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg mt-6">
            <h4 className="font-medium mb-2">Votre soutien compte</h4>
            <p className="text-sm text-muted-foreground">
              En choisissant l'offre premium, vous soutenez directement le MRC et contribuez à la diffusion de ses idées.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
            disabled={isRedirecting}
          >
            <X className="h-4 w-4 mr-2" />
            Pas maintenant
          </Button>
          
          <Button 
            onClick={handleUpgradeClick}
            className="w-full sm:w-auto bg-gradient-to-r from-mrc-blue to-mrc-green text-white hover:from-mrc-green hover:to-mrc-blue"
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
            ) : (
              <ExternalLink className="h-4 w-4 mr-2" />
            )}
            Passer à Premium
          </Button>
          
          {process.env.NODE_ENV !== 'production' && (
            <Button 
              onClick={handleDemoUpgrade}
              variant="secondary"
              className="w-full sm:w-auto"
              disabled={isRedirecting}
            >
              (Demo) Activer Premium
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
