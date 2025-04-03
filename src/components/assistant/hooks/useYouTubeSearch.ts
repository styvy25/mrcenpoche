
import { useState, useCallback } from 'react';
import * as youtubeApiService from '../services/youtubeApiService';

interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelName: string;
  publishDate: string;
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
}

export interface UseYouTubeSearchReturn {
  results: VideoDetails[];
  isLoading: boolean;
  error: string | null;
  searchYouTube: (query: string) => Promise<VideoDetails[]>;
  getVideoDetails: (videoId: string) => Promise<VideoDetails | null>;
}

export const useYouTubeSearch = (): UseYouTubeSearchReturn => {
  const [results, setResults] = useState<VideoDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchYouTube = useCallback(async (query: string): Promise<VideoDetails[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if API key is available
      const apiKey = youtubeApiService.getYouTubeApiKey();
      if (!apiKey) {
        throw new Error('YouTube API key is not available');
      }
      
      const searchResults = await youtubeApiService.searchYouTube(query);
      
      if ('error' in searchResults) {
        throw new Error(searchResults.error?.message || 'Failed to search YouTube');
      }
      
      // Convert to our format
      const formattedResults: VideoDetails[] = searchResults.map((item: YouTubeSearchResult) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelName: item.snippet.channelTitle,
        publishDate: item.snippet.publishedAt
      }));
      
      setResults(formattedResults);
      return formattedResults;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during YouTube search';
      setError(errorMessage);
      console.error('YouTube search error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getVideoDetails = useCallback(async (videoId: string): Promise<VideoDetails | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if API key is available
      const apiKey = youtubeApiService.getYouTubeApiKey();
      if (!apiKey) {
        throw new Error('YouTube API key is not available');
      }
      
      const videoDetails = await youtubeApiService.getVideoDetails(videoId);
      
      if ('error' in videoDetails || !videoDetails) {
        throw new Error(
          'error' in videoDetails ? 
          videoDetails.error?.message || 'Failed to get video details' : 
          'Video details not found'
        );
      }
      
      const details: VideoDetails = {
        id: videoDetails.id,
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        thumbnail: videoDetails.snippet.thumbnails?.maxres?.url || 
                  videoDetails.snippet.thumbnails?.high?.url || 
                  videoDetails.snippet.thumbnails?.medium?.url,
        channelName: videoDetails.snippet.channelTitle,
        publishDate: videoDetails.snippet.publishedAt,
        statistics: {
          viewCount: videoDetails.statistics?.viewCount,
          likeCount: videoDetails.statistics?.likeCount
        }
      };
      
      return details;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while getting video details';
      setError(errorMessage);
      console.error('YouTube video details error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    error,
    searchYouTube,
    getVideoDetails
  };
};
