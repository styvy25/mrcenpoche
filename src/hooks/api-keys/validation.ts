
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { testYouTubeApiKey } from "@/components/assistant/services/youtubeService";

// Simple validation for Stripe key based on format
export const testStripeKey = async (key: string): Promise<boolean> => {
  if (!key) return false;
  
  // Basic check that the key has the right format
  const isValidFormat = key.startsWith("pk_") || key.startsWith("sk_");
  
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

  // Validate Perplexity key if provided
  if (perplexityKey) {
    validationPromises.push(
      testPerplexityApiKey(perplexityKey)
        .then(isValid => {
          results.perplexity = isValid;
        })
        .catch(error => {
          console.error("Error testing Perplexity key:", error);
        })
    );
  }
  
  // Validate YouTube key if provided
  if (youtubeKey) {
    validationPromises.push(
      testYouTubeApiKey(youtubeKey)
        .then(isValid => {
          results.youtube = isValid;
        })
        .catch(error => {
          console.error("Error testing YouTube key:", error);
        })
    );
  }
  
  // Validate Stripe key if provided
  if (stripeKey) {
    validationPromises.push(
      testStripeKey(stripeKey)
        .then(isValid => {
          results.stripe = isValid;
        })
        .catch(error => {
          console.error("Error testing Stripe key:", error);
        })
    );
  }

  // Wait for all validations to complete
  await Promise.allSettled(validationPromises);

  return results;
};
