
import { VideoDownloadLinks, YouTubeErrorType } from './types';

/**
 * Extract video ID from a YouTube URL
 */
export const extractVideoId = (url: string): string | null => {
  // Handle different URL formats
  const regExpShort = /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const regExpLong = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
  const regExpEmbed = /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const regExpShorts = /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  // Test each regex
  const matchShort = url.match(regExpShort);
  const matchLong = url.match(regExpLong);
  const matchEmbed = url.match(regExpEmbed);
  const matchShorts = url.match(regExpShorts);

  // Return the first match
  if (matchShort) return matchShort[1];
  if (matchLong) return matchLong[1];
  if (matchEmbed) return matchEmbed[1];
  if (matchShorts) return matchShorts[1];

  // If no match, return null
  return null;
};

/**
 * Generate download links for a YouTube video
 */
export const generateDownloadLinks = (videoId: string): VideoDownloadLinks => {
  // Create URLs for various YouTube download services
  const services = [
    {
      name: "y2mate",
      url: `https://www.y2mate.com/youtube/${videoId}`
    },
    {
      name: "savefrom.net",
      url: `https://en.savefrom.net/1-youtube-video-downloader-390/?url=https://www.youtube.com/watch?v=${videoId}`
    },
    {
      name: "ytmp3",
      url: `https://ytmp3.cc/youtube-to-mp3/?v=${videoId}`
    },
    {
      name: "loader.to",
      url: `https://loader.to/en100/1-youtube-video-downloader.html?url=https://www.youtube.com/watch?v=${videoId}`
    },
    {
      name: "9xbuddy",
      url: `https://9xbuddy.org/process?url=https://www.youtube.com/watch?v=${videoId}`
    }
  ];

  return {
    videoId,
    downloadServices: services,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
};

/**
 * Get direct download links (requires server-side implementation)
 * This is a placeholder since client-side YouTube download is limited
 */
export const getDirectDownloadLinks = async (videoId: string): Promise<string | null> => {
  try {
    // In a real implementation, this would call a server endpoint
    // For now, return null as this requires server-side processing
    console.warn("Direct download requires server-side implementation");
    return null;
  } catch (error) {
    console.error("Error getting direct download links:", error);
    throw {
      type: YouTubeErrorType.UNKNOWN_ERROR,
      message: "Unable to generate direct download links",
      originalError: error
    };
  }
};
