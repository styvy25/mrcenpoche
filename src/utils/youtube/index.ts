
import { usePlanLimits, Feature } from "@/hooks/usePlanLimits";
import { extractVideoId } from "./extractVideoId";
import { useVideoAnalysis } from "./videoAnalysis";
import { usePdfGenerator } from "./pdfGenerator";
import { VideoAnalysisResult, PdfGenerationOptions } from "./types";
import { useYoutubeApi } from "./youtubeApi";

/**
 * Main hook for YouTube functionality
 */
export const useYoutubeAnalyzer = () => {
  const { canAnalyzeYoutube, incrementYoutubeAnalysis } = usePlanLimits();
  const { analyzeYoutubeVideo } = useVideoAnalysis();
  const { generateAnalysisPDF } = usePdfGenerator();
  
  return {
    extractVideoId,
    analyzeYoutubeVideo: (videoUrl: string) => 
      analyzeYoutubeVideo(videoUrl, canAnalyzeYoutube, incrementYoutubeAnalysis),
    generateAnalysisPDF
  };
};

// Re-export types and API hook for convenience
export type { VideoAnalysisResult, PdfGenerationOptions };
export { useYoutubeApi };
