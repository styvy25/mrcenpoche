
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'react-router-dom';
import PaymentStatus from '@/components/payment/PaymentStatus';
import PaymentHeader from '@/components/payment/PaymentHeader';
import { usePaymentState } from '@/hooks/payment/usePaymentState';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { 
    subscription, 
    loading, 
    currentPlan, 
    success, 
    canceled 
  } = usePaymentState(searchParams);
  
  useEffect(() => {
    if (success) {
      toast({
        title: "Paiement réussi",
        description: "Votre abonnement a été activé avec succès",
      });
    } else if (canceled) {
      toast({
        title: "Paiement annulé",
        description: "Votre opération de paiement a été annulée",
        variant: "destructive",
      });
    }
  }, [success, canceled, toast]);

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <PaymentHeader title="Mon abonnement" />
          <PaymentStatus 
            success={success}
            canceled={canceled}
            loading={loading}
            subscription={subscription}
            currentPlan={currentPlan}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
