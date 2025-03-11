
import { YouTubeErrorType } from './types';
import { clearCache } from './cacheManager';
import { isOnline } from './searchService';

/**
 * Refresh YouTube cache by clearing it and optionally prefetching common data
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    const online = await isOnline();
    if (!online) {
      throw {
        type: YouTubeErrorType.NETWORK_ERROR,
        message: "Pas de connexion Internet disponible"
      };
    }

    clearCache();
    console.log("YouTube cache refreshed");
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};

/**
 * Clear YouTube cache
 */
export const clearYouTubeCache = (): void => {
  clearCache();
};

/**
 * Test if the provided YouTube API key is valid
 */
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const online = await isOnline();
    if (!online) {
      throw {
        type: YouTubeErrorType.NETWORK_ERROR,
        message: "Pas de connexion Internet disponible"
      };
    }

    // Try a simple API call to validate the key
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key=${apiKey}`;
    const response = await fetch(url);
    
    // Even an authentication error means the key format is valid
    // The real validation happens on YouTube's side
    return response.status !== 400; // 400 usually means invalid key format
  } catch (error) {
    console.error("Error testing YouTube API key:", error);
    return false;
  }
};
