
export interface VideoAnalysisResult {
  success: boolean;
  videoId?: string;
  title?: string;
  analysis?: string;
  error?: string;
}

export type PdfGenerationOptions = {
  videoId: string;
  title: string;
  analysis: string;
};
