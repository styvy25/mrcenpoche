
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, FileDown, FileText, Loader2, YoutubeIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import YouTubeURLInput from './YouTubeURLInput';
import { usePlanLimits } from '@/hooks/usePlanLimits';

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
  const { hasReachedLimit, getRemainingUsage } = usePlanLimits();

  const remainingAnalyses = getRemainingUsage('youtubeAnalyses');
  const hasLimit = hasReachedLimit('youtubeAnalyses');

  const handleValidateUrl = async (url: string) => {
    setVideoUrl(url);
    setIsVideoLoading(true);
    setError(null);
    
    try {
      // Simulate API call to validate YouTube URL
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would fetch actual data from YouTube API
      // and handle errors appropriately
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
      // Simulate API call to analyze video content
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would use Perplexity API or similar to analyze the video content
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

  const handleExportPDF = () => {
    // In a real implementation, you would generate a PDF with the analysis
    toast({
      title: "Export PDF",
      description: "Le rapport PDF a été généré et téléchargé",
    });
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
                Entrez l'URL d'une vidéo YouTube pour l'analyser et extraire les points clés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <YouTubeURLInput 
                onSubmit={handleValidateUrl} 
                isLoading={isVideoLoading}
                disabled={isLoading}
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {videoTitle && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-lg">{videoTitle}</h3>
                  <p className="text-sm text-gray-500">{videoDescription}</p>
                </div>
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
              {analysis ? (
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
              ) : (
                <p>Aucune analyse disponible. Veuillez d'abord analyser une vidéo.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleExportPDF} 
                disabled={!analysis}
                variant="outline"
                className="ml-auto"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Exporter en PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YouTubeAnalyzer;
