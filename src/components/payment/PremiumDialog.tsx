
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/App';
import { Sparkles, X } from 'lucide-react';

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/9AQ17sdSNgb25xufZi";

const PremiumDialog: React.FC = () => {
  const { showPremiumDialog, setShowPremiumDialog, isPremium } = useAppContext();

  // Don't show dialog if user is already premium
  useEffect(() => {
    if (isPremium) {
      setShowPremiumDialog(false);
    }
  }, [isPremium, setShowPremiumDialog]);

  const handleUpgrade = () => {
    window.open(STRIPE_PAYMENT_LINK, '_blank');
    setShowPremiumDialog(false);
  };

  return (
    <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
              Passez à la version Premium
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowPremiumDialog(false)}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>Accédez à toutes les fonctionnalités premium :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Assistance IA illimitée</li>
            <li>Génération de PDF illimitée</li>
            <li>Accès à tous les modules de formation</li>
            <li>Pas de limitations journalières</li>
            <li>Support prioritaire</li>
          </ul>
          <p className="font-semibold text-center mt-4">Pour seulement 9,99€ par mois</p>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => setShowPremiumDialog(false)}
          >
            Plus tard
          </Button>
          <Button 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90"
          >
            Passer à Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
