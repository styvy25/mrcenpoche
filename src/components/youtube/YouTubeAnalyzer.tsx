
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Download, FileDown, FileText, Loader2, YoutubeIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import YouTubeURLInput from './YouTubeURLInput';
import { useYoutubeAnalyzer } from '@/utils/youtubeAnalyzer';
import YouTubeAnalysisPDF from './YouTubeAnalysisPDF';

const VideoInfoPanel = ({ videoTitle, videoDescription, error }) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!videoTitle) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-medium text-lg">{videoTitle}</h3>
      <p className="text-sm text-gray-500">{videoDescription}</p>
    </div>
  );
};

const AnalysisContent = ({ analysis }) => {
  if (!analysis) {
    return <p>Aucune analyse disponible. Veuillez d'abord analyser une vidéo.</p>;
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      {analysis.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('## ', '')}</h2>;
        } else if (line.startsWith('- ')) {
          return <li key={index} className="ml-5">{line.replace('- ', '')}</li>;
        } else if (line.match(/^\d+\./)) {
          return <div key={index} className="flex gap-2 ml-2 mb-1">
            <span className="font-bold">{line.split('.')[0]}.</span>
            <span>{line.split('.').slice(1).join('.')}</span>
          </div>;
        } else if (line === '') {
          return <br key={index} />;
        } else {
          return <p key={index} className="my-2">{line}</p>;
        }
      })}
    </div>
  );
};

const DownloadSection = ({ videoId, videoTitle }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!videoId) return;
    
    setIsDownloading(true);
    
    try {
      // Simuler le téléchargement
      toast({
        title: "Téléchargement démarré",
        description: "La vidéo YouTube est en cours de téléchargement"
      });
      
      // Simuler un délai de téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Téléchargement terminé",
        description: "La vidéo a été téléchargée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!videoId) {
    return (
      <div className="text-center py-8">
        <Download className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-xl font-bold mb-2">Téléchargeur YouTube</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne. Entrez une URL YouTube pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">{videoTitle}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">ID: {videoId}</p>
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Téléchargement...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Télécharger la vidéo
              </>
            )}
          </Button>
        </div>
      </div>
      <Alert>
        <AlertTitle>Informations sur le téléchargement</AlertTitle>
        <AlertDescription>
          Le téléchargement de vidéos YouTube est uniquement destiné à un usage personnel et éducatif. 
          Veuillez respecter les droits d'auteur et les conditions d'utilisation de YouTube.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const YouTubeAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('video');
  const { toast } = useToast();
  const { analyzeYoutubeVideo, generateAnalysisPDF, extractVideoId } = useYoutubeAnalyzer();

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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="video" disabled={isLoading}>
            <YoutubeIcon className="mr-2 h-4 w-4 text-red-500" />
            Vidéo YouTube
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysis || isLoading}>
            <FileText className="mr-2 h-4 w-4" />
            Analyse
          </TabsTrigger>
          <TabsTrigger value="download" disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" />
            Téléchargeur
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Analyser une vidéo YouTube</CardTitle>
              <CardDescription>
                Entrez l'URL d'une vidéo YouTube pour l'analyser et extraire les points clés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <YouTubeURLInput 
                onVideoSelect={(id) => setVideoUrl(id)}
                onSubmit={handleValidateUrl} 
                isLoading={isVideoLoading}
                disabled={isLoading}
              />
              
              <VideoInfoPanel 
                videoTitle={videoTitle} 
                videoDescription={videoDescription} 
                error={error} 
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {hasLimit 
                  ? "Analyses disponibles: Illimité" 
                  : `Analyses restantes: ${remainingAnalyses}`}
              </p>
              <Button 
                onClick={handleAnalyzeVideo} 
                disabled={!videoUrl || isLoading || isVideoLoading}
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
            <CardFooter className="flex justify-between">
              {videoId && videoTitle && analysis && (
                <YouTubeAnalysisPDF
                  videoId={videoId}
                  videoTitle={videoTitle}
                  analysis={analysis}
                />
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="download">
          <Card>
            <CardHeader>
              <CardTitle>Téléchargeur YouTube</CardTitle>
              <CardDescription>
                Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne
              </CardDescription>
            </CardHeader>
            <CardContent>
              <YouTubeURLInput 
                onVideoSelect={(id) => setVideoUrl(id)}
                onSubmit={handleValidateUrl} 
                isLoading={isVideoLoading}
                disabled={isLoading}
                title="Télécharger une vidéo YouTube"
              />
              
              <DownloadSection 
                videoId={videoId} 
                videoTitle={videoTitle} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YouTubeAnalyzer;
