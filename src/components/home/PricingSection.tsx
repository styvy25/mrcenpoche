
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown, Shield, Users } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/services/paymentService";
import { useSubscription } from "@/hooks/useSubscription";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import StripeButton from "@/components/payment/StripeButton";

const PricingSection = () => {
  const { isPremium, loading, currentPlan, plan } = useSubscription();

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
    
    if (currentPlan?.planType === planType) {
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

  const handleStripeButtonClick = (priceId?: string) => {
    // Ouvrir le lien Stripe dans une popup
    const width = 550;
    const height = 650;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const STRIPE_DIRECT_LINK = "https://buy.stripe.com/14kcQa9Cx9ME1he3cA";
    
    window.open(
      STRIPE_DIRECT_LINK, 
      'StripeCheckout',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`
    );
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
          {SUBSCRIPTION_PLANS.map((planItem) => (
            <Card 
              key={planItem.id} 
              className={`border-t-4 relative ${
                planItem.isPopular 
                  ? 'border-t-mrc-blue shadow-xl lg:scale-105 z-10' 
                  : planItem.planType === 'free' 
                    ? 'border-t-gray-500' 
                    : 'border-t-mrc-green'
              }`}
            >
              {planItem.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-mrc-blue text-white text-xs py-1 px-2 rounded">
                  Populaire
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getPlanIcon(planItem.planType)}
                  <CardTitle className="text-xl">{planItem.name}</CardTitle>
                </div>
                <div className="mt-4">
                  {loading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <>
                      <span className="text-4xl font-bold">{planItem.price}€</span>
                      <span className="text-gray-500 ml-2">/ mois</span>
                    </>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {planItem.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {planItem.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <StripeButton 
                  priceId={planItem.priceId}
                  variant={planItem.isPopular ? "default" : "outline"}
                  className={`w-full ${
                    planItem.isPopular 
                      ? 'bg-mrc-blue hover:bg-blue-700' 
                      : ''
                  }`}
                  showIcon={true}
                  onClick={() => handleStripeButtonClick(planItem.priceId)}
                >
                  {getButtonText(planItem.planType)}
                </StripeButton>
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
