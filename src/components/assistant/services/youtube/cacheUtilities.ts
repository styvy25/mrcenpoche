
import { searchMRCVideos } from './searchService';
import { clearCache } from './cacheManager';

/**
 * Pre-cache common MRC-related searches
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // Pre-cache common MRC-related searches
    const queries = ["MRC Cameroun", "Maurice Kamto", "Politique Cameroun MRC"];
    
    for (const query of queries) {
      await searchMRCVideos(apiKey, query);
    }
    
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};

// Re-export the clear cache function
export { clearCache as clearYouTubeCache };
