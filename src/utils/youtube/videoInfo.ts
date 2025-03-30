
import { extractVideoId } from './extractVideoId';

/**
 * Fetch YouTube video information using the YouTube API
 */
export const fetchVideoInfo = async (
  apiKey: string,
  videoUrl: string
): Promise<{
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres?: string;
  };
}> => {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('URL YouTube invalide');
  }

  if (!apiKey) {
    throw new Error('Clé API YouTube non configurée');
  }

  try {
    // Get video info via YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations de la vidéo');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Vidéo non trouvée');
    }

    const videoItem = data.items[0];
    const snippet = videoItem.snippet;
    
    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      thumbnails: {
        default: snippet.thumbnails.default?.url,
        medium: snippet.thumbnails.medium?.url,
        high: snippet.thumbnails.high?.url,
        maxres: snippet.thumbnails.maxres?.url,
      }
    };
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
