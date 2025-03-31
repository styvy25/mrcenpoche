
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Package, CreditCard, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/services/paymentService';
import { useSubscription } from '@/hooks/useSubscription';
import { UserLevel } from '@/components/gamification/UserLevel';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, loading, currentPlan } = useSubscription();
  
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

  const renderPaymentStatus = () => {
    if (success) {
      return (
        <Card className="border-green-100 bg-green-50 dark:bg-green-900/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-500/20">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Paiement réussi</CardTitle>
            </div>
            <CardDescription>
              Votre abonnement premium est maintenant actif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Vous avez désormais accès à toutes les fonctionnalités premium de la plateforme. 
              Votre abonnement sera automatiquement renouvelé à la fin de la période.
            </p>
            
            <div className="mt-6 space-y-2">
              <UserLevel showCard={false} />
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Package className="h-8 w-8 text-mrc-blue mb-2" />
                <h3 className="font-medium">Modules Premium</h3>
                <p className="text-sm text-center text-gray-500">Accès à tous les modules de formation</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <CreditCard className="h-8 w-8 text-mrc-green mb-2" />
                <h3 className="font-medium">Facture</h3>
                <p className="text-sm text-center text-gray-500">Envoyée à votre adresse email</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate('/')} variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
            <Button onClick={() => navigate('/modules')} className="w-full sm:w-auto">
              Découvrir les modules
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      );
    } else if (canceled) {
      return (
        <Card className="border-amber-100 bg-amber-50 dark:bg-amber-900/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-500/20">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle>Paiement annulé</CardTitle>
            </div>
            <CardDescription>
              Votre opération de paiement a été annulée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Si vous avez rencontré des difficultés lors du processus de paiement, 
              n'hésitez pas à contacter notre support ou à essayer à nouveau avec un moyen 
              de paiement différent.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate('/')} variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
            <Button onClick={() => navigate('#pricing')}>
              Voir les forfaits
            </Button>
          </CardFooter>
        </Card>
      );
    } else {
      // Default subscription status display
      return (
        <Card>
          <CardHeader>
            <CardTitle>Statut de l'abonnement</CardTitle>
            <CardDescription>
              Informations sur votre abonnement actuel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col gap-4 items-center justify-center py-8">
                <Clock className="h-8 w-8 text-mrc-blue animate-pulse" />
                <p>Chargement de votre abonnement...</p>
              </div>
            ) : subscription ? (
              <>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{currentPlan?.name || 'Gratuit'}</h3>
                    <Badge 
                      variant={subscription.status === 'active' ? 'default' : 'outline'}
                      className={subscription.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {subscription.status === 'active' ? 'Actif' : 
                       subscription.status === 'trialing' ? 'Période d\'essai' : 
                       subscription.status === 'canceled' ? 'Annulé' : 
                       subscription.status}
                    </Badge>
                  </div>
                  
                  {subscription.currentPeriodEnd && (
                    <p className="text-sm text-gray-500">
                      Renouvellement le {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <UserLevel showCard={false} />
                
                <div className="mt-8">
                  <h3 className="font-medium mb-2">Fonctionnalités incluses</h3>
                  <ul className="space-y-2">
                    {currentPlan?.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p>Aucun abonnement actif trouvé.</p>
                <Button onClick={() => navigate('/#pricing')} className="mt-4">
                  Voir les options d'abonnement
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => navigate('/')} variant="outline">
              Retour à l'accueil
            </Button>
            {subscription?.stripeSubscriptionId && (
              <Button onClick={() => navigate('/settings')}>
                Gérer l'abonnement
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Mon abonnement</h1>
          {renderPaymentStatus()}
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
