
import { YouTubeVideo } from './types';
import { offlineVideos } from './offlineData';
import { getCachedSearch, cacheSearchResults } from './cacheManager';

/**
 * Recherche des vidéos YouTube liées au MRC
 */
export const searchMRCVideos = async (
  apiKey: string,
  query: string = "MRC Cameroun"
): Promise<YouTubeVideo[]> => {
  try {
    // Check if we're offline
    if (!navigator.onLine) {
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
      throw new Error('Erreur lors de la recherche de vidéos');
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
  } catch (error) {
    console.error("Erreur recherche YouTube:", error);
    
    // Return fallback videos for offline or error scenarios
    return offlineVideos;
  }
};
