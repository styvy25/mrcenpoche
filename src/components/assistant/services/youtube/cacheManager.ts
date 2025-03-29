
import { VideoInfo, CachedVideo } from './types';

// Cache key in localStorage
const CACHE_KEY = 'yt_video_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Retrieve cached video info
export const retrieveVideoInfoFromCache = async (videoId: string): Promise<VideoInfo | null> => {
  try {
    const cacheJson = localStorage.getItem(CACHE_KEY);
    if (!cacheJson) return null;
    
    const cache: Record<string, CachedVideo> = JSON.parse(cacheJson);
    const cachedVideo = cache[videoId];
    
    if (!cachedVideo) return null;
    
    // Check if cache is expired
    const now = Date.now();
    if (now - cachedVideo.cachedAt > CACHE_EXPIRY) {
      // Cache expired, clean it up
      delete cache[videoId];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return null;
    }
    
    return cachedVideo.info;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
};

// Cache video info
export const cacheVideoInfo = async (videoId: string, info: VideoInfo): Promise<void> => {
  try {
    let cache: Record<string, CachedVideo> = {};
    
    const cacheJson = localStorage.getItem(CACHE_KEY);
    if (cacheJson) {
      cache = JSON.parse(cacheJson);
    }
    
    // Add or update cache entry
    cache[videoId] = {
      videoId,
      info,
      cachedAt: Date.now()
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching video info:', error);
  }
};

// Refresh the cache with new content (for popular videos)
export const refreshCache = async (apiKey: string): Promise<void> => {
  // This could pre-fetch some popular MRC videos and cache them
  console.log('Cache refresh functionality would be implemented here');
  // In a real implementation, this would fetch popular videos and cache them
};
