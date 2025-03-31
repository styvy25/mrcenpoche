
export interface Message {
  role: "assistant" | "user" | "system";
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
  // Adding optional fields for compatibility with other Message types
  text?: string;
  sender?: string;
}
