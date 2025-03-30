import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { searchYouTubeVideos } from "../services/perplexityService";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../types/message";

export function useYouTubeSearch() {
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSearch = useCallback(async (query: string, isOnline: boolean) => {
    if (!query.trim()) return;

    setIsSearchingYouTube(true);
    setYoutubeResults([]);

    if (!isOnline) {
      toast({
        title: "Mode hors-ligne",
        description: "La recherche YouTube est désactivée en mode hors-ligne.",
        variant: "warning",
      });
      setIsSearchingYouTube(false);
      return;
    }

    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Clés API manquantes",
          description: "Veuillez configurer vos clés API pour utiliser la recherche YouTube.",
          variant: "destructive",
        });
        return;
      }

      const { youtube } = JSON.parse(apiKeys);
      if (!youtube) {
        toast({
          title: "Clé API YouTube manquante",
          description: "Veuillez configurer votre clé API YouTube pour utiliser la recherche YouTube.",
          variant: "destructive",
        });
        return;
      }

      const results = await searchYouTubeVideos(youtube, query);
      setYoutubeResults(results);
    } catch (error) {
      console.error("Error searching YouTube:", error);
      toast({
        title: "Erreur de recherche YouTube",
        description: "Une erreur s'est produite lors de la recherche de vidéos YouTube.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingYouTube(false);
    }
  }, [toast]);

  const handleVideoSelect = useCallback(
    async (videoId: string, isOnline: boolean, setIsLoading: (loading: boolean) => void, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
      if (!isOnline) {
        toast({
          title: "Mode hors-ligne",
          description: "La lecture de vidéos YouTube est désactivée en mode hors-ligne.",
          variant: "warning",
        });
        return;
      }

      try {
        // Show a loading message
        const loadingMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: "Chargement de la vidéo YouTube...",
          timestamp: new Date(),
          text: "Chargement de la vidéo YouTube..."
        };
        
        setMessages(prev => [...prev, loadingMessage]);
        setIsLoading(true);
        
        // Simulate fetching video title (replace with actual API call if needed)
        const videoTitle = "Titre de la vidéo YouTube";
        
        // Update with success message
        const videoEmbedHtml = `
        <div class="youtube-embed">
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/${videoId}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
          <p class="text-sm text-gray-500 mt-2">Vidéo: ${videoTitle || "YouTube"}</p>
        </div>`;
        
        const successMessage: Message = {
          id: uuidv4(),
          role: "assistant", 
          content: videoEmbedHtml,
          timestamp: new Date(),
          text: "Voici la vidéo que vous avez demandée."
        };
        
        // Replace the loading message with the success message
        setMessages(prev => prev.map(msg => 
          msg.content === loadingMessage.content ? successMessage : msg
        ));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error embedding video:", error);
        toast({
          title: "Erreur de lecture YouTube",
          description: "Une erreur s'est produite lors de la lecture de la vidéo YouTube.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  return {
    youtubeResults,
    isSearchingYouTube,
    handleYouTubeSearch,
    handleVideoSelect,
    setYoutubeResults
  };
}
