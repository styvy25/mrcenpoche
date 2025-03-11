
interface PerplexityRequestBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens: number;
}

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

export const generateCourseContent = async (
  apiKey: string,
  topic: string,
  level: string = "Intermédiaire"
): Promise<{
  title: string;
  content: string;
  summary: string;
  keywords: string[];
  relatedVideos: string[];
}> => {
  const prompt = `Crée un cours complet sur "${topic}" pour le Mouvement pour la Renaissance du Cameroun (MRC).
  
  Niveau du cours: ${level}
  
  Le cours doit inclure:
  1. Un titre accrocheur
  2. Un contenu détaillé et structuré avec sections et sous-sections
  3. Un résumé concis
  4. Des mots-clés pertinents
  5. Suggestions de 3 termes de recherche YouTube pour trouver des vidéos complémentaires liées au MRC et Maurice Kamto
  
  Formate ta réponse en JSON avec les clés suivantes: title, content, summary, keywords, relatedVideos`;

  const requestBody: PerplexityRequestBody = {
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [
      {
        role: 'system',
        content: `Tu es un expert en éducation politique spécialisé dans le MRC (Mouvement pour la Renaissance du Cameroun). Tu crées des cours structurés, informatifs et engageants. Assure-toi que le contenu soit factuel, bien organisé et adapté au niveau demandé.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 4000,
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
    throw new Error('Erreur API lors de la génération du cours');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    // Extract the JSON content
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                      content.match(/{[\s\S]*}/) ||
                      null;
                      
    if (jsonMatch) {
      const jsonContent = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonContent);
    } else {
      // If no JSON format is found, try to parse the entire content
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error parsing course content:", error);
    
    // Fallback: construct a basic structure from the text content
    return {
      title: "Cours généré",
      content: content,
      summary: "Résumé non disponible",
      keywords: ["MRC", "politique", "Cameroun"],
      relatedVideos: ["MRC Cameroun", "Maurice Kamto discours", "politique camerounaise"]
    };
  }
};

export const searchYouTubeVideos = async (
  apiKey: string,
  searchTerms: string[]
): Promise<string[]> => {
  const youtubeSearchPrompt = `
    Pour ces termes de recherche YouTube: "${searchTerms.join('", "')}",
    retourne-moi 3 identifiants de vidéos YouTube (juste les ID, pas les URLs complètes) 
    qui seraient pertinents pour un cours sur le MRC (Mouvement pour la Renaissance du Cameroun).
    
    Format ta réponse comme un tableau JSON simple de codes d'identification YouTube, sans explications.
  `;

  const requestBody: PerplexityRequestBody = {
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [
      {
        role: 'system',
        content: `Tu es un assistant qui aide à trouver des vidéos YouTube pertinentes. Tu réponds uniquement avec des identifiants de vidéos YouTube pertinents, sans commentaires ni explications supplémentaires.`
      },
      {
        role: 'user',
        content: youtubeSearchPrompt
      }
    ],
    temperature: 0.3,
    max_tokens: 500,
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
    throw new Error('Erreur API lors de la recherche de vidéos');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    // Extract the JSON array of video IDs
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                      content.match(/\[([\s\S]*?)\]/) ||
                      null;
                      
    if (jsonMatch) {
      const jsonContent = jsonMatch[1] || jsonMatch[0];
      const videoIds = JSON.parse(jsonContent.includes('[') ? jsonContent : `[${jsonContent}]`);
      return videoIds;
    } else {
      // If no JSON format is found, try to extract video IDs using regex
      const videoIdRegex = /[a-zA-Z0-9_-]{11}/g;
      const matches = content.match(videoIdRegex);
      return matches || [];
    }
  } catch (error) {
    console.error("Error parsing YouTube video IDs:", error);
    return [];
  }
};
