
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, FileText, Loader2, YoutubeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import YouTubeURLInput from './YouTubeURLInput';
import { useYoutubeAnalyzer } from '@/utils/youtubeAnalyzer';
import YouTubeAnalysisPDF from './YouTubeAnalysisPDF';
import VideoInfoPanel from './VideoInfoPanel';
import AnalysisContent from './AnalysisContent';
import YouTubeDownloader from './YouTubeDownloader';

interface VideoInfo {
  id: string;
  title: string;
  description: string;
}

const YouTubeAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('video');
  const { toast } = useToast();
  const { analyzeYoutubeVideo, extractVideoId } = useYoutubeAnalyzer();

  // For display in the UI - in production, these would come from a user's plan
  const remainingAnalyses = 10;
  const hasLimit = false;

  const handleValidateUrl = async (url: string) => {
    setVideoUrl(url);
    setIsVideoLoading(true);
    setError(null);
    
    try {
      // Extract video ID from URL
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('URL YouTube invalide');
      }
      
      // Simulate fetching video info from YouTube API
      // In production, we would make a real API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set dummy data for demo purposes
      setVideoInfo({
        id: videoId,
        title: 'Discours de Maurice Kamto sur la situation politique',
        description: 'Dans cette vidéo, Maurice Kamto analyse la situation politique au Cameroun et propose des solutions pour l\'avenir du pays.'
      });
      
      setIsVideoLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la validation de l\'URL');
      setIsVideoLoading(false);
      setVideoInfo(null);
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoInfo) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would use the actual analyze function
      // const result = await analyzeYoutubeVideo(videoUrl);
      // if (result.success) {
      //   setAnalysis(result.analysis);
      //   setActiveTab('analysis');
      // }
      
      // For demo purposes, generate a simulated analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setAnalysis(`# Analyse de la vidéo: ${videoInfo.title}

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
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'analyse de la vidéo');
      setIsLoading(false);
    }
  };

  const handleDownloadVideo = async (videoId: string, title: string) => {
    if (!videoInfo) return;
    setIsDownloading(true);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsDownloading(false);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video" disabled={isLoading}>
            <YoutubeIcon className="mr-2 h-4 w-4 text-red-500" />
            Vidéo YouTube
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysis || isLoading}>
            <FileText className="mr-2 h-4 w-4" />
            Analyse
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Analyser une vidéo YouTube</CardTitle>
              <CardDescription>
                Entrez l'URL d'une vidéo YouTube pour l'analyser, l'extraire ou la télécharger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <YouTubeURLInput 
                onVideoSelect={(id) => setVideoUrl(`https://youtube.com/watch?v=${id}`)}
                onSubmit={handleValidateUrl}
                onDownload={handleDownloadVideo}
                isLoading={isVideoLoading}
                isDownloading={isDownloading}
                disabled={isLoading}
              />
              
              <VideoInfoPanel 
                videoInfo={videoInfo} 
                error={error} 
              />

              {videoInfo && !isDownloading && (
                <YouTubeDownloader 
                  videoId={videoInfo.id} 
                  title={videoInfo.title}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {hasLimit 
                  ? "Analyses disponibles: Illimité" 
                  : `Analyses restantes: ${remainingAnalyses}`}
              </p>
              <Button 
                onClick={handleAnalyzeVideo} 
                disabled={!videoInfo || isLoading || isVideoLoading || isDownloading}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>Analyser la vidéo</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Résultats de l'analyse</CardTitle>
              <CardDescription>
                Voici l'analyse détaillée de la vidéo YouTube
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalysisContent analysis={analysis} />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              {videoInfo && analysis && (
                <>
                  <YouTubeAnalysisPDF
                    videoId={videoInfo.id}
                    videoTitle={videoInfo.title}
                    analysis={analysis}
                  />
                  {!isDownloading && (
                    <YouTubeDownloader 
                      videoId={videoInfo.id} 
                      title={videoInfo.title}
                    />
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YouTubeAnalyzer;
