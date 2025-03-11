
export interface PerplexityRequestBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens: number;
}

export interface CourseContent {
  title: string;
  content: string;
  summary: string;
  keywords: string[];
  relatedVideos: string[];
}
