import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { APIKeyForm } from "../settings/APIKeyForm";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageDisplay from "./MessageDisplay";
import LoadingIndicator from "./LoadingIndicator";
import YouTubeResults from "./YouTubeResults";
import { Message } from "./types/message";
import { getPerplexityResponse } from "./services/perplexityService";
import { searchMRCVideos, getVideoInfo } from "./services/youtubeService";

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, youtubeResults]);

  const handleYouTubeSearch = async (query: string) => {
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer votre clé API YouTube.",
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

    setIsSearchingYouTube(true);
    try {
      const videos = await searchMRCVideos(youtube, query);
      setYoutubeResults(videos);
    } catch (error) {
      toast({
        title: "Erreur YouTube",
        description: "Impossible de récupérer les vidéos. Vérifiez votre clé API YouTube.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingYouTube(false);
    }
  };

  const handleVideoSelect = async (videoId: string) => {
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) return;

    const { youtube, perplexity } = JSON.parse(apiKeys);
    if (!youtube || !perplexity) return;

    setIsLoading(true);
    try {
      const videoInfo = await getVideoInfo(youtube, videoId);
      
      const systemMessage: Message = {
        role: "assistant",
        content: `Analyse de la vidéo: "${videoInfo.title}"\n\nJe suis en train d'examiner le contenu de cette vidéo...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);

      const prompt = `Analyse cette vidéo YouTube du MRC intitulée "${videoInfo.title}". 
                     Description: ${videoInfo.description}
                     ${videoInfo.transcript ? `Transcription: ${videoInfo.transcript}` : ''}
                     
                     Fais un résumé des points clés, identifie les messages politiques principaux et explique comment cette vidéo s'inscrit dans la stratégie de communication du MRC.`;
      
      const analysisContent = await getPerplexityResponse(perplexity, prompt);
      
      const analysisMessage: Message = {
        role: "assistant",
        content: analysisContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, analysisMessage]);
    } catch (error) {
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser cette vidéo. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (input: string) => {
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer vos clés API.",
        variant: "destructive",
      });
      return;
    }

    const { perplexity, youtube } = JSON.parse(apiKeys);
    
    if (!perplexity) {
      toast({
        title: "Clé API Perplexity manquante",
        description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const youtubeKeywords = ["vidéo", "video", "youtube", "regarder", "voir", "discours", "interview", "conférence", "média"];
    const hasYoutubeIntent = youtubeKeywords.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()));
    
    if (hasYoutubeIntent && youtube) {
      const searchTerms = input.replace(/vidéo|video|youtube|regarder|voir|discours|interview|conférence|média/gi, '').trim();
      await handleYouTubeSearch(searchTerms || "MRC Cameroun");
    }

    try {
      const responseContent = await getPerplexityResponse(perplexity, input);
      
      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    if (messages.length <= 1) {
      toast({
        title: "Pas de contenu à exporter",
        description: "Veuillez d'abord avoir une conversation avec l'assistant.",
        variant: "destructive",
      });
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    toast({
      title: "PDF en cours de génération",
      description: "Votre document sera " + (isMobile ? "ouvert" : "téléchargé") + " dans quelques instants.",
    });
    
    let content = "Conversation avec l'Assistant Styvy237\n\n";
    messages.forEach(msg => {
      const roleLabel = msg.role === 'user' ? 'Vous' : 'Assistant';
      const timestamp = new Date(msg.timestamp).toLocaleString();
      content += `${roleLabel} (${timestamp}):\n${msg.content}\n\n`;
    });
    
    setTimeout(() => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      
      if (!isMobile) {
        link.setAttribute('download', `conversation-${new Date().toISOString().slice(0, 10)}.txt`);
      } else {
        link.setAttribute('target', '_blank');
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Exportation réussie",
        description: isMobile ? 
          "Votre conversation a été ouverte. Utilisez l'option de téléchargement de votre navigateur." :
          "Votre conversation a été téléchargée.",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden border border-white/10">
      {!localStorage.getItem("api_keys") && (
        <div className="p-4">
          <APIKeyForm />
        </div>
      )}
      
      <ChatHeader onGeneratePDF={handleGeneratePDF} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/60">
        {messages.map((message, index) => (
          <MessageDisplay key={index} message={message} />
        ))}
        
        {youtubeResults.length > 0 && (
          <YouTubeResults videos={youtubeResults} onVideoSelect={handleVideoSelect} />
        )}
        
        {isSearchingYouTube && (
          <div className="flex items-center gap-2 text-sm text-mrc-red">
            <LoadingIndicator />
            <span>Recherche de vidéos en cours...</span>
          </div>
        )}
        
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        isLoading={isLoading} 
        onSendMessage={handleSendMessage} 
        onGeneratePDF={handleGeneratePDF} 
      />
    </div>
  );
};

export default AIChat;
