
import { getApiKeysWithDefaults } from '@/services/supabaseService';

// YouTube API Key Management
export const getYouTubeApiKey = (): string => {
  try {
    const keys = getApiKeysWithDefaults();
    return keys.YOUTUBE_API_KEY || '';
  } catch (error) {
    console.error('Error retrieving YouTube API key:', error);
    return '';
  }
};

// Base YouTube API URL
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Search YouTube videos
export const searchYouTube = async (query: string, maxResults = 5) => {
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    return { error: 'No YouTube API key available' };
  }

  try {
    const searchUrl = `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&type=video&key=${apiKey}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.error) {
      console.error('YouTube API error:', data.error);
      return { error: data.error };
    }

    return data.items || [];
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return { error: 'Failed to search YouTube' };
  }
};

// Get video details
export const getVideoDetails = async (videoId: string) => {
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    return { error: 'No YouTube API key available' };
  }

  try {
    const detailsUrl = `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.error) {
      console.error('YouTube API error:', data.error);
      return { error: data.error };
    }

    return data.items?.[0] || null;
  } catch (error) {
    console.error('Error fetching video details:', error);
    return { error: 'Failed to fetch video details' };
  }
};
