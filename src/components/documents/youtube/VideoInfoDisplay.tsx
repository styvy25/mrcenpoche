
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle } from "lucide-react";

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

interface VideoInfoDisplayProps {
  videoInfo: VideoInfo | null;
  isDownloading: boolean;
  downloadProgress: number;
  downloadCompleted: boolean;
}

const VideoInfoDisplay: React.FC<VideoInfoDisplayProps> = ({
  videoInfo,
  isDownloading,
  downloadProgress,
  downloadCompleted
}) => {
  if (!videoInfo) return null;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4">
        <div className="w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={videoInfo.thumbnail} 
            alt={videoInfo.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg line-clamp-2">{videoInfo.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>Auteur: {videoInfo.author}</span>
            <span>•</span>
            <span>Durée: {videoInfo.duration}</span>
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Vidéo YouTube
            </Badge>
          </div>
        </div>
      </div>

      {isDownloading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Téléchargement en cours...</span>
            <span>{Math.round(downloadProgress)}%</span>
          </div>
          <Progress value={downloadProgress} className="h-2" />
        </div>
      )}

      {downloadCompleted && (
        <Alert className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Téléchargement terminé</AlertTitle>
          <AlertDescription>
            La vidéo a été téléchargée avec succès. Vous pouvez la trouver dans vos téléchargements.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VideoInfoDisplay;
