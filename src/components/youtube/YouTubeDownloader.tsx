
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialShareButton from '@/components/shared/SocialShareButton';
import { Download, YoutubeIcon, Loader2 } from "lucide-react";

import { useYouTubeDownloader } from './hooks/useYouTubeDownloader';
import VideoForm from './components/VideoForm';
import VideoDetails from './components/VideoDetails';
import DownloadProgress from './components/DownloadProgress';
import ErrorAlert from './components/ErrorAlert';

const YouTubeDownloader = () => {
  const {
    url,
    setUrl,
    videoDetails,
    isLoading,
    isDownloading,
    downloadProgress,
    downloadComplete,
    error,
    handleSubmit,
    handleDownload,
    handleOpenYouTube
  } = useYouTubeDownloader();

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="h-5 w-5 text-red-600" />
          Téléchargeur YouTube
        </CardTitle>
        <CardDescription>
          Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <VideoForm 
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabled={isDownloading}
        />
        
        <ErrorAlert error={error} />
        
        {videoDetails && (
          <>
            <VideoDetails 
              videoDetails={videoDetails} 
              onOpenYouTube={handleOpenYouTube} 
            />
            
            <DownloadProgress 
              isDownloading={isDownloading}
              downloadProgress={downloadProgress}
              downloadComplete={downloadComplete}
            />
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          {videoDetails && !isDownloading && !downloadComplete && (
            <SocialShareButton 
              title={videoDetails.title} 
              description="Regardez cette vidéo sur YouTube"
              url={`https://www.youtube.com/watch?v=${videoDetails.id}`}
            />
          )}
        </div>
        
        {videoDetails && !downloadComplete && (
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
                Télécharger
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default YouTubeDownloader;
