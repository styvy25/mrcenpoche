
import { PerplexityRequestBody } from "./types/perplexityTypes";

export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  const requestBody: PerplexityRequestBody = {
    model: 'llama-3.1-sonar-small-128k-online',
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

Sois précis, factuel et professionnel dans tes réponses. 
Utilise un ton engageant mais respectueux. Évite tout parti pris ou déclaration qui pourrait être perçue comme provocatrice.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    temperature: 0.2,
    max_tokens: 1000,
  };

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Erreur API');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
