
import { PerplexityRequestBody, CourseContent } from "./types/perplexityTypes";

export const generateCourseContent = async (
  apiKey: string,
  topic: string,
  level: string = "Intermédiaire"
): Promise<CourseContent> => {
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
