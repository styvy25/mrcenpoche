
import { getApiKeysWithDefaults } from '@/services/supabaseService';

// Mock data structure for YouTube search results
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

// Mock YouTube search function
export const searchYouTubeVideos = async (
  query: string,
  maxResults: number = 5,
  pageToken?: string
): Promise<YouTubeSearchResponse> => {
  try {
    const apiKeys = getApiKeysWithDefaults();
    const YOUTUBE_API_KEY = apiKeys.YOUTUBE_API_KEY;
    
    // For now, return mock data instead of making actual API calls
    console.log(`Mock YouTube search for: "${query}" with max results: ${maxResults}`);
    
    // Mock search results
    const mockResults: YouTubeVideo[] = [
      {
        id: { videoId: 'video1' },
        snippet: {
          title: `Résultats pour: ${query} - Video 1`,
          description: 'Ceci est une vidéo de test pour simuler les résultats de YouTube.',
          thumbnails: {
            default: { url: 'https://via.placeholder.com/120x90', width: 120, height: 90 },
            medium: { url: 'https://via.placeholder.com/320x180', width: 320, height: 180 },
            high: { url: 'https://via.placeholder.com/480x360', width: 480, height: 360 }
          },
          channelTitle: 'MRC Officiel',
          publishedAt: new Date().toISOString()
        }
      },
      {
        id: { videoId: 'video2' },
        snippet: {
          title: `Résultats pour: ${query} - Video 2`,
          description: 'Une autre vidéo de test pour la recherche YouTube.',
          thumbnails: {
            default: { url: 'https://via.placeholder.com/120x90', width: 120, height: 90 },
            medium: { url: 'https://via.placeholder.com/320x180', width: 320, height: 180 },
            high: { url: 'https://via.placeholder.com/480x360', width: 480, height: 360 }
          },
          channelTitle: 'Politique Camerounaise',
          publishedAt: new Date().toISOString()
        }
      }
    ];
    
    return {
      items: mockResults,
      nextPageToken: 'mock_next_page_token'
    };
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return { items: [] };
  }
};

// Mock function to get video details
export const getYouTubeVideoDetails = async (videoId: string): Promise<YouTubeVideo | null> => {
  try {
    const apiKeys = getApiKeysWithDefaults();
    const YOUTUBE_API_KEY = apiKeys.YOUTUBE_API_KEY;
    
    console.log(`Mock YouTube video details for ID: ${videoId}`);
    
    // Return mock video details
    return {
      id: { videoId },
      snippet: {
        title: `Vidéo ${videoId}`,
        description: 'Description détaillée de cette vidéo.',
        thumbnails: {
          default: { url: 'https://via.placeholder.com/120x90', width: 120, height: 90 },
          medium: { url: 'https://via.placeholder.com/320x180', width: 320, height: 180 },
          high: { url: 'https://via.placeholder.com/480x360', width: 480, height: 360 }
        },
        channelTitle: 'MRC Officiel',
        publishedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error getting YouTube video details:', error);
    return null;
  }
};
