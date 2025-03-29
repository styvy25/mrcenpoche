
import { YouTubeErrorType, YouTubeVideo } from './types';

// Check if the device is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Search for MRC videos on YouTube
export const searchMRCVideos = async (apiKey: string, query: string): Promise<YouTubeVideo[]> => {
  try {
    if (!isOnline()) {
      throw { type: YouTubeErrorType.NETWORK_ERROR, message: "Device is offline" };
    }

    // Make the actual request to YouTube Data API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=MRC+Cameroun+${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw { type: YouTubeErrorType.QUOTA_EXCEEDED, message: "YouTube API quota exceeded" };
      } else if (response.status === 400) {
        throw { type: YouTubeErrorType.INVALID_API_KEY, message: "Invalid YouTube API key" };
      } else {
        throw { type: YouTubeErrorType.API_ERROR, message: `YouTube API error: ${response.status}` };
      }
    }

    const data = await response.json();
    
    // Parse and return the videos from the response
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error: any) {
    // Rethrow with appropriate error type
    if (error.type) {
      throw error;
    } else {
      console.error("YouTube search error:", error);
      throw { type: YouTubeErrorType.NETWORK_ERROR, message: "Network error during YouTube search" };
    }
  }
};

// Get details for a specific video
export const getVideoDetails = async (apiKey: string, videoId: string) => {
  try {
    if (!isOnline()) {
      throw { type: YouTubeErrorType.NETWORK_ERROR, message: "Device is offline" };
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw { type: YouTubeErrorType.QUOTA_EXCEEDED, message: "YouTube API quota exceeded" };
      } else if (response.status === 400) {
        throw { type: YouTubeErrorType.INVALID_API_KEY, message: "Invalid YouTube API key" };
      } else {
        throw { type: YouTubeErrorType.API_ERROR, message: `YouTube API error: ${response.status}` };
      }
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw { type: YouTubeErrorType.VIDEO_NOT_FOUND, message: "Video not found" };
    }

    const videoDetails = data.items[0].snippet;
    
    return {
      title: videoDetails.title,
      description: videoDetails.description,
      channelTitle: videoDetails.channelTitle,
      publishedAt: videoDetails.publishedAt
    };
  } catch (error: any) {
    // Rethrow with appropriate error type
    if (error.type) {
      throw error;
    } else {
      console.error("YouTube video details error:", error);
      throw { type: YouTubeErrorType.NETWORK_ERROR, message: "Network error getting video details" };
    }
  }
};

// Test if a YouTube API key is valid
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Make a minimal API call to test the key
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=MRC+test&maxResults=1&key=${apiKey}`
    );
    
    return response.ok;
  } catch (error) {
    console.error("Error testing YouTube API key:", error);
    return false;
  }
};
