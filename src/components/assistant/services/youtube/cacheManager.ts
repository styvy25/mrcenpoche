
import { YouTubeVideo, VideoInfo } from './types';

// Cache for video searches and information
let videoSearchCache: Record<string, YouTubeVideo[]> = {};
let videoInfoCache: Record<string, VideoInfo> = {};

/**
 * Get cached search results if available
 */
export const getCachedSearch = (query: string): YouTubeVideo[] | null => {
  const cacheKey = query.toLowerCase().trim();
  return videoSearchCache[cacheKey] || null;
};

/**
 * Cache search results for future use
 */
export const cacheSearchResults = (query: string, videos: YouTubeVideo[]): void => {
  const cacheKey = query.toLowerCase().trim();
  videoSearchCache[cacheKey] = videos;
};

/**
 * Get cached video info if available
 */
export const getCachedVideoInfo = (videoId: string): VideoInfo | null => {
  return videoInfoCache[videoId] || null;
};

/**
 * Cache video info for future use
 */
export const cacheVideoInfo = (videoId: string, info: VideoInfo): void => {
  videoInfoCache[videoId] = info;
};

/**
 * Clear all YouTube caches
 */
export const clearCache = (): void => {
  videoSearchCache = {};
  videoInfoCache = {};
  console.log("YouTube cache cleared");
};
