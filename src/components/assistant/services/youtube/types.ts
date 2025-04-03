
export interface YouTubeSearchResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export interface YouTubeVideoDetails {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  duration: string;
  tags?: string[];
}

export interface VideoDownloadService {
  downloadVideo: (videoId: string, format: string) => Promise<{ success: boolean, message: string, url?: string }>;
  getDownloadFormats: (videoId: string) => Promise<string[]>;
}

export interface YouTubeAPIConfig {
  apiKey: string;
  maxResults?: number;
  useCache?: boolean;
}
