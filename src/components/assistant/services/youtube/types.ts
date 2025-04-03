
export enum YouTubeErrorType {
  NETWORK_ERROR = "NETWORK_ERROR",
  API_ERROR = "API_ERROR",
  INVALID_API_KEY = "INVALID_API_KEY",
  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

export interface YouTubeError {
  type: YouTubeErrorType;
  message: string;
  originalError?: any;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export interface VideoInfo {
  title: string;
  description: string;
  transcript: string;
}

export interface DownloadLink {
  quality: string;
  url: string;
  format: string;
}

export interface VideoDownloadLinks {
  videoId: string;
  downloadServices: Array<{
    name: string;
    url: string;
  }>;
  watchUrl: string;
}
