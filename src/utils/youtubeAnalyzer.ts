
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { useToast } from "@/hooks/use-toast";
import { extractVideoId } from "./youtube/extractVideoId";
import { generateAnalysisPDF } from "./youtube/pdfGenerator";
import { analyzeVideo } from "./youtube/videoAnalyzer";
import { fetchVideoInfo } from "./youtube/videoInfo";

export const useYoutubeAnalyzer = () => {
  const { canAnalyzeYoutube, incrementYoutubeAnalysis } = usePlanLimits();
  const { toast } = useToast();

  /**
   * Analyze a YouTube video and generate insights
   */
  const analyzeYoutubeVideo = async (videoUrl: string): Promise<{
    success: boolean;
    analysis?: string;
    videoId?: string;
    title?: string;
  }> => {
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

      // Fetch video info
      const videoInfo = await fetchVideoInfo(youtube, videoUrl);
      
      // Generate analysis
      const analysis = await analyzeVideo(perplexity, videoId, {
        title: videoInfo.title,
        description: videoInfo.description,
        channelTitle: videoInfo.channelTitle
      });
      
      // Increment usage counter
      incrementYoutubeAnalysis();
      
      return {
        success: true,
        analysis,
        videoId,
        title: videoInfo.title
      };
    } catch (error) {
      console.error("Error analyzing YouTube video:", error);
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de l'analyse de la vidéo",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    analyzeYoutubeVideo,
    generateAnalysisPDF,
    extractVideoId
  };
};
