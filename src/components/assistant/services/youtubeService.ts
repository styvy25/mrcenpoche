
/**
 * Service pour interagir avec l'API YouTube
 */

import { 
  searchMRCVideos as searchMRCVideosInternal, 
  getVideoInfo as getVideoInfoDirect,
  getVideoDetails,
  getVideoTranscript,
  retrieveVideoInfoFromCache,
  cacheVideoInfo,
  refreshCache,
  YouTubeVideo, 
  VideoInfo,
  isOnline,
  YouTubeErrorType
} from "./youtube";

// Re-export everything from the youtube module
export * from './youtube';

/**
 * Recherche des vidéos du MRC sur YouTube avec gestion d'erreurs améliorée
 */
export const searchMRCVideos = async (apiKey: string, query: string): Promise<YouTubeVideo[]> => {
  try {
    // Check if online
    if (!isOnline()) {
      console.log("Device is offline. Using fallback videos.");
      return (await import("./youtube/offlineData")).offlineVideos;
    }

    // If no API key is provided, try to get the default one
    if (!apiKey) {
      const { getYouTubeApiKey } = await import('./youtubeApiService');
      const defaultKey = await getYouTubeApiKey();
      if (!defaultKey) {
        throw {
          type: YouTubeErrorType.INVALID_API_KEY,
          message: "Aucune clé API YouTube n'a été fournie"
        };
      }
      apiKey = defaultKey;
    }

    return await searchMRCVideosInternal(apiKey, query);
  } catch (error: any) {
    console.error("Error searching MRC videos:", error);
    
    // Handle specific error types
    if (error.type) {
      switch (error.type) {
        case YouTubeErrorType.NETWORK_ERROR:
          console.log("Network error, falling back to offline content");
          // Attempt to get offline content
          return (await import("./youtube/offlineData")).offlineVideos;
        default:
          // For other errors, return empty array
          return [];
      }
    }
    
    return [];
  }
};

/**
 * Récupère les informations d'une vidéo (title, description, transcript)
 * avec gestion d'erreurs améliorée
 */
export const getVideoInfo = async (apiKey: string, videoId: string): Promise<VideoInfo> => {
  try {
    // Check if online
    if (!isOnline()) {
      console.log("Device is offline. Using fallback video info.");
      return {
        title: "Contenu MRC (Mode hors-ligne)",
        description: "Ce contenu est disponible en mode hors-ligne. Connectez-vous à Internet pour accéder à plus de contenu.",
        transcript: "Transcription non disponible en mode hors-ligne. Veuillez vous connecter à Internet pour accéder aux transcriptions."
      };
    }

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
  } catch (error: any) {
    console.error("Error getting video info:", error);
    
    // Handle specific error types for better user experience
    if (error.type) {
      switch (error.type) {
        case YouTubeErrorType.NETWORK_ERROR:
          return {
            title: "Mode hors-ligne",
            description: "Vous êtes actuellement hors-ligne. Reconnectez-vous pour accéder à cette vidéo.",
            transcript: "Transcription non disponible en mode hors-ligne."
          };
        case YouTubeErrorType.QUOTA_EXCEEDED:
          return {
            title: "Quota API dépassé",
            description: "Le quota quotidien pour l'API YouTube a été dépassé. Veuillez réessayer plus tard.",
            transcript: "Transcription non disponible."
          };
        case YouTubeErrorType.INVALID_API_KEY:
          return {
            title: "Clé API invalide",
            description: "La clé API YouTube utilisée est invalide. Veuillez vérifier vos paramètres.",
            transcript: "Transcription non disponible."
          };
        default:
          return {
            title: "Erreur de chargement",
            description: "Une erreur s'est produite lors du chargement des informations de la vidéo.",
            transcript: "Transcription non disponible suite à une erreur."
          };
      }
    }
    
    return {
      title: "Video information unavailable",
      description: "Could not retrieve video details",
      transcript: "Transcript unavailable"
    };
  }
};

/**
 * Rafraîchit le cache YouTube avec gestion d'erreurs améliorée
 */
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // Check connection status first
    if (!isOnline()) {
      console.log("Cannot refresh cache while offline");
      return false;
    }
    
    // If no API key is provided, try to get the default one
    if (!apiKey) {
      const { getYouTubeApiKey } = await import('./youtubeApiService');
      const defaultKey = await getYouTubeApiKey();
      if (!defaultKey) {
        throw {
          type: YouTubeErrorType.INVALID_API_KEY,
          message: "Aucune clé API YouTube n'a été fournie"
        };
      }
      apiKey = defaultKey;
    }
    
    await refreshCache(apiKey);
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};

// Test the YouTube API key to validate it works
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
