
/**
 * Service for downloading YouTube videos locally
 */

import { YouTubeErrorType } from './types';

// Check if video ID is valid
const isValidYouTubeVideoId = (videoId: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

// Extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  try {
    // Handle different YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
};

// Generate various download links for a YouTube video
export const generateDownloadLinks = (videoId: string) => {
  if (!isValidYouTubeVideoId(videoId)) {
    throw {
      type: YouTubeErrorType.INVALID_VIDEO_ID,
      message: "ID de vidéo YouTube invalide"
    };
  }

  // Generate direct links to services that can download YouTube videos
  return {
    // These are just direct links to various services that can download videos
    videoId,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    downloadServices: [
      {
        name: "Y2Mate",
        url: `https://www.y2mate.com/youtube/${videoId}`
      },
      {
        name: "SaveFrom",
        url: `https://en.savefrom.net/#url=https://www.youtube.com/watch?v=${videoId}`
      }
    ]
  };
};

// Get thumbnail URL for a YouTube video
export const getVideoThumbnailUrl = (videoId: string): string => {
  if (!isValidYouTubeVideoId(videoId)) {
    return '';
  }
  
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Default object with basic info for sharing directly from the browser
export const getVideoShareInfo = (videoId: string, title: string = 'Vidéo MRC') => {
  return {
    title,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: getVideoThumbnailUrl(videoId),
    downloadLinks: generateDownloadLinks(videoId)
  };
};
