
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Crown, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';

interface StripeButtonProps {
  priceId?: string; // Made optional since we'll use a direct link
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  className?: string;
  showIcon?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  directLink?: string;
  onClick?: () => void;
}

const StripeButton: React.FC<StripeButtonProps> = ({ 
  priceId, 
  children, 
  variant = "gradient",
  className = "",
  showIcon = true,
  size = "default",
  directLink = "https://buy.stripe.com/14kcQa9Cx9ME1he3cA", // Lien Stripe officiel
  onClick
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { subscription, currentPlan } = useSubscription();
  
  // Vérifier si ce bouton représente le plan actif
  const isCurrentPlan = subscription && currentPlan?.priceId === priceId;

  const handleClick = async () => {
    // Si c'est le plan gratuit, ne pas continuer avec Stripe
    if (priceId === 'price_free') {
      toast({
        title: "Plan gratuit",
        description: "Vous utilisez déjà le plan gratuit",
      });
      return;
    }
    
    // Si c'est déjà le plan actuel de l'utilisateur, ne rien faire
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
      // Si une fonction onClick est fournie, l'utiliser
      if (onClick) {
        onClick();
        setIsProcessing(false);
        return;
      }
      
      // Notifier l'utilisateur de la redirection
      toast({
        title: "Redirection...",
        description: "Vous allez être redirigé vers la page de paiement sécurisée",
      });
      
      // Ouvrir dans une popup
      const width = 550;
      const height = 650;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      
      window.open(
        directLink, 
        'StripeCheckout',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`
      );
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement",
        variant: "destructive",
      });
    } finally {
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
        <ExternalLink className="h-4 w-4 mr-2" />
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
