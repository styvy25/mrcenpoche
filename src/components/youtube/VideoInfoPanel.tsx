
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface VideoInfo {
  id: string;
  title: string;
  description: string;
}

interface VideoInfoPanelProps {
  videoInfo: VideoInfo | null;
  error: string | null;
}

const VideoInfoPanel: React.FC<VideoInfoPanelProps> = ({ videoInfo, error }) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!videoInfo) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-medium text-lg">{videoInfo.title}</h3>
      <p className="text-sm text-gray-500">{videoInfo.description}</p>
    </div>
  );
};

export default VideoInfoPanel;
