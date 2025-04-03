
import { VideoInfo, YouTubeVideo } from './types';

// Types for the cache
type VideoInfoCache = Record<string, VideoInfo>;
type SearchCache = Record<string, YouTubeVideo[]>;

// In-memory cache
let videoInfoCache: VideoInfoCache = {};
let searchCache: SearchCache = {};

// Cache time limits (in minutes)
const CACHE_EXPIRY = 60; // 1 hour

// Last cache update timestamp
let lastCacheUpdate = Date.now();

/**
 * Clear both video info and search caches
 */
export const clearCache = (): void => {
  videoInfoCache = {};
  searchCache = {};
  console.log("YouTube cache cleared");
};

/**
 * Retrieve video info from cache
 */
export const getCachedVideoInfo = (videoId: string): VideoInfo | null => {
  return videoInfoCache[videoId] || null;
};

/**
 * Store video info in cache
 */
export const cacheVideoInfo = (videoId: string, info: VideoInfo): void => {
  videoInfoCache[videoId] = info;
};

/**
 * Retrieve search results from cache
 */
export const getCachedSearch = (query: string): YouTubeVideo[] | null => {
  return searchCache[query] || null;
};

/**
 * Store search results in cache
 */
export const cacheSearchResults = (query: string, results: YouTubeVideo[]): void => {
  searchCache[query] = results;
};

/**
 * Check if cache needs refreshing based on time
 */
export const isCacheExpired = (): boolean => {
  const now = Date.now();
  const minutesPassed = (now - lastCacheUpdate) / (1000 * 60);
  return minutesPassed > CACHE_EXPIRY;
};

/**
 * Refresh the cache if needed
 */
export const refreshCache = async (apiKey: string): Promise<void> => {
  // Only refresh if expired
  if (isCacheExpired()) {
    clearCache();
    lastCacheUpdate = Date.now();
    console.log("YouTube cache refreshed at", new Date(lastCacheUpdate).toLocaleString());
  }
};

/**
 * Retrieve video info from cache if exists, otherwise fetch and cache
 */
export const retrieveVideoInfoFromCache = async (videoId: string): Promise<VideoInfo | null> => {
  return getCachedVideoInfo(videoId);
};
