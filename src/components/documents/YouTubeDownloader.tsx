
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { YoutubeIcon, Download, Loader2 } from "lucide-react";
import YouTubeUrlInput from './youtube/YouTubeUrlInput';
import VideoInfoDisplay from './youtube/VideoInfoDisplay';
import ErrorAlert from './youtube/ErrorAlert';
import { useYouTubeDownloader } from './youtube/useYouTubeDownloader';
import SocialShareButton from '@/components/shared/SocialShareButton';

const YouTubeDownloader = () => {
  const {
    videoUrl,
    setVideoUrl,
    videoInfo,
    isLoading,
    isDownloading,
    downloadProgress,
    downloadCompleted,
    error,
    fetchVideoInfo,
    simulateDownload
  } = useYouTubeDownloader();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="text-red-600" />
          Téléchargeur de Vidéos YouTube
        </CardTitle>
        <CardDescription>
          Téléchargez des vidéos YouTube pour une utilisation hors ligne
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <YouTubeUrlInput
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            onFetchVideo={fetchVideoInfo}
            isLoading={isLoading}
            isDownloading={isDownloading}
          />

          <ErrorAlert error={error} />

          <VideoInfoDisplay
            videoInfo={videoInfo}
            isDownloading={isDownloading}
            downloadProgress={downloadProgress}
            downloadCompleted={downloadCompleted}
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div>
          {videoInfo && !isDownloading && !downloadCompleted && (
            <SocialShareButton 
              title={videoInfo.title} 
              description="Regardez cette vidéo sur YouTube"
              url={`https://www.youtube.com/watch?v=${videoInfo.id}`}
            />
          )}
        </div>
        <Button
          onClick={simulateDownload}
          disabled={!videoInfo || isDownloading || downloadCompleted}
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
              Télécharger
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YouTubeDownloader;
