
export interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  source?: "youtube" | "perplexity";
  metadata?: {
    videoId?: string;
    videoTitle?: string;
  };
}
