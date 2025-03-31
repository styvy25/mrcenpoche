
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Key, Loader2, ShoppingCart, Crown } from 'lucide-react';
import { createCheckoutSession } from '@/services/paymentService';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { subscription, currentPlan } = useSubscription();
  
  // Check if the current button represents the active plan
  const isCurrentPlan = subscription && currentPlan?.priceId === priceId;

  const handleClick = async () => {
    // If this is the free plan, don't proceed with Stripe
    if (priceId === 'price_free') {
      toast({
        title: "Plan gratuit",
        description: "Vous utilisez déjà le plan gratuit",
      });
      return;
    }
    
    // If this is already the user's current plan, don't do anything
    if (isCurrentPlan) {
      toast({
        title: "Plan actuel",
        description: "Vous êtes déjà abonné à ce plan",
      });
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Notify user about redirection
      toast({
        title: "Redirection...",
        description: "Vous allez être redirigé vers la page de paiement sécurisée",
      });
      
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant}
      size={size}
      className={`relative ${className}`}
      disabled={isProcessing || isCurrentPlan}
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : isCurrentPlan ? (
        <Crown className="h-4 w-4 mr-2" />
      ) : showIcon ? (
        <ShoppingCart className="h-4 w-4 mr-2" />
      ) : null}
      
      {isCurrentPlan ? "Plan actuel" : children}
      
      {/* Effet de brillance sur le bouton */}
      {variant === "gradient" && !isProcessing && !isCurrentPlan && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 opacity-0 hover:opacity-10 bg-white transform -translate-x-full hover:translate-x-full transition-all duration-1000 ease-out"></span>
        </span>
      )}
    </Button>
  );
};

export default StripeButton;
