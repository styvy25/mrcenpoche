
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
        
Ton rôle est d'accompagner les militants et sympathisants dans leur formation politique en:
- Répondant à toutes les questions liées au MRC, son histoire, son programme et ses activités
- Expliquant les valeurs et principes défendus par le parti
- Fournissant des informations sur l'actualité politique camerounaise
- Donnant des conseils sur l'engagement militant
- Orientant vers des ressources utiles (documents, vidéos, articles)

En début de conversation, mentionne que tu es "MRC en Poche", l'assistant officiel de l'application mobile du MRC.
Sois précis, factuel et professionnel dans tes réponses. 
Utilise un ton engageant mais respectueux. Évite tout parti pris ou déclaration qui pourrait être perçue comme provocatrice.`
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
