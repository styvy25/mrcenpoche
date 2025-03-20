
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/context/AppContext';
import { loadApiKeys } from "@/hooks/api-keys/storage";

export const useStripePayment = (priceId: string) => {
  const stripe = useStripe();
  const { toast } = useToast();
  const { isApiKeySet } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = async () => {
    if (isProcessing) return false;
    
    setIsProcessing(true);
    
    try {
      // Check if API key is set
      if (!isApiKeySet) {
        toast({
          title: "Clé API manquante",
          description: "Veuillez configurer une clé API Stripe pour effectuer des paiements",
          variant: "destructive",
        });
        navigate('/settings');
        setIsProcessing(false);
        return false;
      }

      // Check if Stripe is available
      if (!stripe) {
        toast({
          title: "Erreur de paiement",
          description: "Le service de paiement n'est pas disponible actuellement. Vérifiez que votre connexion internet est active.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return false;
      }

      // Notify user about redirection
      toast({
        title: "Préparation du paiement",
        description: "Vous allez être redirigé vers la page de paiement sécurisée",
      });

      // Get Stripe API key with the enhanced function
      let stripeKey = '';
      const apiKeys = await loadApiKeys();
      
      if (apiKeys && apiKeys.stripe) {
        stripeKey = apiKeys.stripe;
      }
      
      if (!stripeKey) {
        throw new Error("Aucune clé Stripe n'a été trouvée");
      }
      
      console.log("Création d'une session de paiement avec priceId:", priceId);
      
      // In a real app, this would be handled server-side
      // Simulate a Stripe session creation
      const sessionId = "cs_test_" + Math.random().toString(36).substring(2, 15);
      
      // Redirect to payment page
      navigate(`/payment?session=${sessionId}`);
      
      return true;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement: " + (error instanceof Error ? error.message : "Erreur inconnue"),
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    initiatePayment,
    isApiKeySet,
    isProcessing
  };
};
