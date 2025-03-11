
import React from 'react';
import { Button } from "@/components/ui/button";
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/App';
import { Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const stripe = useStripe();
  const { toast } = useToast();
  const { isApiKeySet } = useAppContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isApiKeySet) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer une clé API Stripe pour effectuer des paiements",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    if (!stripe) {
      toast({
        title: "Erreur de paiement",
        description: "Le service de paiement n'est pas disponible actuellement",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redirection vers le paiement",
      description: "Vous allez être redirigé vers la page de paiement sécurisée",
    });

    // Ici, vous devriez appeler votre API pour créer une session de paiement
    // et rediriger vers Stripe Checkout
    console.log("Redirection vers Stripe avec le priceId:", priceId);

    // Exemple de redirection vers une page de paiement (simulée)
    setTimeout(() => {
      navigate('/payment');
    }, 1500);
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
