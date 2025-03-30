
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useYoutubeAnalyzer } from '@/utils/youtubeAnalyzer';

export const useYouTubeAnalyzerState = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('video');
  const { toast } = useToast();
  const { analyzeYoutubeVideo, extractVideoId } = useYoutubeAnalyzer();

  // For demo purpose - in production, these would come from a user's plan
  const remainingAnalyses = 10;
  const hasLimit = false;
  
  // Get videoId from URL
  const videoId = videoUrl ? extractVideoId(videoUrl) : null;

  const handleValidateUrl = async (url: string) => {
    setVideoUrl(url);
    setIsVideoLoading(true);
    setError(null);
    
    try {
      // Simuler API call to validate YouTube URL
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would fetch actual data from YouTube API
      setVideoTitle('Discours de Maurice Kamto sur la situation politique');
      setVideoDescription('Dans cette vidéo, Maurice Kamto analyse la situation politique au Cameroun et propose des solutions pour l\'avenir du pays.');
      setIsVideoLoading(false);
    } catch (err) {
      setError('Impossible de valider cette URL YouTube. Veuillez vérifier et réessayer.');
      setIsVideoLoading(false);
    }
  };

  const handleAnalyzeVideo = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a production app, we would use the real analysis function:
      // const result = await analyzeYoutubeVideo(videoUrl);
      // if (result.success) {
      //   setAnalysis(result.analysis);
      // }
      
      // For demo, we'll simulate the API call:
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAnalysis(`# Analyse de la vidéo: ${videoTitle}

## Points clés:
1. Maurice Kamto aborde la situation politique actuelle au Cameroun
2. Il propose un plan de transition démocratique en 5 étapes
3. Il met l'accent sur la nécessité d'une réforme électorale profonde
4. Il appelle à la mobilisation des citoyens pour le changement

## Résumé:
Dans ce discours important, Maurice Kamto analyse les défis politiques actuels du Cameroun. Il critique la gestion du pouvoir en place et propose des alternatives concrètes. Son discours s'articule autour de la nécessité d'une transition démocratique véritable, avec un accent particulier sur la réforme du système électoral.

Il aborde également les questions économiques et sociales, en proposant des solutions innovantes pour améliorer les conditions de vie des Camerounais. Le message central est un appel à la mobilisation citoyenne pour participer activement au processus de changement.

## Recommandations:
- Diffuser largement ce message aux militants et sympathisants
- Organiser des sessions de discussion autour des propositions faites
- Préparer des documents synthétiques sur le plan de transition proposé
- Renforcer la mobilisation sur le terrain en s'appuyant sur les points soulevés`);
      
      setActiveTab('analysis');
      setIsLoading(false);
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse de la vidéo a été réalisée avec succès",
      });
    } catch (err) {
      setError('Une erreur est survenue lors de l\'analyse de la vidéo.');
      setIsLoading(false);
    }
  };

  return {
    videoUrl,
    videoTitle,
    videoDescription,
    analysis,
    isLoading,
    isVideoLoading,
    error,
    activeTab,
    setActiveTab,
    videoId,
    remainingAnalyses,
    hasLimit,
    handleValidateUrl,
    handleAnalyzeVideo
  };
};
