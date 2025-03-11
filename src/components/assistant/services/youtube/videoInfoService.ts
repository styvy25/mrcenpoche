
import { VideoInfo } from './types';
import { getCachedVideoInfo, cacheVideoInfo } from './cacheManager';

/**
 * Récupère les informations et la transcription d'une vidéo YouTube
 */
export const getVideoInfo = async (
  apiKey: string,
  videoId: string
): Promise<VideoInfo> => {
  try {
    // Check if we're offline
    if (!navigator.onLine) {
      console.log("Device is offline. Using fallback video info.");
      return {
        title: "Contenu MRC (Mode hors-ligne)",
        description: "Ce contenu est disponible en mode hors-ligne. Connectez-vous à Internet pour accéder à plus de contenu.",
        transcript: "Transcription non disponible en mode hors-ligne. Veuillez vous connecter à Internet pour accéder aux transcriptions."
      };
    }

    // Check cache first
    const cachedInfo = getCachedVideoInfo(videoId);
    if (cachedInfo) {
      console.log("Using cached video info for", videoId);
      return cachedInfo;
    }

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
    
    const videoInfo: VideoInfo = {
      title: videoDetails.title,
      description: videoDetails.description,
      transcript: "Cette transcription est un exemple. L'API YouTube ne fournit pas directement les transcriptions."
    };

    // Cache the result
    cacheVideoInfo(videoId, videoInfo);
    
    return videoInfo;
  } catch (error) {
    console.error("Erreur API YouTube:", error);
    
    // Fallback response for errors
    return {
      title: "Contenu MRC (Mode dégradé)",
      description: "Ce contenu est affiché en mode dégradé suite à une erreur de connexion. Vérifiez votre connexion Internet et votre clé API.",
      transcript: "Transcription non disponible en mode dégradé."
    };
  }
};
