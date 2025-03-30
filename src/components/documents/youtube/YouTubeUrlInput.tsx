
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Link } from "lucide-react";

interface YouTubeUrlInputProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  onFetchVideo: () => void;
  isLoading: boolean;
  isDownloading: boolean;
}

const YouTubeUrlInput: React.FC<YouTubeUrlInputProps> = ({
  videoUrl,
  setVideoUrl,
  onFetchVideo,
  isLoading,
  isDownloading
}) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Entrez l'URL de la vidéo YouTube"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="flex-1"
        disabled={isLoading || isDownloading}
      />
      <Button 
        variant="outline" 
        onClick={onFetchVideo}
        disabled={isLoading || isDownloading || !videoUrl.trim()}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Link className="mr-2 h-4 w-4" />
        )}
        Vérifier
      </Button>
    </div>
  );
};

export default YouTubeUrlInput;
