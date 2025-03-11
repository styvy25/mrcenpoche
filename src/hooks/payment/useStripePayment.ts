
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/App';

export const useStripePayment = (priceId: string) => {
  const stripe = useStripe();
  const { toast } = useToast();
  const { isApiKeySet } = useAppContext();
  const navigate = useNavigate();

  const initiatePayment = async () => {
    // Check if API key is set
    if (!isApiKeySet) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer une clé API Stripe pour effectuer des paiements",
        variant: "destructive",
      });
      navigate('/settings');
      return false;
    }

    // Check if Stripe is available
    if (!stripe) {
      toast({
        title: "Erreur de paiement",
        description: "Le service de paiement n'est pas disponible actuellement. Vérifiez que votre connexion internet est active.",
        variant: "destructive",
      });
      return false;
    }

    // Notify user about redirection
    toast({
      title: "Redirection vers le paiement",
      description: "Vous allez être redirigé vers la page de paiement sécurisée",
    });

    try {
      // Here you would call your API to create a payment session
      // and redirect to Stripe Checkout
      console.log("Redirection vers Stripe avec le priceId:", priceId);

      // Example redirection to a payment page (simulated)
      setTimeout(() => {
        navigate('/payment');
      }, 1500);
      
      return true;
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    initiatePayment,
    isApiKeySet
  };
};
