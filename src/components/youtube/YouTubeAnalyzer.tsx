
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { YoutubeIcon, FileText, Download } from 'lucide-react';
import VideoTab from './tabs/VideoTab';
import AnalysisTab from './tabs/AnalysisTab';
import DownloadTab from './tabs/DownloadTab';
import { useYouTubeAnalyzerState } from './hooks/useYouTubeAnalyzer';

const YouTubeAnalyzer = () => {
  const {
    videoTitle,
    videoDescription,
    analysis,
    isLoading,
    isVideoLoading,
    error,
    activeTab,
    setActiveTab,
    videoUrl,
    videoId,
    remainingAnalyses,
    hasLimit,
    handleValidateUrl,
    handleAnalyzeVideo
  } = useYouTubeAnalyzerState();

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
          <VideoTab
            videoTitle={videoTitle}
            videoDescription={videoDescription}
            error={error}
            videoUrl={videoUrl}
            isVideoLoading={isVideoLoading}
            isLoading={isLoading}
            hasLimit={hasLimit}
            remainingAnalyses={remainingAnalyses}
            handleValidateUrl={handleValidateUrl}
            handleAnalyzeVideo={handleAnalyzeVideo}
          />
        </TabsContent>
        
        <TabsContent value="analysis">
          <AnalysisTab
            analysis={analysis}
            videoId={videoId}
            videoTitle={videoTitle}
          />
        </TabsContent>
        
        <TabsContent value="download">
          <DownloadTab
            videoId={videoId}
            videoTitle={videoTitle}
            isVideoLoading={isVideoLoading}
            isLoading={isLoading}
            handleValidateUrl={handleValidateUrl}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YouTubeAnalyzer;
