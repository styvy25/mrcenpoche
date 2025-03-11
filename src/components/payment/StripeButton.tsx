
import React from 'react';
import { Button } from "@/components/ui/button";
import { Key } from 'lucide-react';
import { useStripePayment } from '@/hooks/payment/useStripePayment';

interface StripeButtonProps {
  priceId: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  className?: string;
}

const StripeButton: React.FC<StripeButtonProps> = ({ 
  priceId, 
  children, 
  variant = "default",
  className = ""
}) => {
  const { initiatePayment, isApiKeySet } = useStripePayment(priceId);

  const handleClick = async () => {
    await initiatePayment();
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant}
      className={className}
    >
      {!isApiKeySet && <Key className="h-4 w-4 mr-2" />}
      {children}
    </Button>
  );
};

export default StripeButton;
