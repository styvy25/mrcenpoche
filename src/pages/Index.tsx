
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface PricingSectionProps {
  subscribe: (plan: string) => Promise<void>;
  isSubscriptionLoading: boolean;
  subscriptionPlan: {
    name: string;
    priceId: string;
    expires?: Date;
  } | null;
}

// Updated PricingSection component
const PricingSection = ({ subscribe, isSubscriptionLoading, subscriptionPlan }: PricingSectionProps) => (
  <div className="pricing-section p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <h2 className="text-xl font-bold mb-2">Pricing Plans</h2>
    <p className="mb-4">Current plan: {subscriptionPlan?.name || 'None'}</p>
    <Button 
      onClick={() => subscribe('premium')}
      disabled={isSubscriptionLoading}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isSubscriptionLoading ? 'Processing...' : (
        <>
          <Zap className="mr-2 h-4 w-4" />
          Subscribe to Premium
        </>
      )}
    </Button>
  </div>
);

const Index = () => {
  const { isPremium, subscribe, isLoading: isSubscriptionLoading, subscriptionPlan } = useSubscription();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Home Page</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome to MRC LearnScape</CardTitle>
          <CardDescription>
            Your platform for political education and training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This platform provides educational resources, training modules, and tools
            to help members of the Mouvement pour la Renaissance du Cameroun (MRC)
            develop their political knowledge and skills.
          </p>
        </CardContent>
      </Card>
      
      <PricingSection 
        subscribe={subscribe}
        isSubscriptionLoading={isSubscriptionLoading}
        subscriptionPlan={subscriptionPlan}
      />
    </div>
  );
};

export default Index;
