
import { VideoInfo, YouTubeErrorType } from './types';
import { retrieveVideoInfoFromCache, cacheVideoInfo } from './cacheManager';
import { isOnline, getVideoDetails } from './searchService';

/**
 * Récupère la transcription d'une vidéo YouTube
 * Note: This is a placeholder as YouTube API doesn't directly provide transcripts
 */
export const getVideoTranscript = async (
  apiKey: string,
  videoId: string
): Promise<string> => {
  try {
    // In a real implementation, this would use a service that can extract captions/transcripts
    // For now, we'll return a placeholder message
    return "Cette transcription est un exemple. L'API YouTube ne fournit pas directement les transcriptions.";
  } catch (error) {
    console.error("Erreur récupération transcription:", error);
    return "Transcription non disponible.";
  }
};

/**
 * Récupère les informations et la transcription d'une vidéo YouTube
 */
export const getVideoInfo = async (
  apiKey: string,
  videoId: string
): Promise<VideoInfo> => {
  try {
    // Check if we're offline
    if (!isOnline()) {
      console.log("Device is offline. Using fallback video info.");
      return {
        title: "Contenu MRC (Mode hors-ligne)",
        description: "Ce contenu est disponible en mode hors-ligne. Connectez-vous à Internet pour accéder à plus de contenu.",
        transcript: "Transcription non disponible en mode hors-ligne. Veuillez vous connecter à Internet pour accéder aux transcriptions."
      };
    }

    // Check cache first
    const cachedInfo = await retrieveVideoInfoFromCache(videoId);
    if (cachedInfo) {
      console.log("Using cached video info for", videoId);
      return cachedInfo;
    }

    // Récupérer les détails de la vidéo
    const videoDetails = await getVideoDetails(apiKey, videoId);
    const transcript = await getVideoTranscript(apiKey, videoId);
    
    const videoInfo: VideoInfo = {
      title: videoDetails.title,
      description: videoDetails.description,
      transcript
    };

    // Cache the result
    await cacheVideoInfo(videoId, videoInfo);
    
    return videoInfo;
  } catch (error: any) {
    console.error("Erreur API YouTube:", error);
    
    // Create fallback response based on error type
    if (error.type === YouTubeErrorType.NETWORK_ERROR) {
      return {
        title: "Contenu MRC (Mode hors-ligne)",
        description: "Ce contenu est disponible en mode hors-ligne. Connectez-vous à Internet pour accéder à plus de contenu.",
        transcript: "Transcription non disponible en mode hors-ligne. Veuillez vous connecter à Internet pour accéder aux transcriptions."
      };
    } else if (error.type === YouTubeErrorType.INVALID_API_KEY) {
      return {
        title: "Clé API invalide",
        description: "Votre clé API YouTube semble être invalide. Veuillez vérifier vos paramètres.",
        transcript: "Transcription non disponible."
      };
    } else if (error.type === YouTubeErrorType.QUOTA_EXCEEDED) {
      return {
        title: "Quota YouTube dépassé",
        description: "Le quota quotidien pour l'API YouTube a été dépassé. Veuillez réessayer plus tard.",
        transcript: "Transcription non disponible."
      };
    }
    
    // Fallback response for errors
    return {
      title: "Contenu MRC (Mode dégradé)",
      description: "Ce contenu est affiché en mode dégradé suite à une erreur de connexion. Vérifiez votre connexion Internet et votre clé API.",
      transcript: "Transcription non disponible en mode dégradé."
    };
  }
};
