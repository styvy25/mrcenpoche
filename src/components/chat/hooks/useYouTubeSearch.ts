
import { useState } from 'react';

export interface YouTubeResult {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<YouTubeResult[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);

  const handleYouTubeSearch = (query: string, isOnline: boolean = true) => {
    setIsSearchingYouTube(true);
    
    // Mock YouTube search - in a real app, this would call an API
    setTimeout(() => {
      // Mock results for MRC and Kamto videos
      const mockResults: YouTubeResult[] = [
        {
          id: "abc123",
          title: "Maurice Kamto - Discours officiel MRC 2023",
          thumbnail: "https://via.placeholder.com/120x90.png?text=MRC+Kamto",
          channelTitle: "MRC Officiel"
        },
        {
          id: "def456",
          title: "Analyse politique: La situation au Cameroun avec le MRC",
          thumbnail: "https://via.placeholder.com/120x90.png?text=Analyse+MRC",
          channelTitle: "Politique Africaine"
        },
        {
          id: "ghi789",
          title: "Interview exclusive avec Maurice Kamto",
          thumbnail: "https://via.placeholder.com/120x90.png?text=Interview+Kamto",
          channelTitle: "Afrique Media"
        }
      ];
      
      setYoutubeResults(mockResults);
      setIsSearchingYouTube(false);
    }, 1500);
  };
  
  const handleVideoSelect = (videoId: string, isOnline: boolean, setIsLoading: any, setMessages: any) => {
    setYoutubeResults([]);
    return videoId;
  };

  return {
    youtubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect,
    setYoutubeResults
  };
}
