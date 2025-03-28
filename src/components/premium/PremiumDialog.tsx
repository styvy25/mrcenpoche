
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Sparkles } from 'lucide-react';

interface PremiumDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumDialog: React.FC<PremiumDialogProps> = ({ isOpen, onClose }) => {
  const features = [
    "Messages illimités avec l'assistant IA",
    "Création illimitée de documents PDF",
    "Accès à tous les quiz et examens",
    "Pas de publicités",
    "Support prioritaire",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span>Passez à Premium</span>
          </DialogTitle>
          <DialogDescription>
            Déverrouillez toutes les fonctionnalités de MRC en Poche
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-center mb-4">
              <span className="text-lg font-bold">9,99 €</span>
              <span className="text-sm text-muted-foreground">/mois</span>
            </div>
            
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-sm text-center text-muted-foreground">
            Annulez à tout moment. Facturation mensuelle.
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Pas maintenant
          </Button>
          <a
            href="https://buy.stripe.com/14kcQabKFbUM9NK8wT"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600">
              <CreditCard className="mr-2 h-4 w-4" />
              Passer à Premium
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
