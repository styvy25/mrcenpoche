
import * as youtubeApiService from './youtubeApiService';
import { searchCacheByQuery, getCachedVideoDetails, cacheSearchResults, cacheVideoDetails } from './youtube/cacheManager';
import { getOfflineSearchResults, getOfflineVideoDetails } from './youtube/offlineData';
import type { VideoDownloadService } from './youtube/types';

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string, width: number, height: number };
      medium?: { url: string, width: number, height: number };
      high?: { url: string, width: number, height: number };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface VideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

// Check if online
const isOnline = (): boolean => {
  return navigator.onLine;
};

// Search YouTube
export const searchYouTube = async (query: string, maxResults = 5): Promise<any[]> => {
  try {
    // First check cache for results
    const cachedResults = await searchCacheByQuery(query);
    if (cachedResults && cachedResults.length > 0) {
      console.log('Using cached YouTube search results for:', query);
      return cachedResults;
    }

    // If we're offline, use offline data
    if (!isOnline()) {
      console.log('Using offline YouTube search results for:', query);
      return getOfflineSearchResults(query);
    }

    // Check if API key exists
    const apiKey = youtubeApiService.getYouTubeApiKey();
    if (!apiKey) {
      console.warn('No YouTube API key available, using offline data');
      return getOfflineSearchResults(query);
    }

    // Perform the search using the YouTube API
    const searchResults = await youtubeApiService.searchYouTube(query, maxResults);
    
    if ('error' in searchResults) {
      console.error('Error in YouTube search:', searchResults.error);
      return getOfflineSearchResults(query);
    }

    // Cache the results
    await cacheSearchResults(query, searchResults);
    
    return searchResults;
  } catch (error) {
    console.error('Error in searchYouTube:', error);
    return getOfflineSearchResults(query);
  }
};

// Get video details
export const getVideoDetails = async (videoId: string): Promise<any> => {
  try {
    // First check cache for details
    const cachedDetails = await getCachedVideoDetails(videoId);
    if (cachedDetails) {
      console.log('Using cached video details for:', videoId);
      return cachedDetails;
    }

    // If we're offline, use offline data
    if (!isOnline()) {
      console.log('Using offline video details for:', videoId);
      return getOfflineVideoDetails(videoId);
    }

    // Check if API key exists
    const apiKey = youtubeApiService.getYouTubeApiKey();
    if (!apiKey) {
      console.warn('No YouTube API key available, using offline data');
      return getOfflineVideoDetails(videoId);
    }

    // Get details using the YouTube API
    const videoDetails = await youtubeApiService.getVideoDetails(videoId);
    
    if ('error' in videoDetails) {
      console.error('Error in getVideoDetails:', videoDetails.error);
      return getOfflineVideoDetails(videoId);
    }

    // Cache the details
    await cacheVideoDetails(videoId, videoDetails);
    
    return videoDetails;
  } catch (error) {
    console.error('Error in getVideoDetails:', error);
    return getOfflineVideoDetails(videoId);
  }
};

// Get video download services
export const getVideoDownloadServices = (videoId: string): VideoDownloadService[] => {
  return [
    {
      name: 'Y2mate',
      url: `https://www.y2mate.com/youtube/${videoId}`
    },
    {
      name: 'SaveFrom.net',
      url: `https://en.savefrom.net/1-youtube-video-downloader-63/download-youtube-${videoId}`
    },
    {
      name: 'ClipConverter',
      url: `https://www.clipconverter.cc/2/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${videoId}`
    }
  ];
};

// Format video download links
export const getVideoDownloadLinks = (videoId: string) => {
  return {
    downloadServices: getVideoDownloadServices(videoId),
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
};

// Refresh YouTube Cache
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  try {
    // Make a simple API call to verify the API key works
    const testQuery = "test";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${testQuery}&maxResults=1&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error("API key validation failed:", data.error);
      return false;
    }
    
    // API key is valid, clear existing cache
    const localStorageKeys = Object.keys(localStorage);
    let clearedCount = 0;
    
    for (const key of localStorageKeys) {
      if (key.startsWith('yt-search-') || key.startsWith('yt-video-')) {
        localStorage.removeItem(key);
        clearedCount++;
      }
    }
    
    console.log(`YouTube cache cleared: ${clearedCount} items removed`);
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};
