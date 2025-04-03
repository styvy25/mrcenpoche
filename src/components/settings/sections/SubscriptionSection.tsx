import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pricingPlans } from "@/components/home/PricingSection";

const SubscriptionSection = () => {
  const { data, isLoading, error, subscribe, unsubscribe } = useSubscription();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Initialize with defaults if subscription data isn't available yet
  const subscriptionData = {
    name: data?.name || 'Free Plan',
    priceId: data?.priceId || '',
    features: [],
    planType: 'free',
    price: 0,
    interval: 'month'
  };
  
  const userPoints = 0; // Default value if not available

  const isPro = subscriptionData.planType === 'pro';

  const handleSubscribe = async (priceId: string) => {
    try {
      await subscribe(priceId);
      toast({
        title: "Abonnement mis à jour",
        description: "Votre abonnement a été mis à jour avec succès.",
      });
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: err.message || "Impossible de mettre à jour l'abonnement.",
        variant: "destructive",
      });
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribe();
      toast({
        title: "Abonnement annulé",
        description: "Votre abonnement a été annulé avec succès.",
      });
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: err.message || "Impossible d'annuler l'abonnement.",
        variant: "destructive",
      });
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-2xl font-semibold">Abonnement</CardTitle>
        <CardDescription>
          Gérez votre abonnement et vos points MRC.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plan actuel</h3>
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold">{subscriptionData.name}</h4>
                  <p className="text-sm text-gray-500">
                    {isPro ? "Abonnement Pro" : "Abonnement de base"}
                  </p>
                </div>
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold">
                {subscriptionData.price === 0 ? (
                  "Gratuit"
                ) : (
                  <>
                    {subscriptionData.price.toLocaleString('fr-FR')} FCFA
                    <span className="text-sm font-normal text-gray-500">/{subscriptionData.interval}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {isPro
                  ? "Vous avez accès à toutes les fonctionnalités."
                  : "Accès limité aux fonctionnalités de base."}
              </p>
              <h4 className="text-lg font-semibold mt-4">Fonctionnalités</h4>
              {subscriptionData.features && subscriptionData.features.length > 0 ? (
                subscriptionData.features.map((feature, index) => (
                  <div key={index} className="flex items-start mt-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-start mt-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accès à la plateforme d'apprentissage</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold">Points MRC</h3>
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold">{userPoints} Points</h4>
                  <p className="text-sm text-gray-500">
                    Utilisez vos points pour débloquer du contenu exclusif.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Changer d'abonnement</h3>
            <div className="space-y-2">
              {pricingPlans.map((plan) => (
                <Card key={plan.priceId} className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.name === "Pro"
                        ? "Accès illimité à toutes les fonctionnalités."
                        : "Fonctionnalités de base."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {plan.priceId === "price_1N7wbK2eZvKYlo2C9MEG9w9x" ? (
                        "Gratuit"
                      ) : (
                        <>
                          {plan.name === "Pro" ? "999" : "499"} FCFA
                          <span className="text-sm font-normal text-gray-500">/mois</span>
                        </>
                      )}
                    </div>
                    <Button
                      variant="default"
                      onClick={() => handleSubscribe(plan.priceId)}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Chargement..."
                        : isPro
                        ? "Abonné"
                        : "S'abonner"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {isPro && (
              <Button
                variant="destructive"
                onClick={() => setShowConfirmation(true)}
                disabled={isLoading}
              >
                Annuler l'abonnement
              </Button>
            )}
            {showConfirmation && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Annuler l'abonnement
                    </h3>
                    <div className="mt-2 px-7 py-3">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir annuler votre abonnement ?
                      </p>
                    </div>
                    <div className="items-center px-4 py-3">
                      <Button
                        variant="destructive"
                        onClick={handleUnsubscribe}
                        className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        Oui, annuler
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleCancelConfirmation}
                        className="mt-3 px-4 py-2 bg-gray-100 text-gray-500 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        Non, garder l'abonnement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSection;
