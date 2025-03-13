
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

interface PaymentLayoutProps {
  children: React.ReactNode;
}

const PaymentLayout: React.FC<PaymentLayoutProps> = ({ children }) => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">
            Paiement - MRC en Poche
          </h1>
          <p className="text-muted-foreground mt-2">
            Traitement sécurisé de votre paiement
          </p>
        </div>
        {children}
      </div>
    </MainLayout>
  );
};

export default PaymentLayout;
