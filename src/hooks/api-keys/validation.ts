
import { ApiKeyStatus } from "./types";
import { supabase } from "@/integrations/supabase/client";

export const validateApiKeys = async (
  perplexityKey: string,
  youtubeKey: string,
  stripeKey: string
): Promise<ApiKeyStatus> => {
  try {
    // Try to validate keys through Supabase Edge Function
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase.functions.invoke('validate-api-keys', {
        body: { 
          perplexityKey,
          youtubeKey,
          stripeKey
        }
      });
      
      if (!error && data?.success) {
        console.log("API keys validated through Supabase");
        return data.validationResults as ApiKeyStatus;
      }
    }
    
    // Fallback to local validation
    return {
      perplexity: !!perplexityKey,
      youtube: !!youtubeKey,
      stripe: !!stripeKey && (stripeKey.startsWith('pk_') || stripeKey.startsWith('sk_'))
    };
  } catch (error) {
    console.error("Error validating API keys:", error);
    
    // Simple validation if everything else fails
    return {
      perplexity: !!perplexityKey,
      youtube: !!youtubeKey,
      stripe: !!stripeKey && (stripeKey.startsWith('pk_') || stripeKey.startsWith('sk_'))
    };
  }
};
