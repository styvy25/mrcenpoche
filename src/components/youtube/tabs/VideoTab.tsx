
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import YouTubeURLInput from '../YouTubeURLInput';
import { useToast } from '@/hooks/use-toast';

interface VideoInfoPanelProps {
  videoTitle: string;
  videoDescription: string;
  error: string | null;
}

const VideoInfoPanel: React.FC<VideoInfoPanelProps> = ({ videoTitle, videoDescription, error }) => {
  if (error) {
    return (
      <div className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive">
        <h4 className="font-medium mb-1">Erreur</h4>
        <p>{error}</p>
      </div>
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

interface VideoTabProps {
  videoTitle: string;
  videoDescription: string;
  error: string | null;
  videoUrl: string;
  isVideoLoading: boolean;
  isLoading: boolean;
  hasLimit: boolean;
  remainingAnalyses: number;
  handleValidateUrl: (url: string) => Promise<void>;
  handleAnalyzeVideo: () => void;
}

const VideoTab: React.FC<VideoTabProps> = ({
  videoTitle,
  videoDescription,
  error,
  videoUrl,
  isVideoLoading,
  isLoading,
  hasLimit,
  remainingAnalyses,
  handleValidateUrl,
  handleAnalyzeVideo
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyser une vidéo YouTube</CardTitle>
        <CardDescription>
          Entrez l'URL d'une vidéo YouTube pour l'analyser et extraire les points clés
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <YouTubeURLInput 
          onVideoSelect={() => {}}
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
  );
};

export default VideoTab;
