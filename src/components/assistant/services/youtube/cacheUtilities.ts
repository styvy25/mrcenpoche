
import { searchMRCVideos } from './searchService';
import { clearCache, refreshCache as refreshCacheInternal } from './cacheManager';
import { YouTubeErrorType } from './types';

/**
 * Pre-cache common MRC-related searches
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // Check if online before attempting to refresh cache
    if (!navigator.onLine) {
      console.log("Device is offline. Cannot refresh cache.");
      return false;
    }
    
    // Clear existing cache
    await refreshCacheInternal(apiKey);
    
    // Pre-cache common MRC-related searches
    const queries = ["MRC Cameroun", "Maurice Kamto", "Politique Cameroun MRC"];
    
    for (const query of queries) {
      try {
        await searchMRCVideos(apiKey, query);
        console.log(`Cached search results for "${query}"`);
      } catch (error) {
        console.error(`Failed to cache search for "${query}":`, error);
        // Continue with other queries even if one fails
      }
    }
    
    return true;
  } catch (error: any) {
    console.error("Error refreshing YouTube cache:", error);
    
    if (error.type && Object.values(YouTubeErrorType).includes(error.type)) {
      // Re-throw existing YouTube errors
      throw error;
    }
    
    throw {
      type: YouTubeErrorType.CACHE_ERROR,
      message: "Erreur lors du rafraîchissement du cache YouTube",
      originalError: error
    };
  }
};

/**
 * Test a YouTube API key to check if it's valid
 */
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    if (!navigator.onLine) {
      return false;
    }
    
    // Make a lightweight request to test the API key
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=1&key=${apiKey}`
    );
    
    return response.ok;
  } catch (error) {
    console.error("Error testing YouTube API key:", error);
    return false;
  }
};

// Re-export the clear cache function
export { clearCache as clearYouTubeCache };
