
// Types for YouTube API responses and errors

export enum YouTubeErrorType {
  NETWORK_ERROR = 'network_error',
  API_ERROR = 'api_error',
  QUOTA_EXCEEDED = 'quota_exceeded',
  INVALID_API_KEY = 'invalid_api_key',
  VIDEO_NOT_FOUND = 'video_not_found'
}

export interface YouTubeError {
  type: YouTubeErrorType;
  message: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export interface VideoInfo {
  title: string;
  description: string;
  transcript: string;
}

export interface CachedVideo {
  videoId: string;
  info: VideoInfo;
  cachedAt: number;
}
