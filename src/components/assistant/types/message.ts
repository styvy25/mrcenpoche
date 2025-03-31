
export interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  source?: "youtube" | "perplexity" | "rugby-xv";
  metadata?: {
    videoId?: string;
    videoTitle?: string;
    rugbyFormation?: {
      type: "XV";
      players: string[];
      substitutes: string[];
    };
  };
}
