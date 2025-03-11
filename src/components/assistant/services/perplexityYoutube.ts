
import { PerplexityRequestBody } from "./types/perplexityTypes";

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
