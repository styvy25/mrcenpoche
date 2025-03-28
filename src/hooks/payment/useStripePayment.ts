
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export const useStripePayment = (priceId: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = async () => {
    if (isProcessing) return false;
    
    setIsProcessing(true);
    
    try {
      // Notify user about redirection
      toast({
        title: "Préparation du paiement",
        description: "Vous allez être redirigé vers la page de paiement sécurisée",
      });
      
      // Redirect to fixed Stripe payment page
      window.location.href = "https://buy.stripe.com/14kcQabKFbUM9NK8wT";
      
      return true;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    initiatePayment,
    isProcessing
  };
};
