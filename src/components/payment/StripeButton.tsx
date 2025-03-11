
import React from 'react';
import { Button } from "@/components/ui/button";
import { Key, Loader2 } from 'lucide-react';
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
  const { initiatePayment, isApiKeySet, isProcessing } = useStripePayment(priceId);

  const handleClick = async () => {
    await initiatePayment();
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant}
      className={className}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : !isApiKeySet ? (
        <Key className="h-4 w-4 mr-2" />
      ) : null}
      {children}
    </Button>
  );
};

export default StripeButton;
