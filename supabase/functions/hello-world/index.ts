
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const message = {
      message: "Hello world!",
      timestamp: new Date().toISOString(),
      origin: req.headers.get('origin') || 'unknown'
    };

    // Log the request for debugging
    console.log(`Request received from: ${message.origin} at ${message.timestamp}`);

    return new Response(
      JSON.stringify(message),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error in hello-world function:", error);
    
    return new Response(
      JSON.stringify({ error: String(error) }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
