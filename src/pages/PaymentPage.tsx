
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PaymentPage: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  
  useEffect(() => {
    // Simuler un processus de vérification de paiement
    const checkPaymentStatus = async () => {
      try {
        // Normalement, vous feriez une vérification auprès de votre API Stripe ici
        // Pour cette simulation, nous allons considérer le paiement comme réussi après 2 secondes
        setTimeout(() => {
          setPaymentStatus('success');
          toast({
            title: "Paiement confirmé",
            description: "Votre paiement a été traité avec succès",
          });
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        setPaymentStatus('error');
        toast({
          title: "Erreur de paiement",
          description: "Une erreur est survenue lors du traitement de votre paiement",
          variant: "destructive",
        });
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    } else {
      setPaymentStatus('error');
      toast({
        title: "Session invalide",
        description: "Aucune session de paiement n'a été trouvée",
        variant: "destructive",
      });
    }
  }, [sessionId, toast]);

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
            Traitement de votre paiement
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6 md:p-8 text-center">
            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mrc-blue mb-4"></div>
                <h2 className="text-xl font-semibold mb-2">Traitement en cours...</h2>
                <p className="text-gray-600">Nous traitons votre paiement, veuillez patienter.</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center justify-center">
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
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="flex flex-col items-center justify-center">
                <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Erreur de paiement</h2>
                <p className="text-gray-600 mb-6">Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer ou contacter le support.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={() => navigate('/settings')}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Vérifier vos paramètres
                  </Button>
                  <Button onClick={handleBackToHome}>
                    Retourner à l'accueil
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
