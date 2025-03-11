
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

interface APIKeys {
  perplexity?: string;
  youtube?: string;
  stripe?: string;
}

interface RequestBody {
  action: 'get' | 'save';
  keys?: APIKeys;
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

    const { action, keys } = await req.json() as RequestBody;

    if (action === 'get') {
      // Get the user's API keys
      const { data, error } = await supabaseClient
        .from('api_keys_config')
        .select('perplexity_key, youtube_key, stripe_key')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // No keys found, but that's okay for a new user
        if (error.code === 'PGRST116') {
          return new Response(
            JSON.stringify({ 
              success: true, 
              data: { perplexity: '', youtube: '', stripe: '' } 
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: {
            perplexity: data.perplexity_key || '',
            youtube: data.youtube_key || '',
            stripe: data.stripe_key || ''
          }
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } 
    else if (action === 'save' && keys) {
      // Validate Stripe key format if provided
      if (keys.stripe && !(keys.stripe.startsWith('pk_') || keys.stripe.startsWith('sk_'))) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid Stripe key format. Keys should start with pk_ or sk_'
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
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
            perplexity_key: keys.perplexity || null,
            youtube_key: keys.youtube || null,
            stripe_key: keys.stripe || null
          })
          .eq('user_id', user.id);
      } else {
        // Insert new keys
        result = await supabaseClient
          .from('api_keys_config')
          .insert({
            user_id: user.id,
            perplexity_key: keys.perplexity || null,
            youtube_key: keys.youtube || null,
            stripe_key: keys.stripe || null
          });
      }

      if (result.error) {
        return new Response(
          JSON.stringify({ error: result.error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Test keys if provided
      const activeServices = [];
      
      if (keys.perplexity) activeServices.push('Perplexity');
      if (keys.youtube) activeServices.push('YouTube');
      if (keys.stripe) activeServices.push('Stripe');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'API keys saved successfully', 
          activeServices 
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } 
    else {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
