
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Crown, CreditCard, Calendar, Check, Settings2, ExternalLink } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { SUBSCRIPTION_PLANS, goToCustomerPortal } from '@/services/paymentService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { UserLevel } from '@/components/gamification/UserLevel';

const STRIPE_DIRECT_LINK = "https://buy.stripe.com/14kcQa9Cx9ME1he3cA";

const SubscriptionSection = () => {
  const { subscription, userPoints, loading, currentPlan } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString();
  };
  
  const handleManageSubscription = async () => {
    try {
      if (!subscription?.stripeCustomerId) {
        toast({
          title: "Aucun abonnement actif",
          description: "Vous n'avez pas d'abonnement actif à gérer",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Redirection",
        description: "Vous allez être redirigé vers le portail client Stripe",
      });
      
      await goToCustomerPortal();
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la redirection",
        variant: "destructive",
      });
    }
  };
  
  const handleDirectPurchase = () => {
    // Ouvrir le lien Stripe dans une popup
    const width = 550;
    const height = 650;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    window.open(
      STRIPE_DIRECT_LINK, 
      'StripeCheckout',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`
    );
    
    toast({
      title: "Paiement Stripe",
      description: "Une fenêtre de paiement Stripe s'est ouverte. Complétez votre achat pour activer l'abonnement.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Abonnement et Points</h3>
        <p className="text-sm text-gray-500">
          Gérez votre abonnement et consultez vos points de fidélité
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-mrc-blue" />
                Abonnement
              </CardTitle>
              {loading ? (
                <Skeleton className="h-6 w-16" />
              ) : subscription?.status === 'active' ? (
                <Badge className="bg-green-500">Actif</Badge>
              ) : subscription?.status === 'trialing' ? (
                <Badge variant="outline" className="border-mrc-blue text-mrc-blue">Essai</Badge>
              ) : (
                <Badge variant="outline">Inactif</Badge>
              )}
            </div>
            <CardDescription>
              Détails de votre abonnement actuel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    {currentPlan?.planType === 'premium' ? (
                      <Crown className="h-6 w-6 text-yellow-500" />
                    ) : currentPlan?.planType === 'enterprise' ? (
                      <Crown className="h-6 w-6 text-green-500" />
                    ) : (
                      <CreditCard className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{currentPlan?.name || 'Plan gratuit'}</h3>
                    <p className="text-sm text-gray-500">
                      {currentPlan?.price === 0 ? 'Gratuit' : `${currentPlan?.price}€/${currentPlan?.interval === 'month' ? 'mois' : 'an'}`}
                    </p>
                  </div>
                </div>
                
                {subscription?.currentPeriodEnd && (
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Renouvellement le {formatDate(subscription.currentPeriodEnd)}
                    </span>
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-2">Fonctionnalités incluses</h4>
                <ul className="space-y-1.5">
                  {currentPlan?.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {currentPlan?.features.length > 3 && (
                    <li className="text-sm text-mrc-blue">
                      +{currentPlan.features.length - 3} autres fonctionnalités
                    </li>
                  )}
                </ul>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {loading ? (
              <Skeleton className="h-9 w-40" />
            ) : subscription?.stripeSubscriptionId ? (
              <Button variant="outline" onClick={handleManageSubscription}>
                <Settings2 className="h-4 w-4 mr-2" />
                Gérer l'abonnement
              </Button>
            ) : (
              <Button onClick={() => navigate('/#pricing')}>
                Voir les abonnements
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Gamification Card */}
        <div className="flex flex-col gap-4">
          <UserLevel />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-mrc-blue" />
                Ressources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleDirectPurchase}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Acheter directement via Stripe
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/payment')}>
                <CreditCard className="h-4 w-4 mr-2" />
                Voir le statut du paiement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
