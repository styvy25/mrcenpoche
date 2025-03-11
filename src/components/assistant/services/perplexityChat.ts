
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
  "Pour la jeunesse, le MRC propose des programmes d'entrepreneuriat, de formation professionnelle et d'insertion dans le tissu économique pour lutter contre le chômage des jeunes.",
  "Le MRC défend une politique étrangère basée sur la souveraineté nationale, la coopération internationale équitable et le positionnement du Cameroun comme un acteur important sur la scène régionale et mondiale."
];

// More detailed responses for specific topics
const topicResponses: Record<string, string> = {
  "histoire": "Le MRC a été fondé en août 2012 par Maurice Kamto et d'autres personnalités politiques camerounaises. Le parti est né dans un contexte de désir de changement politique au Cameroun, après plusieurs décennies sous le régime de Paul Biya. Le MRC s'est rapidement imposé comme une force politique alternative, prônant la démocratie, la bonne gouvernance et le développement économique inclusif.",
  
  "élections": "Lors des élections présidentielles de 2018, le MRC a présenté Maurice Kamto comme candidat. Après le scrutin, face aux allégations de fraudes et d'irrégularités, le MRC a revendiqué la victoire. Cette contestation a conduit à des manifestations pacifiques et à l'arrestation de plusieurs leaders du parti, dont Maurice Kamto, qui a été emprisonné pendant plusieurs mois avant d'être libéré suite à des pressions nationales et internationales.",
  
  "programme": "Le programme politique du MRC vise à transformer le Cameroun en une démocratie moderne avec des institutions fortes et transparentes. Il propose des réformes constitutionnelles, administratives et électorales, ainsi qu'un plan de développement économique axé sur la diversification, l'industrialisation et la valorisation des ressources locales. Le MRC défend également l'amélioration des systèmes éducatif et sanitaire, et une politique de décentralisation effective.",
  
  "mobilisation": "La stratégie de mobilisation du MRC repose sur l'engagement citoyen et la sensibilisation politique. Le parti organise régulièrement des rencontres avec les populations, des conférences thématiques et utilise les réseaux sociaux pour diffuser ses messages. Le MRC encourage la participation politique active, particulièrement des jeunes et des femmes, et promeut une culture de responsabilité citoyenne.",
  
  "jeunesse": "Le MRC accorde une place importante à la jeunesse camerounaise dans son projet politique. Le parti propose des programmes de formation professionnelle adaptés au marché du travail, des initiatives d'entrepreneuriat et d'insertion économique, ainsi que des mécanismes de participation des jeunes aux processus décisionnels. Le MRC considère la jeunesse comme le moteur du changement et de l'innovation au Cameroun.",
  
  "économie": "La vision économique du MRC est basée sur un modèle de développement durable et inclusif. Le parti propose de diversifier l'économie camerounaise, actuellement trop dépendante des matières premières, en investissant dans l'agriculture moderne, l'industrie manufacturière et les services à haute valeur ajoutée. Le MRC défend également une meilleure répartition des richesses nationales et la lutte contre la corruption.",
  
  "crise anglophone": "Concernant la crise dans les régions anglophones, le MRC prône une solution politique inclusive basée sur le dialogue. Le parti propose un modèle de décentralisation avancée ou de fédéralisme qui respecterait les spécificités culturelles et linguistiques des différentes régions du Cameroun. Le MRC condamne la violence et appelle à une résolution pacifique du conflit.",
  
  "international": "Sur le plan international, le MRC défend une politique étrangère qui préserve la souveraineté du Cameroun tout en favorisant des partenariats équilibrés avec divers pays et organisations internationales. Le parti critique la dépendance excessive vis-à-vis de certaines puissances et prône une diversification des relations diplomatiques et économiques."
};

// Response cache to store question-answer pairs
let responseCache: Record<string, string> = {};

export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  // Check if we're online
  if (!navigator.onLine) {
    console.log("Device is offline. Using fallback response.");
    // Return a response based on the user's question
    return getOfflineResponse(userMessage);
  }

  // Valid API key check
  if (!apiKey || apiKey.trim().length < 10) {
    console.log("Invalid API key. Using fallback response.");
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

  // Check for topic-specific responses
  const lowerCaseMsg = userMessage.toLowerCase();
  
  // Try to identify the main topic of the question
  for (const [topic, response] of Object.entries(topicResponses)) {
    if (lowerCaseMsg.includes(topic)) {
      return response;
    }
  }
  
  // If no specific topic identified, check for general keywords
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
  } else if (lowerCaseMsg.includes('étranger') || lowerCaseMsg.includes('international')) {
    return offlineResponses[9];
  }
  
  // Return a random general response if no specific match
  const randomIndex = Math.floor(Math.random() * offlineResponses.length);
  return offlineResponses[randomIndex];
};

// Enhanced caching mechanism with more intelligent storage
const cacheResponse = (question: string, answer: string) => {
  try {
    // Get existing cache or initialize new one
    const cache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    
    // Normalize the question by removing punctuation and converting to lowercase
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Extract keywords (words with more than 3 characters)
    const keywords = normalizedQuestion.split(' ')
      .filter(word => word.length > 3)
      .join(' ');
    
    // Store using keywords as key for better fuzzy matching later
    if (keywords.length > 0) {
      cache[keywords] = answer;
    }
    
    // Also store the full normalized question for exact matches
    cache[normalizedQuestion] = answer;
    
    // Keep cache size reasonable (max 50 entries)
    const keys = Object.keys(cache);
    if (keys.length > 100) {
      // Remove oldest entries
      const keysToRemove = keys.slice(0, keys.length - 100);
      keysToRemove.forEach(key => delete cache[key]);
    }
    
    localStorage.setItem('mrc_assistant_cache', JSON.stringify(cache));
    
    // Update in-memory cache too
    responseCache = cache;
  } catch (error) {
    console.error('Error caching response:', error);
  }
};

const getCachedResponse = (question: string): string | null => {
  try {
    // Try to get from in-memory cache first (faster)
    if (Object.keys(responseCache).length === 0) {
      // If in-memory cache is empty, load from localStorage
      responseCache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    }
    
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Try exact match first
    if (responseCache[normalizedQuestion]) {
      return responseCache[normalizedQuestion];
    }
    
    // Extract significant words for fuzzy matching
    const words = normalizedQuestion.split(' ').filter(word => word.length > 3);
    
    // Look for partial matches based on keywords
    for (const key of Object.keys(responseCache)) {
      const keyWords = key.split(' ');
      
      // Count matching significant words
      const matchingWords = words.filter(word => keyWords.includes(word)).length;
      
      // If more than 60% of significant words match, consider it a hit
      // This improves match quality compared to the previous 50% threshold
      if (matchingWords > 0 && matchingWords / words.length > 0.6) {
        return responseCache[key];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving cached response:', error);
    return null;
  }
};

// Public method to clear the response cache
export const clearResponseCache = () => {
  localStorage.removeItem('mrc_assistant_cache');
  responseCache = {};
  console.log("Perplexity response cache cleared");
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
