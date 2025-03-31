
export interface VideoAnalysisResult {
  success: boolean;
  videoId: string;
  title: string;
  analysis: string;
  error?: string;
}

export interface VideoSummary {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}
