
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { usePaymentStatus } from '@/hooks/payment/usePaymentStatus';
import PaymentHeader from '@/components/payment/PaymentHeader';
import PaymentStatus from '@/components/payment/PaymentStatus';
import PaymentSummary from '@/components/payment/PaymentSummary';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const { paymentStatus, progress } = usePaymentStatus(sessionId);

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
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* Main column */}
          <div className="md:col-span-3">
            <Card className="overflow-hidden border-2 transition-all duration-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-mrc-blue/10 to-mrc-green/10 pb-6">
                <PaymentHeader status={paymentStatus} progress={progress} />
              </CardHeader>
              
              <CardContent className="pt-6">
                <PaymentStatus status={paymentStatus} progress={progress} />
              </CardContent>
              
              {paymentStatus === 'error' && (
                <CardFooter className="bg-gray-50 border-t py-4">
                  <div className="w-full text-sm text-gray-500 text-center">
                    <p className="flex items-center justify-center">
                      Besoin d'aide? <a href="mailto:support@mrcenpoche.com" className="text-mrc-blue hover:underline inline-flex items-center ml-1">
                        Contacter le support <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
          
          {/* Side column */}
          <div className="md:col-span-1">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
