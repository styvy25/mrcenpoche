
import { ApiKeys, ApiKeyStatus } from "./types";

// Check a Perplexity API Key format
const isValidPerplexityKey = (key: string): boolean => {
  return key.startsWith('pplx-') && key.length > 10;
};

// Check a YouTube API Key format
const isValidYouTubeKey = (key: string): boolean => {
  return key.length >= 10 && key.length <= 100; // Generic API key validation
};

// Check a Stripe API Key format
const isValidStripeKey = (key: string): boolean => {
  return key.startsWith('pk_') || key.startsWith('sk_');
};

// Validate API keys
export const validateApiKeys = async (
  perplexityKey?: string,
  youtubeKey?: string,
  stripeKey?: string
): Promise<ApiKeyStatus> => {
  try {
    // Use default values if provided keys are empty
    if (!perplexityKey) perplexityKey = "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";
    if (!youtubeKey) youtubeKey = "AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w";

    // Local validation
    const isPerplexityValid = isValidPerplexityKey(perplexityKey);
    const isYouTubeValid = isValidYouTubeKey(youtubeKey);
    const isStripeValid = stripeKey ? isValidStripeKey(stripeKey) : false;

    // Server validation (optional, can be added later)
    // For now, just return the local validation results
    return {
      perplexity: isPerplexityValid,
      youtube: isYouTubeValid,
      stripe: isStripeValid,
    };
  } catch (error) {
    console.error('Error validating API keys:', error);
    return {
      perplexity: false,
      youtube: false,
      stripe: false,
    };
  }
};
