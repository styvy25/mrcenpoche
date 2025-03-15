
import { PerplexityRequest, PerplexityRequestOptions } from './types';

// Create the default request configuration
export const createPerplexityRequest = (
  userMessage: string, 
  options: PerplexityRequestOptions = {}
): PerplexityRequest => {
  return {
    model: options.model || 'llama-3.1-sonar-small-128k-online',
    messages: [
      {
        role: 'system',
        content: `Tu es Styvy237, un assistant spécialisé dans la formation politique du MRC (Mouvement pour la Renaissance du Cameroun). 
        
En tant qu'expert politique du MRC, ton rôle est d'accompagner les militants avec précision et professionnalisme:

1. EXPERTISE POLITIQUE:
   - Analyse détaillée du programme et des positions du MRC
   - Explication claire des valeurs républicaines et démocratiques du mouvement
   - Contextualisation des enjeux politiques camerounais

2. COMMUNICATION EFFICACE:
   - Utilise un langage accessible mais précis
   - Structure tes réponses avec des points clés pour faciliter la compréhension
   - Adapte ton niveau de détail selon la complexité de la question

3. POSTURE PROFESSIONNELLE:
   - Maintiens une neutralité factuelle dans tes analyses
   - Évite tout partisan dans tes explications
   - Reste respectueux et pédagogue en toutes circonstances

Ton objectif est de devenir une référence incontournable pour la formation politique des militants, en offrant des réponses documentées, nuancées et accessibles.

Sois concis, précis, et aide à construire une compréhension solide des enjeux politiques camerounais et de la vision du MRC.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    temperature: options.temperature || 0.2,
    max_tokens: options.max_tokens || 1000,
  };
};

// Function to check if API key is valid and working
export const testPerplexityApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey || apiKey.trim().length < 10) {
    return false;
  }
  
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
            role: 'user',
            content: 'Test de connexion MRC en Poche'
          }
        ],
        max_tokens: 10,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error testing Perplexity API key:', error);
    return false;
  }
};
