
import { supabase } from '@/integrations/supabase/client';

export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  try {
    // First check if we have stored API key
    if (!apiKey) {
      const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('key')
        .eq('service', 'perplexity')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (apiKeyError) {
        console.error("Error fetching API key:", apiKeyError);
      } else if (apiKeyData && apiKeyData.length > 0) {
        apiKey = apiKeyData[0].key;
      }
    }

    // Use the edge function to make the request
    const response = await fetch(`${window.location.origin}/functions/v1/perplexity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabase.auth.getSession()}`
      },
      body: JSON.stringify({
        prompt: userMessage,
        apiKey: apiKey
      }),
    });

    if (!response.ok) {
      throw new Error('Error calling Perplexity API');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Failed to get Perplexity response:", error);
    return "Une erreur s'est produite lors de la communication avec l'API Perplexity. Veuillez réessayer plus tard.";
  }
};
