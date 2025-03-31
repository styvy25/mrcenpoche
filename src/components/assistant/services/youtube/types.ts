
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

// Error types for better error handling
export enum YouTubeErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  INVALID_API_KEY = 'INVALID_API_KEY',
  CACHE_ERROR = 'CACHE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface YouTubeError {
  type: YouTubeErrorType;
  message: string;
  originalError?: any;
}
