
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";
import { useUser } from "@/hooks/useUser";
import { SubscriptionBadge } from "@/components/subscription/SubscriptionBadge";
import { pricingPlans } from "@/components/home/PricingSection";
import { LightningBolt, Star, Check, Crown } from "lucide-react";

export const SubscriptionSection = () => {
  // Create mock subscription data for now
  const mockSubscription = {
    subscription: {
      name: "Premium",
      priceId: "price_1HEOLoJ919dC0tpDHcvKjXMe",
      planType: "premium",
      price: 9.99,
      interval: "month",
      features: [
        "Accès complet à MRC en Poche",
        "Formations personnalisées",
        "Toutes les ressources",
        "Recommandations adaptatives",
        "Sessions prioritaires avec Styvy-237",
        "Accès à la communauté"
      ]
    },
    userPoints: 150
  };
  
  const [userSubscription, setUserSubscription] = useState(mockSubscription);
  const [isLoading, setIsLoading] = useState(false);
  const subscription = useSubscription();
  const { user } = useUser();
  
  useEffect(() => {
    const loadSubscriptionData = async () => {
      setIsLoading(true);
      try {
        // Normally we'd load real data here
        setUserSubscription(mockSubscription);
      } catch (error) {
        console.error("Failed to load subscription data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadSubscriptionData();
    }
  }, [user]);
  
  const handleSubscribe = async (priceId: string) => {
    // Mock subscription logic
    console.log("Subscribing to plan with price ID:", priceId);
    // Implementation would go here
  };
  
  const handleUnsubscribe = async () => {
    // Mock unsubscribe logic
    console.log("Unsubscribing from current plan");
    // Implementation would go here
  };

  const getCurrentPlan = () => {
    return userSubscription?.subscription || null;
  };
  
  const currentPlan = getCurrentPlan();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Abonnement</h2>
        {currentPlan && (
          <SubscriptionBadge 
            type={currentPlan.planType || "basic"} 
            className="text-xs"
          />
        )}
      </div>
      
      <div className="grid gap-6 mt-4 md:grid-cols-2">
        {pricingPlans.map((plan) => {
          const isCurrentPlan = currentPlan?.priceId === plan.priceId;
          const isPremium = plan.planType === "premium";
          
          return (
            <Card
              key={plan.priceId}
              className={`relative overflow-hidden ${
                isPremium
                  ? "border-blue-500 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {isPremium && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white px-3 py-1 text-xs font-medium transform rotate-0 origin-top-right">
                    Recommandé
                  </div>
                </div>
              )}
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {isPremium && <Crown className="h-5 w-5 text-blue-500" />}
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline text-gray-900 dark:text-gray-100">
                      <span className="text-2xl font-bold tracking-tight">
                        {plan.price === 0 ? "Gratuit" : `${plan.price} €`}
                      </span>
                      {plan.interval && (
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                          /{plan.interval}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <ul className="space-y-2">
                    {plan.features?.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  {isCurrentPlan ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleUnsubscribe}
                    >
                      Gérer l'abonnement
                    </Button>
                  ) : (
                    <Button
                      variant={isPremium ? "default" : "outline"}
                      className={`w-full ${
                        isPremium ? "bg-blue-500 hover:bg-blue-600" : ""
                      }`}
                      onClick={() => handleSubscribe(plan.priceId)}
                    >
                      {isPremium ? "Passer Premium" : "Choisir Basic"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {userSubscription?.userPoints && (
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Points Styvy
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Vous avez accumulé <span className="font-medium text-blue-600">{userSubscription.userPoints}</span> points.
                Continuez à apprendre et à participer pour en gagner davantage !
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;
