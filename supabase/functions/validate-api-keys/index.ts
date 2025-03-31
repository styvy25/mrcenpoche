
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

interface APIKeys {
  perplexityKey?: string;
  youtubeKey?: string;
  stripeKey?: string;
}

interface RequestBody {
  perplexityKey?: string;
  youtubeKey?: string;
  stripeKey?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { perplexityKey, youtubeKey, stripeKey } = await req.json() as RequestBody;

    // Perform basic validation
    const validationResults = {
      perplexity: Boolean(perplexityKey),
      youtube: Boolean(youtubeKey),
      stripe: Boolean(stripeKey) && (stripeKey!.startsWith('pk_') || stripeKey!.startsWith('sk_'))
    };

    // In a production environment, you would perform actual API calls to validate these keys
    // For example, make a simple request to the Perplexity API to verify the key
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        validationResults
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
