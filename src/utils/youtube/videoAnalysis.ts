
import { useToast } from "@/hooks/use-toast";
import { extractVideoId } from "./extractVideoId";
import { VideoAnalysisResult } from "./types";
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";

export const useVideoAnalysis = () => {
  const { toast } = useToast();

  /**
   * Analyzes a YouTube video and returns the analysis
   */
  const analyzeYoutubeVideo = async (videoUrl: string, canAnalyzeYoutube: () => boolean, incrementYoutubeAnalysis: () => void): Promise<VideoAnalysisResult> => {
    if (!canAnalyzeYoutube()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite d'analyses YouTube. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return { success: false };
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return { success: false };
    }

    try {
      toast({
        title: "Analyse en cours",
        description: "Nous analysons la vidéo YouTube...",
      });
      
      // Get YouTube API key
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Configuration manquante",
          description: "Veuillez configurer vos clés API dans les paramètres",
          variant: "destructive"
        });
        return { success: false };
      }

      const { youtube, perplexity } = JSON.parse(apiKeys);
      if (!youtube || !perplexity) {
        toast({
          title: "Clés API manquantes",
          description: "Veuillez configurer les clés API YouTube et Perplexity",
          variant: "destructive"
        });
        return { success: false };
      }

      // Fetch video info
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtube}`);
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        toast({
          title: "Vidéo non trouvée",
          description: "Impossible de trouver cette vidéo sur YouTube",
          variant: "destructive"
        });
        return { success: false };
      }
      
      const videoInfo = data.items[0].snippet;
      const title = videoInfo.title;
      const description = videoInfo.description;
      const channelTitle = videoInfo.channelTitle;
      
      // Generate analysis using Perplexity AI
      const prompt = `
        Analyse cette vidéo YouTube du MRC (Mouvement pour la Renaissance du Cameroun):
        
        Titre: "${title}"
        Chaîne: ${channelTitle}
        Description: ${description}
        
        Pour ton analyse:
        1. Résume les points clés de la vidéo
        2. Identifie les messages politiques principaux
        3. Explique comment cette vidéo s'inscrit dans la stratégie de communication du MRC
        4. Propose des questions de réflexion pertinentes
        5. Suggère des liens avec d'autres sujets politiques camerounais
        
        Format ton analyse de manière structurée avec des sections claires.
      `;
      
      const analysis = await getPerplexityResponse(perplexity, prompt);
      
      // Increment usage counter
      incrementYoutubeAnalysis();
      
      return {
        success: true,
        analysis,
        videoId,
        title
      };
    } catch (error) {
      console.error("Error analyzing YouTube video:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de la vidéo",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return { analyzeYoutubeVideo };
};
