import React from 'react';
import { Check, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlanLimits } from '@/hooks/usePlanLimits';

// Update the PlanType type to include 'group'
type PlanType = 'free' | 'premium' | 'enterprise' | 'group';

interface PricingPlanProps {
  plan: PlanType;
  name: string;
  price: number;
  description: string;
  features: string[];
  mostPopular?: boolean;
}

const PricingSection: React.FC = () => {
  const { canAccessAllModules } = usePlanLimits();

  const pricingPlans: PricingPlanProps[] = [
    {
      plan: 'free',
      name: 'Gratuit',
      price: 0,
      description: 'Pour ceux qui débutent',
      features: [
        'Accès limité aux modules',
        'Support communautaire',
        'Mises à jour de base'
      ]
    },
    {
      plan: 'premium',
      name: 'Premium',
      price: 29,
      description: 'Pour les utilisateurs avancés',
      features: [
        'Accès illimité aux modules',
        'Support prioritaire',
        'Mises à jour premium',
        'Accès aux nouvelles fonctionnalités'
      ],
      mostPopular: true
    },
    {
      plan: 'enterprise',
      name: 'Entreprise',
      price: 99,
      description: 'Pour les grandes organisations',
      features: [
        'Accès illimité aux modules',
        'Support dédié',
        'Formation personnalisée',
        'Intégrations avancées'
      ]
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Choisissez le plan qui vous convient</h2>
        <p className="text-gray-700 mb-8">
          Découvrez nos plans tarifaires flexibles adaptés à vos besoins.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.plan} plan={plan.plan} name={plan.name} price={plan.price} description={plan.description} features={plan.features} mostPopular={plan.mostPopular} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: PlanType;
  name: string;
  price: number;
  description: string;
  features: string[];
  mostPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, name, price, description, features, mostPopular }) => {
  return (
    <Card className={`shadow-md ${mostPopular ? 'border-2 border-blue-500' : ''}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500">/mois</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-700">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">
          {plan === 'free' ? 'Commencer gratuitement' : 'Choisir ce plan'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingSection;
