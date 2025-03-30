
/**
 * YouTube service module for interacting with YouTube API
 */

// Re-export types
export * from './types';

// Re-export search functionality
export { searchMRCVideos, isOnline, getVideoDetails } from './searchService';

// Re-export video info functionality
export { getVideoInfo, getVideoTranscript } from './videoInfoService';

// Re-export cache utilities
export { 
  refreshCache as refreshYouTubeCache, 
  clearYouTubeCache, 
  testYouTubeApiKey 
} from './cacheUtilities';

// Re-export cache manager functions
export {
  retrieveVideoInfoFromCache,
  cacheVideoInfo,
  refreshCache
} from './cacheManager';
