
import React from 'react';
import { Button } from '@/components/ui/button';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ 
  amount, 
  onCancel 
}) => {
  const handleRedirectToStripe = () => {
    // Redirect to the fixed Stripe checkout page
    window.location.href = "https://buy.stripe.com/14kcQabKFbUM9NK8wT";
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">Total à payer</span>
          <span className="text-lg font-bold">{amount.toFixed(2)} €</span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Le paiement sera traité de manière sécurisée par Stripe.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleRedirectToStripe}
              className="w-full bg-mrc-blue hover:bg-blue-700"
            >
              Procéder au paiement sécurisé
            </Button>
            
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full"
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentForm;
