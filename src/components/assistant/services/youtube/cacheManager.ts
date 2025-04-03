
import { YouTubeSearchResult, YouTubeVideoDetails } from './types';

// In-memory cache for search results
const searchCache = new Map<string, { results: YouTubeSearchResult[], timestamp: number }>();

// In-memory cache for video details
const videoDetailsCache = new Map<string, { details: YouTubeVideoDetails, timestamp: number }>();

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Searches the cache for results matching the given query
 */
export const searchCacheByQuery = (query: string): YouTubeSearchResult[] | null => {
  const normalizedQuery = query.trim().toLowerCase();
  const cachedData = searchCache.get(normalizedQuery);
  
  if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION) {
    return cachedData.results;
  }
  
  return null;
};

/**
 * Caches search results for a given query
 */
export const cacheSearchResults = (query: string, results: YouTubeSearchResult[]): void => {
  const normalizedQuery = query.trim().toLowerCase();
  searchCache.set(normalizedQuery, {
    results,
    timestamp: Date.now()
  });
};

/**
 * Gets cached video details by ID
 */
export const getCachedVideoDetails = (videoId: string): YouTubeVideoDetails | null => {
  const cachedData = videoDetailsCache.get(videoId);
  
  if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION) {
    return cachedData.details;
  }
  
  return null;
};

/**
 * Caches video details
 */
export const cacheVideoDetails = (videoId: string, details: YouTubeVideoDetails): void => {
  videoDetailsCache.set(videoId, {
    details,
    timestamp: Date.now()
  });
};

/**
 * Clears expired cache entries
 */
export const clearExpiredCache = (): void => {
  const now = Date.now();
  
  searchCache.forEach((value, key) => {
    if (now - value.timestamp > CACHE_EXPIRATION) {
      searchCache.delete(key);
    }
  });
  
  videoDetailsCache.forEach((value, key) => {
    if (now - value.timestamp > CACHE_EXPIRATION) {
      videoDetailsCache.delete(key);
    }
  });
};
