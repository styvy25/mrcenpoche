
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { extractVideoId } from "./extractVideoId";
import { useVideoAnalysis } from "./videoAnalysis";
import { usePdfGenerator } from "./pdfGenerator";
import { VideoAnalysisResult, PdfGenerationOptions } from "./types";

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

// Re-export types for convenience
export type { VideoAnalysisResult, PdfGenerationOptions };
