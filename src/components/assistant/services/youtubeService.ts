
import { getYouTubeApiKey } from './youtubeApiService';
import { searchCacheByQuery, cacheSearchResults, getCachedVideoDetails, cacheVideoDetails } from './youtube/cacheManager';
import { getOfflineSearchResults, getOfflineVideoDetails } from './youtube/offlineData';
import { YouTubeSearchResult, YouTubeVideoDetails, VideoDownloadService } from './youtube/types';

// YouTube API constants
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const DEFAULT_MAX_RESULTS = 5;

// Mock implementation of video download service
const videoDownloadService: VideoDownloadService = {
  downloadVideo: async (videoId: string, format: string) => {
    return {
      success: true,
      message: 'Video download simulation successful',
      url: `https://example.com/download/${videoId}?format=${format}`
    };
  },
  getDownloadFormats: async (videoId: string) => {
    return ['mp4', 'mp3', 'webm'];
  }
};

/**
 * Search YouTube videos
 */
export const searchYouTube = async (
  query: string,
  options = { maxResults: DEFAULT_MAX_RESULTS, useCache: true, offlineMode: false }
): Promise<{ results: YouTubeSearchResult[], error?: string }> => {
  // Check for offline mode first
  if (options.offlineMode) {
    return { 
      results: getOfflineSearchResults(query)
    };
  }
  
  // Check cache if enabled
  if (options.useCache) {
    const cachedResults = searchCacheByQuery(query);
    if (cachedResults) {
      return { results: cachedResults };
    }
  }

  // Get API key
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    console.warn('YouTube API key not available, falling back to offline mode');
    return { 
      results: getOfflineSearchResults(query)
    };
  }

  try {
    const searchUrl = `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=${options.maxResults}&type=video&key=${apiKey}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.error) {
      console.error('YouTube API error:', data.error);
      return { 
        results: getOfflineSearchResults(query),
        error: data.error.message || 'Failed to search YouTube'
      };
    }

    const results: YouTubeSearchResult[] = (data.items || []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    }));

    // Cache results if caching is enabled
    if (options.useCache && results.length > 0) {
      cacheSearchResults(query, results);
    }

    return { results };
  } catch (error: any) {
    console.error('Error searching YouTube:', error);
    return { 
      results: getOfflineSearchResults(query),
      error: error.message || 'Failed to search YouTube'
    };
  }
};

/**
 * Get YouTube video details
 */
export const getVideoDetails = async (
  videoId: string,
  options = { useCache: true, offlineMode: false }
): Promise<{ details: YouTubeVideoDetails | null, error?: string }> => {
  // Check for offline mode first
  if (options.offlineMode) {
    return { 
      details: getOfflineVideoDetails(videoId)
    };
  }
  
  // Check cache if enabled
  if (options.useCache) {
    const cachedDetails = getCachedVideoDetails(videoId);
    if (cachedDetails) {
      return { details: cachedDetails };
    }
  }

  // Get API key
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    console.warn('YouTube API key not available, falling back to offline mode');
    return { 
      details: getOfflineVideoDetails(videoId)
    };
  }

  try {
    const detailsUrl = `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.error) {
      console.error('YouTube API error:', data.error);
      return { 
        details: getOfflineVideoDetails(videoId),
        error: data.error.message || 'Failed to fetch video details'
      };
    }

    if (!data.items || data.items.length === 0) {
      return { details: null, error: 'Video not found' };
    }

    const item = data.items[0];
    const details: YouTubeVideoDetails = {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics.viewCount || '0',
      likeCount: item.statistics.likeCount || '0',
      dislikeCount: item.statistics.dislikeCount || '0',
      duration: item.contentDetails.duration,
      tags: item.snippet.tags || []
    };

    // Cache details if caching is enabled
    if (options.useCache) {
      cacheVideoDetails(videoId, details);
    }

    return { details };
  } catch (error: any) {
    console.error('Error fetching video details:', error);
    return { 
      details: getOfflineVideoDetails(videoId),
      error: error.message || 'Failed to fetch video details'
    };
  }
};

// Export the video download service
export { videoDownloadService };
