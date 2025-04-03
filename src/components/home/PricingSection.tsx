import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SubscriptionPlan {
  name: string;
  priceId: string;
  expires?: Date;
  planType?: string; // Added property
  price?: number;
  interval?: string;
  features?: string[];
}

export const pricingPlans: SubscriptionPlan[] = [
  {
    name: "Basic",
    priceId: "price_1HEOLwJ919dC0tpDMcgMlLx0",
    planType: "basic",
    price: 0,
    interval: "month",
    features: [
      "Accès de base à MRC en Poche",
      "Formation limitée",
      "Ressources de base",
      "Recommandations générales"
    ]
  },
  {
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
  }
];

interface PricingSectionProps {
  subscribe: (priceId: string) => Promise<void>;
  isSubscriptionLoading: boolean;
  subscriptionPlan: { name: string; priceId: string; expires?: Date } | null;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  subscribe,
  isSubscriptionLoading,
  subscriptionPlan
}) => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Choisissez votre plan
        </h2>
        <p className="text-gray-600 mb-8">
          Débloquez des fonctionnalités exclusives avec nos plans d'abonnement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {pricingPlans.map((plan) => (
            <Card key={plan.priceId} className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold">
                  {plan.price === 0 ? "Gratuit" : `${plan.price}€`}
                  <span className="text-sm text-gray-500">/mois</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features?.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() => subscribe(plan.priceId)}
                  disabled={isSubscriptionLoading}
                >
                  {subscriptionPlan?.priceId === plan.priceId
                    ? "Abonné"
                    : "S'abonner"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
