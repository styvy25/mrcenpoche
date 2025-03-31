
/**
 * Manages the YouTube video information cache
 */

import { VideoInfo } from './types';
import { supabase } from '@/integrations/supabase/client';

// Cache a video's information
export const cacheVideoInfo = async (videoId: string, videoInfo: VideoInfo): Promise<boolean> => {
  try {
    // First try to store in Supabase if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      // Store in Supabase table
      const { error } = await supabase
        .from('youtube_cache')
        .upsert({
          video_id: videoId,
          title: videoInfo.title,
          description: videoInfo.description,
          transcript: videoInfo.transcript,
          cached_at: new Date().toISOString()
        }, { onConflict: 'video_id' });
      
      if (!error) {
        console.log("Video info cached in Supabase:", videoId);
        
        // Also cache locally for faster access
        localStorage.setItem(`youtube_video_${videoId}`, JSON.stringify({
          ...videoInfo,
          cachedAt: new Date().toISOString()
        }));
        
        return true;
      }
    }
    
    // Fallback to localStorage if Supabase fails or user is not authenticated
    localStorage.setItem(`youtube_video_${videoId}`, JSON.stringify({
      ...videoInfo,
      cachedAt: new Date().toISOString()
    }));
    
    return true;
  } catch (error) {
    console.error("Error caching video info:", error);
    
    // Last attempt - try localStorage
    try {
      localStorage.setItem(`youtube_video_${videoId}`, JSON.stringify({
        ...videoInfo,
        cachedAt: new Date().toISOString()
      }));
      return true;
    } catch {
      return false;
    }
  }
};

// Retrieve a video's information from cache
export const retrieveVideoInfoFromCache = async (videoId: string): Promise<VideoInfo | null> => {
  try {
    // First try to get from Supabase if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase
        .from('youtube_cache')
        .select('title, description, transcript, cached_at')
        .eq('video_id', videoId)
        .single();
      
      if (!error && data) {
        // Check if the cache is still fresh (less than 1 day old)
        const cachedAt = new Date(data.cached_at);
        const now = new Date();
        const cacheAgeDays = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60 * 24);
        
        if (cacheAgeDays < 1) {
          console.log("Using Supabase cached video info for", videoId);
          return {
            title: data.title,
            description: data.description,
            transcript: data.transcript || "Transcription non disponible"
          };
        }
      }
    }
    
    // Try localStorage if Supabase fails or returned nothing
    const cachedData = localStorage.getItem(`youtube_video_${videoId}`);
    
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      
      // Check if the local cache is still fresh (less than 1 day old)
      const cachedAt = new Date(parsedData.cachedAt);
      const now = new Date();
      const cacheAgeDays = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60 * 24);
      
      if (cacheAgeDays < 1) {
        console.log("Using localStorage cached video info for", videoId);
        return {
          title: parsedData.title,
          description: parsedData.description,
          transcript: parsedData.transcript
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error retrieving video info from cache:", error);
    return null;
  }
};

// Refresh the YouTube cache by fetching popular MRC videos
export const refreshCache = async (apiKey: string): Promise<boolean> => {
  try {
    // Use Supabase Edge Function to refresh the cache
    const { data, error } = await supabase.functions.invoke('refresh-youtube-cache', {
      body: { apiKey }
    });
    
    if (!error && data?.success) {
      console.log("YouTube cache refreshed via Edge Function:", data.stats);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error refreshing YouTube cache:", error);
    return false;
  }
};

// Clear the YouTube cache (for debugging/testing)
export const clearYouTubeCache = async (): Promise<void> => {
  try {
    // Clear Supabase cache if authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      // Note: This would typically be restricted by RLS policies
      console.log("Attempting to clear Supabase YouTube cache");
    }
    
    // Clear local storage cache
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith('youtube_video_')) {
        localStorage.removeItem(key);
      }
    }
    
    console.log("Local YouTube cache cleared");
  } catch (error) {
    console.error("Error clearing YouTube cache:", error);
  }
};

// Test if a YouTube API key is valid
export const testYouTubeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Make a simple request to the YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${apiKey}`
    );
    
    return response.ok;
  } catch (error) {
    console.error("Error testing YouTube API key:", error);
    return false;
  }
};
