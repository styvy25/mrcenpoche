
/**
 * Service pour interagir avec l'API YouTube
 */

import { searchVideos, getVideoDetails } from "./youtube/searchService";
import { 
  cacheVideoInfo, 
  retrieveVideoInfoFromCache,
  refreshCache
} from "./youtube/cacheManager";
import { getVideoTranscript } from "./youtube/videoInfoService";
import { VideoInfo, YouTubeVideo } from "./youtube/types";

// Re-export everything from the youtube module
export * from './youtube';

/**
 * Recherche des vidéos du MRC sur YouTube
 */
export const searchMRCVideos = async (apiKey: string, query: string): Promise<YouTubeVideo[]> => {
  try {
    return await searchVideos(apiKey, query);
  } catch (error) {
    console.error("Error searching MRC videos:", error);
    return [];
  }
};

/**
 * Récupère les informations d'une vidéo (title, description, transcript)
 */
export const getVideoInfo = async (apiKey: string, videoId: string): Promise<VideoInfo> => {
  try {
    // Check cache first
    const cachedInfo = await retrieveVideoInfoFromCache(videoId);
    if (cachedInfo) {
      return cachedInfo;
    }

    // If not in cache, fetch from API
    const videoDetails = await getVideoDetails(apiKey, videoId);
    const transcript = await getVideoTranscript(apiKey, videoId);
    
    const videoInfo = {
      title: videoDetails.title,
      description: videoDetails.description,
      transcript
    };
    
    // Cache the result
    await cacheVideoInfo(videoId, videoInfo);
    
    return videoInfo;
  } catch (error) {
    console.error("Error getting video info:", error);
    return {
      title: "Video information unavailable",
      description: "Could not retrieve video details"
    };
  }
};

/**
 * Rafraîchit le cache YouTube
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    await refreshCache(apiKey);
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};
