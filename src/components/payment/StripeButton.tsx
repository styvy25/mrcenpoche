
import React from 'react';
import { Button } from "@/components/ui/button";
import { Key, Loader2, ShoppingCart } from 'lucide-react';
import { useStripePayment } from '@/hooks/payment/useStripePayment';
import { useNavigate } from 'react-router-dom';

interface StripeButtonProps {
  priceId: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  className?: string;
  showIcon?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

const StripeButton: React.FC<StripeButtonProps> = ({ 
  priceId, 
  children, 
  variant = "gradient",
  className = "",
  showIcon = true,
  size = "default"
}) => {
  const { initiatePayment, isApiKeySet, isProcessing } = useStripePayment(priceId);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isApiKeySet) {
      navigate('/settings');
      return;
    }
    
    await initiatePayment();
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant}
      size={size}
      className={`relative ${className}`}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : !isApiKeySet ? (
        <Key className="h-4 w-4 mr-2" />
      ) : showIcon ? (
        <ShoppingCart className="h-4 w-4 mr-2" />
      ) : null}
      {children}
      
      {/* Effet de brillance sur le bouton */}
      {variant === "gradient" && !isProcessing && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 opacity-0 hover:opacity-10 bg-white transform -translate-x-full hover:translate-x-full transition-all duration-1000 ease-out"></span>
        </span>
      )}
    </Button>
  );
};

export default StripeButton;
