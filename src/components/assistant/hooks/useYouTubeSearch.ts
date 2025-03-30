import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";
import { searchYouTube, getVideoInfo } from "../services/youtubeService";
import { createMessage } from "@/utils/MessageUtils";

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
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
            variant: "warning",
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

  // Find the handleVideoSelect function and update it to use createMessage
  const handleVideoSelect = useCallback(
    async (
      videoId: string,
      isOnline: boolean,
      setIsLoading: (loading: boolean) => void,
      setMessages: (messages: Message[]) => void
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

        setMessages((prev) => [
          ...prev,
          createMessage(content, "assistant")
        ]);

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
