
import React from 'react';
import { CreditCard, Check, AlertTriangle } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface PaymentHeaderProps {
  status: 'processing' | 'success' | 'error';
  progress: number;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ status, progress }) => {
  return (
    <>
      <CardTitle className="flex items-center gap-2">
        {status === 'processing' && (
          <>
            <CreditCard className="h-5 w-5 text-mrc-blue" />
            Traitement du paiement
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="h-5 w-5 text-green-600" />
            Paiement réussi
          </>
        )}
        {status === 'error' && (
          <>
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Erreur de paiement
          </>
        )}
      </CardTitle>
      
      <CardDescription>
        {status === 'processing' && "Votre paiement est en cours de traitement..."}
        {status === 'success' && "Félicitations ! Votre paiement a été traité avec succès."}
        {status === 'error' && "Une erreur est survenue lors du traitement de votre paiement."}
      </CardDescription>
      
      {status === 'processing' && (
        <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-mrc-blue to-mrc-green transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default PaymentHeader;
