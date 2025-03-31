
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown, Shield, Users } from "lucide-react";
import { createCheckoutSession, SUBSCRIPTION_PLANS } from "@/services/paymentService";
import { Feature } from "@/hooks/api-keys/types";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const PricingSection = () => {
  const { toast } = useToast();
  const { subscription, loading, currentPlan, isPremium } = useSubscription();
  
  const handleSubscribe = async (priceId: string) => {
    try {
      // Don't process free plan through Stripe
      if (priceId === 'price_free') {
        toast({
          title: "Plan gratuit",
          description: "Vous utilisez déjà le plan gratuit",
        });
        return;
      }
      
      toast({
        title: "Redirection vers la page de paiement",
        description: "Vous allez être redirigé vers notre plateforme de paiement sécurisée.",
      });
      
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la souscription",
        variant: "destructive",
      });
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'premium':
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 'enterprise':
        return <Users className="h-6 w-6 text-green-500" />;
      default:
        return <Shield className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getButtonText = (planType: string) => {
    if (loading) return "Chargement...";
    
    if (currentPlan?.planType === planType && subscription?.status === 'active') {
      return "Plan actuel";
    }
    
    switch (planType) {
      case 'free':
        return "Commencer gratuitement";
      case 'premium':
        return "S'abonner maintenant";
      case 'enterprise':
        return "Contacter pour groupe";
      default:
        return "Choisir ce plan";
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Tarifs simples et transparents
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choisissez l'offre qui correspond à vos besoins et commencez votre formation dès aujourd'hui.
          </p>
          
          {isPremium && (
            <Badge className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-1.5 px-3">
              <Crown className="h-4 w-4 mr-1" /> Statut Premium Actif
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`border-t-4 relative ${
                plan.isPopular 
                  ? 'border-t-mrc-blue shadow-xl lg:scale-105 z-10' 
                  : plan.planType === 'free' 
                    ? 'border-t-gray-500' 
                    : 'border-t-mrc-green'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-mrc-blue text-white text-xs py-1 px-2 rounded">
                  Populaire
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getPlanIcon(plan.planType)}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <div className="mt-4">
                  {loading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <>
                      <span className="text-4xl font-bold">{plan.price}€</span>
                      <span className="text-gray-500 ml-2">/ mois</span>
                    </>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe(plan.priceId)}
                  variant={plan.isPopular ? "default" : "outline"}
                  className={`w-full ${
                    plan.isPopular 
                      ? 'bg-mrc-blue hover:bg-blue-700' 
                      : ''
                  } ${
                    currentPlan?.planType === plan.planType && subscription?.status === 'active'
                      ? 'cursor-default opacity-70'
                      : ''
                  }`}
                  disabled={loading || (currentPlan?.planType === plan.planType && subscription?.status === 'active')}
                >
                  {getButtonText(plan.planType)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
            Tous les abonnements sont à renouvellement automatique. Vous pouvez annuler à tout moment via votre espace membre.
            Les paiements sont sécurisés par Stripe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
