
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    const { action, prompt, category, options } = await req.json();
    
    // Get the user's API key from Supabase
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
      .select('perplexity_key')
      .eq('user_id', userData.user.id)
      .single();

    if (keyError || !keyData?.perplexity_key) {
      return new Response(
        JSON.stringify({ 
          error: "Perplexity API key not configured", 
          message: "Please set up your Perplexity API key in the settings" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const perplexityApiKey = keyData.perplexity_key;

    switch (action) {
      case 'generateQuiz':
        const quiz = await generatePoliticalQuiz(perplexityApiKey, category);
        return new Response(
          JSON.stringify(quiz),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      case 'analyzeResponse':
        const analysis = await getResponse(perplexityApiKey, prompt);
        return new Response(
          JSON.stringify({ response: analysis }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Error in Perplexity service:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Function to generate a political quiz using Perplexity API
async function generatePoliticalQuiz(apiKey: string, category: string = "actualité politique"): Promise<any> {
  try {
    const quizPrompt = `
      Génère un quiz de 5 questions à choix multiples sur l'${category} camerounaise récente, 
      particulièrement concernant le Mouvement pour la Renaissance du Cameroun (MRC) et son leader Maurice Kamto.
      
      Pour chaque question, inclus:
      1. La question
      2. Quatre options de réponse
      3. L'index de la bonne réponse (0-3)
      4. Une brève explication de la réponse correcte
      
      Retourne le résultat sous forme de JSON avec ce format:
      {
        "questions": [
          {
            "question": "Texte de la question",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 2,
            "explanation": "Explication de la réponse"
          }
        ]
      }
    `;
    
    return await getResponse(apiKey, quizPrompt);
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

// Function to get a response from the Perplexity API
async function getResponse(apiKey: string, prompt: string): Promise<any> {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `Tu es Styvy-237, un assistant spécialisé dans la formation politique camerounaise, particulièrement sur le MRC (Mouvement pour la Renaissance du Cameroun) et son leader Maurice Kamto.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Try to extract JSON if the response is a JSON string
    try {
      if (content.includes('{') && content.includes('}')) {
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0].replace(/```json\n|```/g, ''));
        }
      }
    } catch (e) {
      console.error("Error parsing JSON from response:", e);
    }
    
    return content;
  } catch (error) {
    console.error("Error getting Perplexity response:", error);
    throw error;
  }
}
