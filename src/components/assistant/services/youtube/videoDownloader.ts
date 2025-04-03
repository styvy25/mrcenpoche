
import { VideoDownloadLinks } from './types';

/**
 * Extracts a YouTube video ID from various YouTube URL formats
 */
export const extractVideoId = (url: string): string | null => {
  // Handle youtu.be format
  let match = url.match(/youtu\.be\/([^?&]+)/);
  if (match && match[1]) return match[1];
  
  // Handle youtube.com/watch?v= format
  match = url.match(/youtube\.com\/watch\?v=([^?&]+)/);
  if (match && match[1]) return match[1];
  
  // Handle youtube.com/shorts/ format
  match = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (match && match[1]) return match[1];
  
  return null;
};

/**
 * Generates download links for a YouTube video
 * Note: This doesn't actually download videos but provides links to services
 * that can facilitate downloading (which the user would need to use externally)
 */
export const generateDownloadLinks = (videoId: string): VideoDownloadLinks => {
  // Base URLs for popular YouTube download services
  const downloadServices = [
    {
      name: "Y2mate",
      url: `https://www.y2mate.com/youtube/${videoId}`
    },
    {
      name: "SaveFrom",
      url: `https://en.savefrom.net/1-youtube-video-downloader-395/?url=https://www.youtube.com/watch?v=${videoId}`
    },
    {
      name: "YTMP3",
      url: `https://ytmp3.cc/youtube-to-mp3/?v=${videoId}`
    },
    {
      name: "ClipConverter",
      url: `https://www.clipconverter.cc/2/?url=https://www.youtube.com/watch?v=${videoId}`
    }
  ];
  
  return {
    videoId,
    downloadServices,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
};
