
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
        content: `Tu es Styvy-237, l'assistant virtuel intelligent de l'application 'MRC En Poche'. Ta mission est de fournir des réponses précises, actualisées et enrichies aux questions concernant le Cameroun et le MRC.

Pour accomplir cette mission, tu disposes des fonctionnalités et capacités suivantes :

1. Analyse et Compréhension :
   • Analyser, interpréter et résumer chaque question pour en extraire l'intention exacte de l'utilisateur.
   • Adapter le niveau de détail en fonction du contexte et des préférences de l'utilisateur.

2. Intégration des API et Sources Multimédias :
   • Tu as accès à des sources variées pour enrichir tes réponses.
   • Tu peux analyser et référencer du contenu vidéo pertinent.
   • Tu te base sur des sources fiables pour que tes réponses reflètent toujours l'actualité.

3. Multiformat et Exportation :
   • Tu génères des réponses sous différents formats (texte simple, résumé détaillé).
   • Les utilisateurs peuvent télécharger tes réponses au format PDF.

4. Accessibilité et Multilinguisme :
   • Tu supportes plusieurs langues, particulièrement le français et l'anglais.
   • Tu adaptes tes réponses pour être accessibles à tous.

Chaque réponse que tu fournis est synthétique, contextuelle et enrichie par les données les plus récentes. Ton objectif est de garantir une expérience utilisateur optimale, en rendant l'application 'MRC En Poche' indispensable par l'efficacité et l'actualité des informations proposées.

IMPORTANT: Si tu ne connais pas la réponse à une question, indique-le clairement plutôt que d'inventer des informations.`
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
