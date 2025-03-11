
/**
 * Service pour interagir avec l'API YouTube
 */

interface VideoInfo {
  title: string;
  description: string;
  transcript?: string;
}

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

// Fallback videos for offline mode
const offlineVideos: YouTubeVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Discours de Maurice Kamto - Conférence du MRC",
    description: "Discours du président du MRC concernant les enjeux politiques actuels au Cameroun et les positions du parti sur les réformes nécessaires.",
    thumbnail: "/public/lovable-uploads/2f1f5377-df73-46bc-b7d2-0c3cafeb5dbb.png",
    publishedAt: "2023-05-15T14:30:00Z"
  },
  {
    id: "xvFZjo5PgG0",
    title: "Mobilisation politique au Cameroun - Stratégies du MRC",
    description: "Analyse des stratégies de mobilisation politique du MRC dans le contexte camerounais et des défis rencontrés sur le terrain.",
    thumbnail: "/public/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
    publishedAt: "2023-06-22T09:15:00Z"
  },
  {
    id: "Yh0AhrY9GjA",
    title: "Formation MRC - Communication politique efficace",
    description: "Module de formation sur les techniques de communication politique efficace pour les militants du MRC.",
    thumbnail: "/public/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png",
    publishedAt: "2023-07-10T16:45:00Z"
  },
  {
    id: "V5sODh_b4aw",
    title: "Enjeux électoraux au Cameroun - Position du MRC",
    description: "Analyse des enjeux électoraux au Cameroun et présentation des positions du MRC sur les réformes du système électoral.",
    thumbnail: "/public/lovable-uploads/5487bb9e-3a94-44a0-833d-8875f1665691.png",
    publishedAt: "2023-08-05T11:20:00Z"
  },
  {
    id: "MGh5TpGeBzE",
    title: "Le MRC et la jeunesse camerounaise - Perspectives d'avenir",
    description: "Discussion sur l'engagement de la jeunesse camerounaise dans le processus politique et le programme du MRC pour la jeunesse.",
    thumbnail: "/public/lovable-uploads/13009c82-2883-46e9-8cda-afd9d8e16ade.jpg",
    publishedAt: "2023-09-18T13:30:00Z"
  }
];

// Cache for video searches and information
let videoSearchCache: Record<string, YouTubeVideo[]> = {};
let videoInfoCache: Record<string, VideoInfo> = {};

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
    if (videoInfoCache[videoId]) {
      console.log("Using cached video info for", videoId);
      return videoInfoCache[videoId];
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
    videoInfoCache[videoId] = videoInfo;
    
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

/**
 * Recherche des vidéos YouTube liées au MRC
 */
export const searchMRCVideos = async (
  apiKey: string,
  query: string = "MRC Cameroun"
): Promise<YouTubeVideo[]> => {
  try {
    // Check if we're offline
    if (!navigator.onLine) {
      console.log("Device is offline. Using fallback videos.");
      return offlineVideos;
    }

    // Check cache first
    const cacheKey = query.toLowerCase().trim();
    if (videoSearchCache[cacheKey]) {
      console.log("Using cached search results for", cacheKey);
      return videoSearchCache[cacheKey];
    }

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
    
    const videos = searchData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));

    // Cache the results
    videoSearchCache[cacheKey] = videos;
    
    return videos;
  } catch (error) {
    console.error("Erreur recherche YouTube:", error);
    
    // Return fallback videos for offline or error scenarios
    return offlineVideos;
  }
};

// Cache management utilities
export const clearYouTubeCache = () => {
  videoSearchCache = {};
  videoInfoCache = {};
  console.log("YouTube cache cleared");
};

export const refreshYouTubeCache = async (apiKey: string) => {
  try {
    // Pre-cache common MRC-related searches
    const queries = ["MRC Cameroun", "Maurice Kamto", "Politique Cameroun MRC"];
    
    for (const query of queries) {
      await searchMRCVideos(apiKey, query);
    }
    
    return true;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};
