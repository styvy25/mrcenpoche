
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";
import { createMessage } from "@/utils/MessageUtils";

// YouTube result interface
interface YouTubeResult {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
}

// Video info interface
interface VideoInfo {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

// Function to search YouTube videos
const searchYouTube = async (apiKey: string, query: string): Promise<YouTubeResult[]> => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
    query
  )}&type=video&key=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails
  }));
};

// Function to get video details
const getVideoInfo = async (apiKey: string, videoId: string): Promise<VideoInfo> => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const data = await response.json();
  const item = data.items[0];
  
  return {
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    viewCount: parseInt(item.statistics.viewCount, 10),
    likeCount: parseInt(item.statistics.likeCount || '0', 10),
    commentCount: parseInt(item.statistics.commentCount || '0', 10)
  };
};

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<YouTubeResult[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSearch = useCallback(
    async (query: string, isOnline: boolean) => {
      if (!query.trim()) {
        toast({
          title: "Erreur",
          description: "Veuillez entrer un terme de recherche.",
          variant: "destructive",
        });
        return;
      }

      setIsSearchingYouTube(true);
      setYoutubeResults([]);

      try {
        if (!isOnline) {
          toast({
            title: "Mode hors-ligne",
            description: "La recherche YouTube est désactivée en mode hors-ligne.",
            variant: "default",
          });
          return;
        }

        const apiKeys = localStorage.getItem("api_keys");
        if (!apiKeys) {
          toast({
            title: "Clé API manquante",
            description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
            variant: "destructive",
          });
          return;
        }

        const { youtube } = JSON.parse(apiKeys);
        if (!youtube) {
          toast({
            title: "Clé API YouTube manquante",
            description: "Veuillez configurer votre clé API YouTube dans les paramètres.",
            variant: "destructive",
          });
          return;
        }

        const results = await searchYouTube(youtube, query);
        setYoutubeResults(results);
      } catch (error) {
        console.error("YouTube search error:", error);
        toast({
          title: "Erreur de recherche YouTube",
          description: "Une erreur s'est produite lors de la recherche de vidéos YouTube.",
          variant: "destructive",
        });
      } finally {
        setIsSearchingYouTube(false);
      }
    },
    [toast]
  );

  const handleVideoSelect = useCallback(
    async (
      videoId: string,
      isOnline: boolean,
      setIsLoading: (loading: boolean) => void,
      setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
    ) => {
      setIsLoading(true);
      setYoutubeResults([]); // Clear results after selection

      try {
        let videoInfo;
        if (isOnline) {
          const apiKeys = localStorage.getItem("api_keys");
          if (apiKeys) {
            const { youtube } = JSON.parse(apiKeys);
            if (youtube) {
              videoInfo = await getVideoInfo(youtube, videoId);
            }
          }
        }

        // Use a generic response if we couldn't get specific information
        const content = videoInfo
          ? `Voici la vidéo que vous avez sélectionnée : "${videoInfo.title}" par ${videoInfo.channelTitle}. La vidéo a été publiée le ${new Date(videoInfo.publishedAt).toLocaleDateString('fr-FR')} et a ${videoInfo.viewCount.toLocaleString('fr-FR')} vues.`
          : `Voici la vidéo YouTube que vous avez sélectionnée. (ID: ${videoId})`;

        const newMessage = createMessage(content, "assistant");
        setMessages((prev: Message[]) => [...prev, newMessage]);

      } catch (error) {
        console.error("Error fetching video info:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setYoutubeResults]
  );

  return {
    youtubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect,
    setYoutubeResults
  };
}

// Export the utility functions for use in other components
export { searchYouTube, getVideoInfo };
