
import { YouTubeVideo, YouTubeErrorType, YouTubeError } from './types';
import { offlineVideos } from './offlineData';
import { getCachedSearch, cacheSearchResults } from './cacheManager';

/**
 * Check if the device is currently online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Recherche des vidéos YouTube liées au MRC
 */
export const searchMRCVideos = async (
  apiKey: string,
  query: string = "MRC Cameroun"
): Promise<YouTubeVideo[]> => {
  try {
    // Check if we're offline
    if (!isOnline()) {
      console.log("Device is offline. Using fallback videos.");
      return offlineVideos;
    }

    // Check cache first
    const cachedResults = getCachedSearch(query);
    if (cachedResults) {
      console.log("Using cached search results for", query);
      return cachedResults;
    }

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&maxResults=5&type=video&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => ({}));
      
      // Handle different error types
      if (searchResponse.status === 403) {
        throw {
          type: YouTubeErrorType.QUOTA_EXCEEDED,
          message: 'Quota YouTube dépassée. Réessayez plus tard.'
        };
      } else if (searchResponse.status === 400) {
        throw {
          type: YouTubeErrorType.INVALID_API_KEY,
          message: 'Clé API YouTube invalide. Vérifiez vos paramètres.'
        };
      } else {
        throw {
          type: YouTubeErrorType.API_ERROR,
          message: `Erreur API YouTube (${searchResponse.status}): ${errorData.error?.message || 'Erreur inconnue'}`,
          originalError: errorData
        };
      }
    }
    
    const searchData = await searchResponse.json();
    
    if (!searchData.items) {
      return [];
    }
    
    const videos = searchData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));

    // Cache the results
    cacheSearchResults(query, videos);
    
    return videos;
  } catch (error: any) {
    console.error("Erreur recherche YouTube:", error);
    
    // If it's already a YouTubeError, rethrow it
    if (error.type && Object.values(YouTubeErrorType).includes(error.type)) {
      throw error;
    }
    
    // If it's a network error
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw {
        type: YouTubeErrorType.NETWORK_ERROR,
        message: 'Erreur de connexion. Vérifiez votre connexion internet.',
        originalError: error
      };
    }
    
    // Default to unknown error
    throw {
      type: YouTubeErrorType.UNKNOWN_ERROR,
      message: 'Erreur inconnue lors de la recherche YouTube.',
      originalError: error
    };
  }
};

/**
 * Get detailed information about a video
 */
export const getVideoDetails = async (
  apiKey: string, 
  videoId: string
): Promise<{ title: string, description: string }> => {
  try {
    // Check if we're offline
    if (!isOnline()) {
      throw {
        type: YouTubeErrorType.NETWORK_ERROR,
        message: 'Appareil hors ligne. Impossible de récupérer les détails de la vidéo.'
      };
    }

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!videoResponse.ok) {
      const errorData = await videoResponse.json().catch(() => ({}));
      
      if (videoResponse.status === 403) {
        throw {
          type: YouTubeErrorType.QUOTA_EXCEEDED,
          message: 'Quota YouTube dépassée. Réessayez plus tard.'
        };
      } else if (videoResponse.status === 400) {
        throw {
          type: YouTubeErrorType.INVALID_API_KEY,
          message: 'Clé API YouTube invalide. Vérifiez vos paramètres.'
        };
      } else {
        throw {
          type: YouTubeErrorType.API_ERROR,
          message: `Erreur API YouTube (${videoResponse.status}): ${errorData.error?.message || 'Erreur inconnue'}`,
          originalError: errorData
        };
      }
    }
    
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      throw {
        type: YouTubeErrorType.API_ERROR,
        message: 'Vidéo non trouvée'
      };
    }
    
    const videoDetails = videoData.items[0].snippet;
    
    return {
      title: videoDetails.title,
      description: videoDetails.description
    };
  } catch (error: any) {
    console.error("Erreur récupération détails vidéo:", error);
    
    // If it's already a YouTubeError, rethrow it
    if (error.type && Object.values(YouTubeErrorType).includes(error.type)) {
      throw error;
    }
    
    // If it's a network error
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw {
        type: YouTubeErrorType.NETWORK_ERROR,
        message: 'Erreur de connexion. Vérifiez votre connexion internet.',
        originalError: error
      };
    }
    
    // Default to unknown error
    throw {
      type: YouTubeErrorType.UNKNOWN_ERROR,
      message: 'Erreur inconnue lors de la récupération des détails de la vidéo.',
      originalError: error
    };
  }
};
