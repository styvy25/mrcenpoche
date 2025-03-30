
import { useToast } from "@/hooks/use-toast";
import { extractVideoId } from "./extractVideoId";
import { VideoAnalysisResult } from "./types";
import { useYoutubeApi } from "./youtubeApi";

export const useVideoAnalysis = () => {
  const { toast } = useToast();
  const { analyzeVideo } = useYoutubeApi();

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
      
      // Get API keys
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

      // Analyze the video
      const result = await analyzeVideo(videoId, youtube, perplexity);
      
      if (result.success) {
        // Increment usage counter
        incrementYoutubeAnalysis();
      }
      
      return result;
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
