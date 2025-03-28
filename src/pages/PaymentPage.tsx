
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { useToast } from '@/components/ui/use-toast';

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { userPlan, updateUserPlan } = usePlanLimits();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to home if already premium
  useEffect(() => {
    if (userPlan === 'premium') {
      toast({
        title: "Vous êtes déjà abonné Premium",
        description: "Vous bénéficiez déjà de tous les avantages premium.",
      });
      navigate('/');
    }
  }, [userPlan, navigate, toast]);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPayment = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    // Update user plan to premium
    updateUserPlan('premium');
    
    // Redirect to home page with success message
    toast({
      title: "Paiement réussi",
      description: "Votre compte a été mis à niveau vers Premium. Profitez de toutes les fonctionnalités !",
    });
    
    navigate('/');
  };

  const planFeatures = [
    "Messages illimités avec l'assistant IA",
    "Création illimitée de documents PDF",
    "Accès à tous les quiz et examens",
    "Pas de publicités",
    "Support prioritaire"
  ];

  return (
    <MainLayout>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Passer à Premium</h1>
        <p className="text-center text-muted-foreground mb-8">
          Débloquez toutes les fonctionnalités de MRC en Poche
        </p>
        
        <div className="max-w-3xl mx-auto">
          {!showPaymentForm ? (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-3">
                  <Sparkles className="h-10 w-10 text-yellow-500" />
                </div>
                <CardTitle>Choisissez votre plan Premium</CardTitle>
                <CardDescription>
                  Tous les plans incluent l'accès complet à toutes nos fonctionnalités
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <RadioGroup 
                  value={selectedPlan} 
                  onValueChange={handleSelectPlan}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className={`border rounded-lg p-4 ${selectedPlan === 'monthly' ? 'border-mrc-blue bg-blue-50 dark:bg-blue-950/30' : ''}`}>
                    <RadioGroupItem 
                      value="monthly" 
                      id="monthly" 
                      className="sr-only"
                    />
                    <Label 
                      htmlFor="monthly"
                      className="flex flex-col cursor-pointer"
                    >
                      <span className="font-medium text-lg">Mensuel</span>
                      <span className="text-3xl font-bold my-2">9,99 €</span>
                      <span className="text-sm text-muted-foreground">Facturé chaque mois</span>
                      <span className="mt-2 text-xs">Annulation possible à tout moment</span>
                    </Label>
                  </div>
                  
                  <div className={`border rounded-lg p-4 ${selectedPlan === 'yearly' ? 'border-mrc-blue bg-blue-50 dark:bg-blue-950/30' : ''} relative`}>
                    <div className="absolute -top-2 right-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Économisez 20%
                    </div>
                    <RadioGroupItem 
                      value="yearly" 
                      id="yearly" 
                      className="sr-only"
                    />
                    <Label 
                      htmlFor="yearly"
                      className="flex flex-col cursor-pointer"
                    >
                      <span className="font-medium text-lg">Annuel</span>
                      <span className="text-3xl font-bold my-2">95,88 €</span>
                      <span className="text-sm text-muted-foreground">7,99 € / mois, facturé annuellement</span>
                      <span className="mt-2 text-xs">Économisez l'équivalent de 2 mois</span>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="border rounded-lg p-5">
                  <h3 className="font-medium text-lg mb-3">Ce qui est inclus :</h3>
                  <ul className="space-y-2">
                    {planFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Paiement sécurisé via Stripe</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Procéder au paiement
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                    Paiement sécurisé
                  </CardTitle>
                  <CardDescription>
                    Complétez votre paiement pour activer votre abonnement Premium
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StripePaymentForm 
                    amount={selectedPlan === 'monthly' ? 9.99 : 95.88}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPaymentForm(false)}
                  />
                </CardContent>
              </Card>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  En procédant au paiement, vous acceptez nos{' '}
                  <a href="/terms" className="underline hover:text-primary">Conditions d'utilisation</a>{' '}
                  et notre{' '}
                  <a href="/privacy" className="underline hover:text-primary">Politique de confidentialité</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
