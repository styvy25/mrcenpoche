
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";
import { useToast } from "@/hooks/use-toast";

/**
 * Analyze a YouTube video using the Perplexity AI API
 */
export const analyzeVideo = async (
  apiKey: string,
  videoId: string,
  videoInfo: { title: string; description: string; channelTitle: string }
): Promise<string> => {
  if (!apiKey) {
    throw new Error("Clé API Perplexity non configurée");
  }
  
  // Generate prompt for AI analysis
  const prompt = `
    Analyse cette vidéo YouTube du MRC (Mouvement pour la Renaissance du Cameroun):
    
    Titre: "${videoInfo.title}"
    Chaîne: ${videoInfo.channelTitle}
    Description: ${videoInfo.description}
    
    Pour ton analyse:
    1. Résume les points clés de la vidéo
    2. Identifie les messages politiques principaux
    3. Explique comment cette vidéo s'inscrit dans la stratégie de communication du MRC
    4. Propose des questions de réflexion pertinentes
    5. Suggère des liens avec d'autres sujets politiques camerounais
    
    Format ton analyse de manière structurée avec des sections claires.
  `;
  
  try {
    const analysis = await getPerplexityResponse(apiKey, prompt);
    return analysis;
  } catch (error) {
    console.error("Error analyzing video:", error);
    throw new Error("Erreur lors de l'analyse par l'IA");
  }
};
