
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useStripePayment = (priceId: string) => {
  const stripe = useStripe();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  
  // Check if API key is set
  useEffect(() => {
    const checkApiKey = async () => {
      // Try to get from localStorage
      try {
        const savedKeys = localStorage.getItem("api_keys");
        if (savedKeys) {
          const keys = JSON.parse(savedKeys);
          if (keys.stripe) {
            setIsApiKeySet(true);
            return;
          }
        }
        
        // Try to get from Supabase if user is logged in
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          const { data } = await supabase
            .from('api_keys_config')
            .select('stripe_key')
            .eq('user_id', sessionData.session.user.id)
            .single();
            
          if (data && data.stripe_key) {
            setIsApiKeySet(true);
          }
        }
      } catch (error) {
        console.error("Error checking API key:", error);
      }
    };
    
    checkApiKey();
  }, []);

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

      // Récupérer la clé API Stripe
      let stripeKey = '';
      
      // Essayer d'abord avec Supabase
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        // Récupérer la clé Stripe depuis Supabase
        const { data, error } = await supabase
          .from('api_keys_config')
          .select('stripe_key')
          .eq('user_id', sessionData.session.user.id)
          .single();
          
        if (data && data.stripe_key) {
          stripeKey = data.stripe_key;
          console.log("Clé Stripe récupérée depuis Supabase");
        }
      }
      
      // Si pas de clé, essayer avec localStorage
      if (!stripeKey) {
        const savedKeys = localStorage.getItem("api_keys");
        if (savedKeys) {
          const keys = JSON.parse(savedKeys);
          stripeKey = keys.stripe || '';
          console.log("Clé Stripe récupérée depuis localStorage");
        }
      }
      
      if (!stripeKey) {
        throw new Error("Aucune clé Stripe n'a été trouvée");
      }
      
      console.log("Création d'une session de paiement avec priceId:", priceId);
      
      // Dans une vraie application, cette partie serait gérée côté serveur
      // Simuler une création de session Stripe
      const sessionId = "cs_test_" + Math.random().toString(36).substring(2, 15);
      
      // Redirection vers la page de paiement
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
