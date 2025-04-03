
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';

// Mock component for PricingSection
const PricingSection = ({ subscribe, isSubscriptionLoading, subscriptionPlan }) => (
  <div className="pricing-section">
    <h2>Pricing Plans</h2>
    <p>Current plan: {subscriptionPlan?.name || 'None'}</p>
    <button onClick={() => subscribe('premium')}>Subscribe to Premium</button>
  </div>
);

const Index = () => {
  const { isPremium, subscribe, isLoading: isSubscriptionLoading, subscriptionPlan } = useSubscription();
  
  return (
    <div>
      <h1>Home Page</h1>
      
      <PricingSection 
        subscribe={subscribe}
        isSubscriptionLoading={isSubscriptionLoading}
        subscriptionPlan={subscriptionPlan}
      />
    </div>
  );
};

export default Index;
