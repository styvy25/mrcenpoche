
import { YouTubeErrorType } from './types';
import { clearCache } from './cacheManager';

/**
 * Refresh the YouTube cache
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // In a real implementation, we might prefetch common searches
    // For now, just clear the cache
    clearCache();
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};

/**
 * Clear the YouTube cache
 */
export const clearYouTubeCache = (): void => {
  clearCache();
};

/**
 * Test the YouTube API key to validate it works
 */
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    if (!apiKey) return false;
    
    // Make a simple request to validate the key
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API key validation failed:", errorData);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error testing YouTube API key:", error);
    return false;
  }
};
