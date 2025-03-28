
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    "Support prioritaire"
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            Passez à Premium
          </DialogTitle>
          <DialogDescription>
            Débloquez toutes les fonctionnalités de MRC en Poche
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Fonctionnalités Premium</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center py-2">
            <div className="text-2xl font-bold">9,99 €/mois</div>
            <p className="text-xs text-gray-500">Annulation possible à tout moment</p>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Plus tard
          </Button>
          <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600" asChild>
            <Link to="/payment">
              Passer à Premium <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
