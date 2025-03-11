
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ExternalLink, CreditCard, Check, Lock, AlertTriangle, Receipt, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const PaymentPage: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate a progress bar during payment processing
    if (paymentStatus === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (paymentStatus === 'success' || paymentStatus === 'error') {
      setProgress(100);
    }
  }, [paymentStatus]);
  
  useEffect(() => {
    // Simuler un processus de vérification de paiement
    const checkPaymentStatus = async () => {
      try {
        // Normalement, vous feriez une vérification auprès de votre API Stripe ici
        // Pour cette simulation, nous allons considérer le paiement comme réussi après 2 secondes
        setTimeout(() => {
          if (Math.random() > 0.2) { // 80% de chance de succès pour la démo
            setPaymentStatus('success');
            toast({
              title: "Paiement confirmé",
              description: "Votre paiement a été traité avec succès",
            });
          } else {
            setPaymentStatus('error');
            toast({
              title: "Erreur de paiement",
              description: "Une erreur est survenue lors du traitement de votre paiement",
              variant: "destructive",
            });
          }
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

  // Information sécurité paiement
  const securityFeatures = [
    { icon: <Lock className="h-4 w-4" />, text: "Paiement sécurisé SSL" },
    { icon: <Check className="h-4 w-4" />, text: "Données cryptées" },
    { icon: <CreditCard className="h-4 w-4" />, text: "Aucune information bancaire stockée" },
  ];

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
          {/* Colonne principale */}
          <div className="md:col-span-3">
            <Card className="overflow-hidden border-2 transition-all duration-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-mrc-blue/10 to-mrc-green/10 pb-6">
                <CardTitle className="flex items-center gap-2">
                  {paymentStatus === 'processing' && (
                    <>
                      <CreditCard className="h-5 w-5 text-mrc-blue" />
                      Traitement du paiement
                    </>
                  )}
                  {paymentStatus === 'success' && (
                    <>
                      <Check className="h-5 w-5 text-green-600" />
                      Paiement réussi
                    </>
                  )}
                  {paymentStatus === 'error' && (
                    <>
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Erreur de paiement
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {paymentStatus === 'processing' && "Votre paiement est en cours de traitement..."}
                  {paymentStatus === 'success' && "Félicitations ! Votre paiement a été traité avec succès."}
                  {paymentStatus === 'error' && "Une erreur est survenue lors du traitement de votre paiement."}
                </CardDescription>
                
                {/* Barre de progression */}
                {paymentStatus === 'processing' && (
                  <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-mrc-blue to-mrc-green transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-6">
                {paymentStatus === 'processing' && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mrc-blue mb-4"></div>
                    <h2 className="text-xl font-semibold mb-2">Traitement en cours...</h2>
                    <p className="text-gray-600 max-w-md mx-auto text-center">
                      Nous traitons votre paiement en toute sécurité. Veuillez patienter quelques instants sans fermer cette page.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      {securityFeatures.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="py-1 px-2 flex items-center gap-1 bg-gray-50">
                          {feature.icon}
                          <span>{feature.text}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {paymentStatus === 'success' && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <Receipt className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
                    <div className="text-center">
                      <p className="text-gray-600 mb-3 max-w-md mx-auto">
                        Merci pour votre achat. Vous avez maintenant accès à tout le contenu premium de MRC en Poche.
                      </p>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Un reçu a été envoyé à votre adresse email.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                      <Button onClick={handleBackToHome} variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Accueil
                      </Button>
                      <Button onClick={() => navigate('/modules')} variant="gradient">
                        Accéder aux modules <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {paymentStatus === 'error' && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Erreur de paiement</h2>
                    <div className="text-center">
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Une erreur est survenue lors du traitement de votre paiement. 
                        Veuillez réessayer ou contacter notre service client.
                      </p>
                    </div>
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
          
          {/* Colonne latérale */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Abonnement</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Période</span>
                    <span className="font-medium">Mensuel</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between pt-2">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">9,99 €</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t text-xs text-gray-500 flex justify-center">
                <Lock className="h-3 w-3 mr-1" /> Transaction sécurisée
              </CardFooter>
            </Card>
            
            <div className="mt-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2 text-sm">Nous acceptons</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-gray-50">Visa</Badge>
                    <Badge variant="outline" className="bg-gray-50">Mastercard</Badge>
                    <Badge variant="outline" className="bg-gray-50">PayPal</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
