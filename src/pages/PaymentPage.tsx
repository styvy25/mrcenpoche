
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';

const PaymentPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  const [selectedPlan, setSelectedPlan] = useState<{price: number, type: string} | null>(null);
  
  const handleSelectPlan = (price: number, type: string) => {
    setSelectedPlan({price, type});
    setStep(2);
  };

  const handlePaymentSuccess = () => {
    setStep(3);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">
            Paiement - MRC en Poche
          </h1>
          <p className="text-muted-foreground mt-2">
            Accédez à tous les contenus premium en quelques clics
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-mrc-blue text-white' : 'bg-gray-200'}`}>1</div>
            <div className={`h-1 w-8 ${step >= 2 ? 'bg-mrc-blue' : 'bg-gray-200'}`}></div>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-mrc-blue text-white' : 'bg-gray-200'}`}>2</div>
            <div className={`h-1 w-8 ${step >= 3 ? 'bg-mrc-blue' : 'bg-gray-200'}`}></div>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-mrc-blue text-white' : 'bg-gray-200'}`}>3</div>
          </div>
        </div>
        
        {step === 1 && (
          <Card>
            <CardContent className={`p-4 md:p-6 ${isMobile ? 'mobile-padding' : ''}`}>
              <h2 className="text-xl font-semibold mb-4">Choisissez votre forfait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="border rounded-lg p-4 hover:border-mrc-blue cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleSelectPlan(9.99, "Mensuel")}
                >
                  <h3 className="font-medium">Mensuel</h3>
                  <div className="text-2xl font-bold my-2">9,99€ <span className="text-sm font-normal text-gray-500">/mois</span></div>
                  <p className="text-gray-500 text-sm">Accès à tout le contenu pendant 30 jours</p>
                  <Button className="w-full mt-4">
                    Sélectionner
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div 
                  className="border rounded-lg p-4 hover:border-mrc-blue cursor-pointer transition-all hover:shadow-md bg-blue-50"
                  onClick={() => handleSelectPlan(89.99, "Annuel")}
                >
                  <div className="mb-2 text-xs font-medium text-mrc-blue bg-blue-100 rounded-full px-2 py-1 w-fit">Populaire</div>
                  <h3 className="font-medium">Annuel</h3>
                  <div className="text-2xl font-bold my-2">89,99€ <span className="text-sm font-normal text-gray-500">/an</span></div>
                  <p className="text-gray-500 text-sm">Accès à tout le contenu pendant 12 mois<br /><span className="text-mrc-blue font-medium">Économisez 25%</span></p>
                  <Button className="w-full mt-4 bg-mrc-blue hover:bg-blue-700">
                    Sélectionner
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 2 && (
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setStep(1)} 
              className="mb-4"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            <StripePaymentForm 
              amount={selectedPlan?.price || 89.99} 
              onSuccess={handlePaymentSuccess}
              onCancel={() => setStep(1)}
            />
          </div>
        )}
        
        {step === 3 && (
          <Card>
            <CardContent className="p-6 md:p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
              <p className="text-gray-600 mb-6">Merci pour votre achat. Vous avez maintenant accès à tout le contenu premium de MRC en Poche.</p>
              <Button onClick={handleBackToHome}>
                Retourner à l'accueil
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
