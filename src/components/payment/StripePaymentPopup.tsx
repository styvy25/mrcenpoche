
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import { usePlanLimits } from "@/hooks/usePlanLimits";

interface StripePaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Lien Stripe fourni par l'utilisateur
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/28odUe9Cx4skbVS9AW";

const StripePaymentPopup: React.FC<StripePaymentPopupProps> = ({ isOpen, onClose }) => {
  const { updateUserPlan } = usePlanLimits();

  const handlePaymentClick = () => {
    window.open(STRIPE_PAYMENT_LINK, "_blank");
    
    // Only for demo purposes - in a real app this would be triggered by the Stripe webhook
    setTimeout(() => {
      updateUserPlan('premium');
    }, 2000);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accéder aux fonctionnalités premium</DialogTitle>
          <DialogDescription>
            Obtenez un accès complet à toutes les fonctionnalités de MRC en Poche.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Fonctionnalités premium</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                Messages illimités avec l'assistant
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                Génération illimitée de documents
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                Tous les quiz disponibles
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                Support prioritaire
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold mb-1">9,99 €/mois</p>
            <p className="text-sm text-gray-500">Annulation possible à tout moment</p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
          <div className="flex items-center text-xs text-gray-500">
            <Lock className="h-3 w-3 mr-1" /> Paiement sécurisé
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Annuler
            </Button>
            <Button 
              onClick={handlePaymentClick} 
              className="w-full sm:w-auto bg-mrc-blue hover:bg-mrc-blue/90 gap-1"
            >
              Payer <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StripePaymentPopup;
