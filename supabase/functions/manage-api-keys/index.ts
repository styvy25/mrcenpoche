
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

interface APIKeys {
  perplexity?: string;
  youtube?: string;
  stripe?: string;
}

interface RequestBody {
  action: 'get' | 'save' | 'validate';
  keys?: APIKeys;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
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
    
    // Default YouTube key for fallback
    const DEFAULT_YOUTUBE_KEY = 'AIzaSyAHw1PVqxAZV9P2pOYKafPjzWuQSDq6U0w';
    // Default Perplexity key for fallback
    const DEFAULT_PERPLEXITY_KEY = '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';
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    const { action, keys } = await req.json() as RequestBody;

    // For get and validate actions, we don't need to be authenticated
    if (action === 'get') {
      // Try to get user-specific keys if authenticated
      if (user) {
        // Get the user's API keys
        const { data, error } = await supabaseClient
          .from('api_keys_config')
          .select('perplexity_key, youtube_key, stripe_key')
          .eq('user_id', user.id)
          .single();

        if (error) {
          // No keys found, return default keys
          return new Response(
            JSON.stringify({ 
              success: true, 
              data: { 
                perplexity: DEFAULT_PERPLEXITY_KEY, 
                youtube: DEFAULT_YOUTUBE_KEY, 
                stripe: '' 
              } 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            data: {
              perplexity: data.perplexity_key || DEFAULT_PERPLEXITY_KEY,
              youtube: data.youtube_key || DEFAULT_YOUTUBE_KEY,
              stripe: data.stripe_key || ''
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Not authenticated, return default keys
        return new Response(
          JSON.stringify({ 
            success: true, 
            data: { 
              perplexity: DEFAULT_PERPLEXITY_KEY, 
              youtube: DEFAULT_YOUTUBE_KEY, 
              stripe: '' 
            } 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } 
    else if (action === 'validate') {
      // Validate provided keys without saving them
      const { perplexity, youtube, stripe } = keys || {};
      
      const activeServices = [];
      if (perplexity) activeServices.push('Perplexity');
      if (youtube) activeServices.push('YouTube');
      if (stripe) activeServices.push('Stripe');

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Keys validated successfully',
          activeServices
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    else if (action === 'save' && keys) {
      // For save action, we need to be authenticated
      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Validate Stripe key format if provided
      if (keys.stripe && !(keys.stripe.startsWith('pk_') || keys.stripe.startsWith('sk_'))) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid Stripe key format. Keys should start with pk_ or sk_'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if user already has keys
      const { data: existingData } = await supabaseClient
        .from('api_keys_config')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let result;
      
      if (existingData) {
        // Update existing keys
        result = await supabaseClient
          .from('api_keys_config')
          .update({
            perplexity_key: keys.perplexity || DEFAULT_PERPLEXITY_KEY,
            youtube_key: keys.youtube || DEFAULT_YOUTUBE_KEY,
            stripe_key: keys.stripe || null
          })
          .eq('user_id', user.id);
      } else {
        // Insert new keys
        result = await supabaseClient
          .from('api_keys_config')
          .insert({
            user_id: user.id,
            perplexity_key: keys.perplexity || DEFAULT_PERPLEXITY_KEY,
            youtube_key: keys.youtube || DEFAULT_YOUTUBE_KEY,
            stripe_key: keys.stripe || null
          });
      }

      if (result.error) {
        return new Response(
          JSON.stringify({ error: result.error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Active services
      const activeServices = [];
      
      if (keys.perplexity || DEFAULT_PERPLEXITY_KEY) activeServices.push('Perplexity');
      if (keys.youtube || DEFAULT_YOUTUBE_KEY) activeServices.push('YouTube');
      if (keys.stripe) activeServices.push('Stripe');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'API keys saved successfully', 
          activeServices 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } 
    else {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
