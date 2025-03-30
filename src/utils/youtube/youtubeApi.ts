
import { useToast } from "@/hooks/use-toast";
import { VideoAnalysisResult } from "./types";
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";

/**
 * Hook for interacting with the YouTube API
 */
export const useYoutubeApi = () => {
  const { toast } = useToast();

  /**
   * Fetches video information from YouTube API
   */
  const fetchVideoInfo = async (videoId: string, apiKey: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        toast({
          title: "Vidéo non trouvée",
          description: "Impossible de trouver cette vidéo sur YouTube",
          variant: "destructive"
        });
        return null;
      }
      
      return data.items[0].snippet;
    } catch (error) {
      console.error("Error fetching video info:", error);
      toast({
        title: "Erreur API",
        description: "Impossible de récupérer les informations de la vidéo",
        variant: "destructive"
      });
      return null;
    }
  };

  /**
   * Generates analysis using Perplexity AI
   */
  const generateAnalysis = async (perplexityKey: string, videoInfo: any): Promise<string | null> => {
    try {
      const { title, description, channelTitle } = videoInfo;
      
      // Create prompt for Perplexity
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
      
      const analysis = await getPerplexityResponse(perplexityKey, prompt);
      return analysis;
    } catch (error) {
      console.error("Error generating analysis:", error);
      return null;
    }
  };

  /**
   * Complete YouTube video analysis process
   */
  const analyzeVideo = async (
    videoId: string, 
    youtubeApiKey: string, 
    perplexityKey: string
  ): Promise<VideoAnalysisResult> => {
    try {
      // Fetch video information
      const videoInfo = await fetchVideoInfo(videoId, youtubeApiKey);
      if (!videoInfo) {
        return { success: false };
      }
      
      // Generate analysis
      const analysis = await generateAnalysis(perplexityKey, videoInfo);
      if (!analysis) {
        toast({
          title: "Erreur d'analyse",
          description: "Impossible de générer l'analyse de la vidéo",
          variant: "destructive"
        });
        return { success: false };
      }
      
      return {
        success: true,
        analysis,
        videoId,
        title: videoInfo.title
      };
    } catch (error) {
      console.error("Error in video analysis process:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de la vidéo",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    fetchVideoInfo,
    generateAnalysis,
    analyzeVideo
  };
};
