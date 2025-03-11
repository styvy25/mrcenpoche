
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface PerplexityRequest {
  prompt: string;
  apiKey?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get API key from request or use the one stored in secrets
    const { prompt, apiKey } = await req.json() as PerplexityRequest;
    
    // Get the API key from secrets if not provided in the request
    const PERPLEXITY_API_KEY = apiKey || Deno.env.get("PERPLEXITY_API_KEY");
    
    if (!PERPLEXITY_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Perplexity API key not found" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Make request to Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: "You are a specialized assistant for the MRC (Mouvement pour la Renaissance du Cameroun) political party. You provide accurate and educational content about Cameroonian politics, the MRC's positions, and democratic principles. Format your responses in clear, professional language suitable for educational content."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        content: data.choices?.[0]?.message?.content || "No response from Perplexity API"
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
