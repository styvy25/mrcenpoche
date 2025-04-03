
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client using Auth headers
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  try {
    const { action, priceId, successUrl, cancelUrl } = await req.json();
    
    // Get the user from the auth headers
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Please log in." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the user's API key from the api_keys_config table
    const { data: keyData, error: keyError } = await supabaseClient
      .from('api_keys_config')
      .select('stripe_key')
      .eq('user_id', userData.user.id)
      .single();

    // For Stripe, we could also use a secret stored in Supabase Edge Function secrets
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || keyData?.stripe_key;
    
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ 
          error: "Stripe API key not configured", 
          message: "Please set up your Stripe API key in the settings or environment variables" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

    switch (action) {
      case 'createCheckoutSession':
        // Check if the user already exists as a Stripe customer
        const customers = await stripe.customers.list({
          email: userData.user.email,
          limit: 1,
        });
        
        let customerId;
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        } else {
          // Create a new customer if they don't exist
          const newCustomer = await stripe.customers.create({
            email: userData.user.email,
            metadata: {
              userId: userData.user.id,
            },
          });
          customerId = newCustomer.id;
        }

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price: priceId, // e.g., "price_1234567890"
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: successUrl || `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: cancelUrl || `${req.headers.get("origin")}/payment-canceled`,
          client_reference_id: userData.user.id,
        });

        return new Response(
          JSON.stringify({ 
            sessionId: session.id,
            url: session.url 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      
      case 'getSubscriptionStatus':
        // Find the customer
        const customerList = await stripe.customers.list({
          email: userData.user.email,
          limit: 1,
        });
        
        if (customerList.data.length === 0) {
          return new Response(
            JSON.stringify({ 
              status: "inactive",
              message: "No subscription found" 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get the customer's subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: customerList.data[0].id,
          status: 'active',
          limit: 1,
        });
        
        if (subscriptions.data.length === 0) {
          return new Response(
            JSON.stringify({ 
              status: "inactive",
              message: "No active subscription found" 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const subscription = subscriptions.data[0];
        
        return new Response(
          JSON.stringify({
            status: "active",
            subscriptionId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            plan: subscription.items.data[0].price.nickname || "Premium",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Error in Stripe service:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
