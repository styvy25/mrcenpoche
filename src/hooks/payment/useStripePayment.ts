
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/App';
import { supabase } from "@/integrations/supabase/client";

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
      // Récupérer la clé API Stripe stockée
      const { data: sessionData } = await supabase.auth.getSession();
      
      let stripeKey = '';
      
      if (sessionData?.session) {
        // Essayer de récupérer la clé Stripe depuis Supabase
        const { data, error } = await supabase
          .from('api_keys_config')
          .select('stripe_key')
          .eq('user_id', sessionData.session.user.id)
          .single();
          
        if (data && data.stripe_key) {
          stripeKey = data.stripe_key;
        }
      } else {
        // Utiliser localStorage comme fallback
        const savedKeys = localStorage.getItem("api_keys");
        if (savedKeys) {
          const keys = JSON.parse(savedKeys);
          stripeKey = keys.stripe || '';
        }
      }
      
      if (!stripeKey) {
        throw new Error("Clé Stripe non trouvée");
      }
      
      console.log("Création d'une session de paiement avec priceId:", priceId);
      
      // Création de la session de paiement (simulation)
      // Dans une version réelle, vous feriez appel à votre backend pour créer une session Stripe
      const sessionId = "cs_test_" + Math.random().toString(36).substring(2, 15);
      
      // Redirection vers la page de checkout (simulée pour le moment)
      // Dans une version réelle, vous utiliseriez stripe.redirectToCheckout({ sessionId })
      setTimeout(() => {
        navigate('/payment?session=' + sessionId);
      }, 1500);
      
      return true;
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors de l'initialisation du paiement: " + (error instanceof Error ? error.message : "Erreur inconnue"),
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
