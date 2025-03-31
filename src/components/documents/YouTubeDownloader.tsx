
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import YouTubeUrlInput from './youtube/YouTubeUrlInput';
import VideoInfoDisplay from './youtube/VideoInfoDisplay';
import ErrorAlert from './youtube/ErrorAlert';
import { useYoutubeAnalyzer } from '@/utils/youtube/index';
import { useScreenSize } from '@/hooks/useScreenSize';
import YouTubeAnalysisPDF from '../youtube/YouTubeAnalysisPDF';

const YouTubeDownloader = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('url');
  const { extractVideoId, analyzeYoutubeVideo } = useYoutubeAnalyzer();
  const { isMobile } = useScreenSize();

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    setError(null);
    
    const extractedId = extractVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
    } else if (url && url.trim() !== '') {
      setError('URL YouTube invalide');
    }
  };

  const handleAnalyze = async () => {
    if (!videoId) {
      setError('Veuillez entrer une URL YouTube valide');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeYoutubeVideo(videoUrl);
      
      if (result.success && result.analysis) {
        setVideoTitle(result.title || 'Vidéo YouTube');
        setAnalysis(result.analysis);
        setActiveTab('analysis');
      } else {
        setError('Impossible d\'analyser cette vidéo. Veuillez vérifier l\'URL ou réessayer plus tard.');
      }
    } catch (error) {
      console.error('Error analyzing video:', error);
      setError('Une erreur s\'est produite lors de l\'analyse de la vidéo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/70 dark:to-gray-800/70">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
          <Youtube className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-red-600`} />
          YouTube Analyzer
        </CardTitle>
        <CardDescription className={isMobile ? 'text-xs' : 'text-sm'}>
          Analysez des vidéos YouTube sur le MRC et la politique camerounaise
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="url" className="flex-1">URL de la vidéo</TabsTrigger>
              <TabsTrigger value="analysis" disabled={!analysis} className="flex-1">Analyse</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="url" className="p-4 space-y-4">
            <YouTubeUrlInput 
              onSubmit={handleUrlChange}
              isLoading={isAnalyzing}
            />
            
            {error && <ErrorAlert message={error} />}
            
            {videoId && !error && (
              <div className="rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
                <VideoInfoDisplay videoId={videoId} />
              </div>
            )}
            
            {videoId && !error && (
              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing} 
                  className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
                  size={isMobile ? "sm" : "default"}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Analyse en cours...
                    </>
                  ) : (
                    'Analyser la vidéo'
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4 p-4 pb-6">
            {analysis && videoId && (
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[400px] shadow-inner">
                  <h3 className="font-semibold mb-2 text-lg text-gray-900 dark:text-gray-100">{videoTitle}</h3>
                  <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{analysis}</p>
                </div>
                
                <YouTubeAnalysisPDF 
                  videoId={videoId}
                  videoTitle={videoTitle}
                  analysis={analysis}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default YouTubeDownloader;
