
/**
 * Service pour interagir avec l'API YouTube
 */

interface VideoInfo {
  title: string;
  description: string;
  transcript?: string;
}

/**
 * Récupère les informations et la transcription d'une vidéo YouTube
 */
export const getVideoInfo = async (
  apiKey: string,
  videoId: string
): Promise<VideoInfo> => {
  try {
    // Récupérer les détails de la vidéo
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!videoResponse.ok) {
      throw new Error('Erreur lors de la récupération des informations de la vidéo');
    }
    
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      throw new Error('Vidéo non trouvée');
    }
    
    const videoDetails = videoData.items[0].snippet;
    
    // Pour une vraie implémentation, nous aurions besoin d'un service tiers pour obtenir la transcription
    // car l'API YouTube ne fournit pas directement les transcriptions
    
    return {
      title: videoDetails.title,
      description: videoDetails.description,
      // Note: Dans une implémentation réelle, nous utiliserions un service tiers pour obtenir la transcription
      transcript: "Cette transcription est un exemple. L'API YouTube ne fournit pas directement les transcriptions."
    };
  } catch (error) {
    console.error("Erreur API YouTube:", error);
    throw error;
  }
};

/**
 * Recherche des vidéos YouTube liées au MRC
 */
export const searchMRCVideos = async (
  apiKey: string,
  query: string = "MRC Cameroun"
): Promise<any[]> => {
  try {
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
    
    return searchData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error("Erreur recherche YouTube:", error);
    throw error;
  }
};
