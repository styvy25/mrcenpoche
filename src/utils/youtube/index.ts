
import { Feature } from "@/types";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { extractVideoId } from "./extractVideoId";
import { useVideoAnalysis } from "./videoAnalysis";
import { usePdfGenerator } from "./pdfGenerator";
import { useYoutubeApi } from "./youtubeApi";

/**
 * Main hook for YouTube functionality
 */
export const useYoutubeAnalyzer = () => {
  const { hasFeatureAccess, hasReachedLimit, incrementYoutubeAnalysis } = usePlanLimits();
  const { analyzeYoutubeVideo } = useVideoAnalysis();
  const { generateAnalysisPDF } = usePdfGenerator();
  
  const canAnalyzeYoutube = () => hasFeatureAccess(Feature.YOUTUBE_ANALYSIS);
  
  return {
    extractVideoId,
    analyzeYoutubeVideo: (videoUrl: string) => 
      analyzeYoutubeVideo(videoUrl, canAnalyzeYoutube, incrementYoutubeAnalysis),
    generateAnalysisPDF
  };
};

// Re-export API hook for convenience
export { useYoutubeApi };
