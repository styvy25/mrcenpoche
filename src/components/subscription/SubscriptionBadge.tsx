
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star } from 'lucide-react';

interface SubscriptionBadgeProps {
  planType: 'basic' | 'premium' | 'enterprise';
  className?: string;
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ planType, className = '' }) => {
  if (planType === 'basic') {
    return null; // No badge for basic users
  }
  
  return (
    <Badge 
      variant={planType === 'premium' ? 'default' : 'secondary'} 
      className={`uppercase flex items-center gap-1 ${className}`}
    >
      {planType === 'premium' ? (
        <>
          <Star className="h-3 w-3" />
          Premium
        </>
      ) : (
        <>
          <Crown className="h-3 w-3" />
          Enterprise
        </>
      )}
    </Badge>
  );
};

export default SubscriptionBadge;
