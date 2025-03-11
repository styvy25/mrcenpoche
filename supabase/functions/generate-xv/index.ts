
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    const systemPrompt = `Tu es un expert en rugby camerounais. Tu dois générer une composition d'équipe de XV (15 joueurs + 8 remplaçants) pour le MRC Rugby.
    Assure-toi que la composition respecte les règles du rugby à XV. Format de réponse attendu:
    1. Liste des 15 titulaires avec leur poste et numéro
    2. Liste des 8 remplaçants
    3. Une brève explication de tes choix tactiques
    
    Sois précis et détaillé dans tes explications.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: context || "Génère une composition d'équipe pour le prochain match." }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const composition = data.choices[0].message.content;

    return new Response(JSON.stringify({ composition }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-xv function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
