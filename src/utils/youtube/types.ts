
// Define common types for YouTube analyzer
export interface VideoAnalysisResult {
  success: boolean;
  analysis?: string;
  videoId?: string;
  title?: string;
}

export interface PdfGenerationOptions {
  videoId: string;
  title: string;
  analysis: string;
}
