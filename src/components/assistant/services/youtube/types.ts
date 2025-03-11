
/**
 * Types related to YouTube service functionality
 */

export interface VideoInfo {
  title: string;
  description: string;
  transcript?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export interface YouTubeSearchParams {
  key: string;
  q: string;
  part: string;
  type: string;
  maxResults: number;
  channelId?: string;
}

