
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/useSubscription';
import { useUser } from '@/hooks/useUser';
import SubscriptionBadge from '@/components/subscription/SubscriptionBadge';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Zap } from 'lucide-react';

// Mock pricing plans for local use
const pricingPlans = [
  {
    name: "Basique",
    priceId: "basic",
    price: "Gratuit",
    description: "Pour les membres du parti débutant leur engagement",
    features: [
      "Accès aux modules d'apprentissage de base",
      "Participation aux forums de discussion",
      "Réception des newsletters mensuelles"
    ]
  },
  {
    name: "Premium",
    priceId: "premium",
    price: "2000 FCFA/mois",
    description: "Pour les militants actifs cherchant à approfondir leur engagement",
    features: [
      "Tout ce qui est inclus dans le plan Basique",
      "Accès aux modules avancés de formation",
      "Invitation aux séminaires virtuels exclusifs",
      "Support prioritaire"
    ]
  },
  {
    name: "Enterprise",
    priceId: "enterprise",
    price: "Sur devis",
    description: "Pour les sections locales et les délégations",
    features: [
      "Tout ce qui est inclus dans le plan Premium",
      "Formation personnalisée pour votre équipe",
      "Outils d'analyse et de reporting",
      "Gestion d'équipe avancée",
      "Manager dédié"
    ]
  }
];

const SubscriptionSection = () => {
  const { isPremium } = useSubscription();
  const { user } = useUser();
  
  // Mock data since we don't have the actual implementation
  const subscriptionData = {
    planType: isPremium ? 'premium' : 'basic',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };
  
  const handleSubscribe = (priceId: string) => {
    console.log(`Subscribing to plan: ${priceId}`);
    // Implementation would go here
  };
  
  const handleUnsubscribe = () => {
    console.log('Unsubscribing from current plan');
    // Implementation would go here
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Abonnement</CardTitle>
          {subscriptionData && (
            <SubscriptionBadge planType={subscriptionData.planType as 'basic' | 'premium' | 'enterprise'} />
          )}
        </div>
        <CardDescription>Gérez votre abonnement et accédez à plus de fonctionnalités</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex items-start gap-3">
              {isPremium ? (
                <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="text-yellow-500 mt-1 h-5 w-5 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-medium text-sm">
                  {isPremium ? 'Abonnement Premium actif' : 'Compte Basique'}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isPremium
                    ? `Votre abonnement expire le ${subscriptionData.expires.toLocaleDateString()}`
                    : 'Passez à Premium pour accéder à toutes les fonctionnalités'}
                </p>
              </div>
            </div>
          </div>

          {!isPremium && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.filter(plan => plan.priceId !== 'basic').map((plan) => (
                <Card key={plan.priceId} className="border-2 hover:border-primary">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleSubscribe(plan.priceId)}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      S'abonner
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {isPremium && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={handleUnsubscribe}
            >
              Annuler l'abonnement
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSection;
