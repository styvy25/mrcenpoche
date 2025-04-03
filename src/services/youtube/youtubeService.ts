
import { supabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  transcript?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
}

/**
 * Search for MRC-related videos on YouTube
 */
export const searchMRCVideos = async (query: string = "MRC Cameroun"): Promise<YouTubeVideo[]> => {
  try {
    // Call our edge function
    const { data, error } = await supabase.functions.invoke('youtube-service', {
      body: {
        action: 'search',
        query
      }
    });
    
    if (error) {
      console.error("Error searching videos:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};

/**
 * Get details of a specific YouTube video
 */
export const getVideoDetails = async (videoId: string): Promise<VideoDetails | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('youtube-service', {
      body: {
        action: 'getVideoDetails',
        videoId
      }
    });
    
    if (error) {
      console.error("Error getting video details:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting video details:", error);
    return null;
  }
};

/**
 * Get transcript of a YouTube video
 */
export const getVideoTranscript = async (videoId: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('youtube-service', {
      body: {
        action: 'getTranscript',
        videoId
      }
    });
    
    if (error) {
      console.error("Error getting video transcript:", error);
      return "Transcription indisponible.";
    }
    
    return data.transcript || "Transcription indisponible.";
  } catch (error) {
    console.error("Error getting video transcript:", error);
    return "Transcription indisponible.";
  }
};

/**
 * Generate chapter markers from a video transcript
 */
export const generateChapters = async (transcript: string): Promise<Array<{time: string, title: string}>> => {
  // This would ideally use an AI service to generate chapters from transcript
  // For now, returning a placeholder
  return [
    { time: "00:00", title: "Introduction" },
    { time: "01:30", title: "Contexte politique" },
    { time: "05:45", title: "Propositions du MRC" },
    { time: "10:20", title: "Conclusion" }
  ];
};

/**
 * Generate a summary of a video from its transcript
 */
export const generateSummary = async (transcript: string): Promise<string> => {
  // This would ideally use an AI service to generate a summary
  // For now, returning a placeholder
  return "Ce discours aborde les points clés du programme politique du MRC, notamment les questions de décentralisation, de transparence gouvernementale et de développement économique. Maurice Kamto y présente sa vision pour un Cameroun renouvelé et inclusif.";
};

/**
 * Download a YouTube video as MP4
 * Note: This requires a separate service as YouTube doesn't provide direct MP4 downloads through their API
 */
export const downloadVideoAsMP4 = async (videoId: string): Promise<string> => {
  // This is a placeholder - actual implementation would require a separate service
  return `https://example.com/download/${videoId}.mp4`;
};
