import { PerplexityRequestBody } from "./types/perplexityTypes";
import { useToast } from "@/hooks/use-toast";

// Fallback responses for offline mode
const offlineResponses = [
  "Le MRC (Mouvement pour la Renaissance du Cameroun) est un parti politique camerounais fondé en 2012 par Maurice Kamto. Il prône la démocratie, la bonne gouvernance et le développement économique durable.",
  "Le programme politique du MRC s'articule autour de la refonte des institutions, la lutte contre la corruption, le développement économique inclusif, et la protection des droits et libertés fondamentales.",
  "Maurice Kamto est le président du MRC. Ancien ministre délégué à la Justice, il est un juriste internationalement reconnu qui a notamment représenté le Cameroun devant la Cour internationale de Justice.",
  "Pour devenir militant du MRC, vous pouvez vous rapprocher d'une cellule locale du parti, participer aux réunions et activités, puis formaliser votre adhésion en remplissant un formulaire et en vous acquittant de la cotisation annuelle.",
  "Les valeurs fondamentales du MRC sont l'intégrité, la transparence, la justice sociale, le patriotisme et le respect de la diversité culturelle camerounaise.",
  "Les élections présidentielles de 2018 ont été contestées par le MRC, qui a revendiqué la victoire de son candidat Maurice Kamto. Cette contestation a mené à des manifestations et à l'emprisonnement de plusieurs leaders du parti, dont Kamto lui-même.",
  "La vision économique du MRC inclut la diversification de l'économie, la réduction de la dépendance aux importations, le soutien aux PME locales et l'investissement dans les infrastructures et l'éducation.",
  "Concernant l'éducation, le MRC propose une réforme du système éducatif pour l'adapter aux besoins du marché du travail, la revalorisation du statut des enseignants et l'amélioration des infrastructures scolaires.",
  "Pour la jeunesse, le MRC propose des programmes d'entrepreneuriat, de formation professionnelle et d'insertion dans le tissu économique pour lutter contre le chômage des jeunes."
];

export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  // Check if we're online
  if (!navigator.onLine) {
    console.log("Device is offline. Using fallback response.");
    // Return a random offline response or a specific one based on keywords in the question
    return getOfflineResponse(userMessage);
  }

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

En début de conversation, mentionne que tu es "MRC en Poche", l'assistant officiel de l'application mobile du MRC.
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

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', response.status);
      // If API key is invalid or expired, we'll use the offline response
      return getOfflineResponse(userMessage);
    }

    const data = await response.json();
    
    // Cache this response for offline use
    cacheResponse(userMessage, data.choices[0].message.content);
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in Perplexity request:', error);
    return getOfflineResponse(userMessage);
  }
};

// Function to get appropriate offline response based on user message
const getOfflineResponse = (userMessage: string): string => {
  // First check if we have a cached response for this or similar query
  const cachedResponse = getCachedResponse(userMessage);
  if (cachedResponse) {
    return cachedResponse;
  }

  // If no cached response, provide a general response based on keywords
  const lowerCaseMsg = userMessage.toLowerCase();
  
  if (lowerCaseMsg.includes('qui est') || lowerCaseMsg.includes('kamto') || lowerCaseMsg.includes('président')) {
    return offlineResponses[2];
  } else if (lowerCaseMsg.includes('programme') || lowerCaseMsg.includes('politique')) {
    return offlineResponses[1];
  } else if (lowerCaseMsg.includes('adhérer') || lowerCaseMsg.includes('devenir') || lowerCaseMsg.includes('militant')) {
    return offlineResponses[3];
  } else if (lowerCaseMsg.includes('valeur') || lowerCaseMsg.includes('principe')) {
    return offlineResponses[4];
  } else if (lowerCaseMsg.includes('élection') || lowerCaseMsg.includes('2018') || lowerCaseMsg.includes('présidentielle')) {
    return offlineResponses[5];
  } else if (lowerCaseMsg.includes('économie') || lowerCaseMsg.includes('économique')) {
    return offlineResponses[6];
  } else if (lowerCaseMsg.includes('éducation') || lowerCaseMsg.includes('école') || lowerCaseMsg.includes('université')) {
    return offlineResponses[7];
  } else if (lowerCaseMsg.includes('jeune') || lowerCaseMsg.includes('jeunesse')) {
    return offlineResponses[8];
  }
  
  // Default response
  return "Je suis MRC en Poche, l'assistant IA du Mouvement pour la Renaissance du Cameroun. Je fonctionne actuellement en mode hors-ligne et mes réponses sont limitées. Pour des informations plus détaillées, veuillez me consulter lorsque vous serez connecté à Internet.";
};

// Simple caching mechanism
const cacheResponse = (question: string, answer: string) => {
  try {
    const cache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    // Normalize the question by removing punctuation and converting to lowercase
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Store the response
    cache[normalizedQuestion] = answer;
    
    // Keep cache size reasonable (max 50 entries)
    const keys = Object.keys(cache);
    if (keys.length > 50) {
      delete cache[keys[0]];
    }
    
    localStorage.setItem('mrc_assistant_cache', JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching response:', error);
  }
};

const getCachedResponse = (question: string): string | null => {
  try {
    const cache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Look for exact match
    if (cache[normalizedQuestion]) {
      return cache[normalizedQuestion];
    }
    
    // Look for partial matches
    const words = normalizedQuestion.split(' ').filter(word => word.length > 3);
    for (const key of Object.keys(cache)) {
      const keyWords = key.split(' ');
      // If more than 50% of significant words match, consider it a hit
      const matchingWords = words.filter(word => keyWords.includes(word)).length;
      if (matchingWords > 0 && matchingWords / words.length > 0.5) {
        return cache[key];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving cached response:', error);
    return null;
  }
};
