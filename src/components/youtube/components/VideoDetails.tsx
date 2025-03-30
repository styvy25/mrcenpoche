
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { VideoDetails as VideoDetailsType } from '../hooks/useYouTubeDownloader';

interface VideoDetailsProps {
  videoDetails: VideoDetailsType;
  onOpenYouTube: () => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  videoDetails,
  onOpenYouTube
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative aspect-video w-full">
        <img 
          src={videoDetails.thumbnail} 
          alt={videoDetails.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
          {videoDetails.duration}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2">{videoDetails.title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{videoDetails.author}</div>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-secondary"
            onClick={onOpenYouTube}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Voir sur YouTube
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
