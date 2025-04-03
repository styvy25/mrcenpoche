
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { testYouTubeApiKey, refreshYouTubeCache } from "@/components/assistant/services/youtubeService";
import { useToast } from "@/hooks/use-toast";

// Validation simple des clés Stripe basée sur le format
export const testStripeKey = async (key: string): Promise<boolean> => {
  if (!key) return false;
  
  // Vérification basique que la clé a le bon format
  const isValidFormat = key.startsWith("pk_") || key.startsWith("sk_");
  
  // Dans une application réelle, vous pourriez faire une requête de test à l'API Stripe
  // En utilisant une fonction Edge ou un backend sécurisé
  
  return isValidFormat;
};

export const validateApiKeys = async (
  perplexityKey: string,
  youtubeKey: string,
  stripeKey: string
) => {
  const results = {
    perplexity: false,
    youtube: false,
    stripe: false
  };

  const validationPromises = [];

  // Valider la clé Perplexity si fournie
  if (perplexityKey) {
    validationPromises.push(
      testPerplexityApiKey(perplexityKey)
        .then(isValid => {
          results.perplexity = isValid;
        })
        .catch(error => {
          console.error("Erreur lors du test de la clé Perplexity:", error);
        })
    );
  }
  
  // Valider la clé YouTube si fournie
  if (youtubeKey) {
    // If it's our default key that we know works, skip validation
    if (youtubeKey === '4e63f34b-ce2e-b148-452d-5f6ad73e9f1a') {
      results.youtube = true;
      
      // Still try to refresh cache in background
      refreshYouTubeCache(youtubeKey).catch(error => {
        console.error("Error refreshing YouTube cache with default key:", error);
      });
    } else {
      validationPromises.push(
        testYouTubeApiKey(youtubeKey)
          .then(isValid => {
            results.youtube = isValid;
            if (isValid) {
              // Rafraîchir le cache si la clé est valide
              return refreshYouTubeCache(youtubeKey);
            }
          })
          .catch(error => {
            console.error("Erreur lors du test de la clé YouTube:", error);
          })
      );
    }
  }
  
  // Valider la clé Stripe si fournie
  if (stripeKey) {
    validationPromises.push(
      testStripeKey(stripeKey)
        .then(isValid => {
          results.stripe = isValid;
        })
        .catch(error => {
          console.error("Erreur lors du test de la clé Stripe:", error);
        })
    );
  }

  // Attendre que toutes les validations soient terminées
  await Promise.allSettled(validationPromises);

  return results;
};
