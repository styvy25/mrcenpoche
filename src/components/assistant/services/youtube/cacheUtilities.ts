
import { testYouTubeApiKey as testKey } from './searchService';

// Test if a YouTube API key is valid
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  return await testKey(apiKey);
};

// Clear the YouTube cache
export const clearYouTubeCache = (): void => {
  localStorage.removeItem('yt_video_cache');
};

// Refresh the YouTube cache - placeholder
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // This would typically pre-fetch some MRC content
    console.log('Cache refresh initiated with API key:', apiKey);
    
    // Just check if the API key is valid
    const isValid = await testYouTubeApiKey(apiKey);
    
    if (isValid) {
      // In a real implementation, this would actually refresh the cache
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error refreshing YouTube cache:', error);
    return false;
  }
};
