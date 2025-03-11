
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { testYouTubeApiKey, refreshYouTubeCache } from "@/components/assistant/services/youtube";

export const testStripeKey = async (key: string): Promise<boolean> => {
  // Basic validation for Stripe keys
  return key.startsWith("pk_") || key.startsWith("sk_");
};

export const validateApiKeys = async (
  perplexityKey: string,
  youtubeKey: string,
  stripeKey: string
) => {
  let perplexityStatus = false;
  let youtubeStatus = false;
  let stripeStatus = false;

  if (perplexityKey) {
    perplexityStatus = await testPerplexityApiKey(perplexityKey);
  }
  
  if (youtubeKey) {
    youtubeStatus = await testYouTubeApiKey(youtubeKey);
    if (youtubeStatus) {
      await refreshYouTubeCache(youtubeKey);
    }
  }
  
  if (stripeKey) {
    stripeStatus = await testStripeKey(stripeKey);
  }

  return {
    perplexity: perplexityStatus,
    youtube: youtubeStatus,
    stripe: stripeStatus
  };
};
