
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface VideoInfoDisplayProps {
  videoId: string;
}

const VideoInfoDisplay: React.FC<VideoInfoDisplayProps> = ({ videoId }) => {
  if (!videoId) return null;
  
  const handleOpenYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };
  
  return (
    <div className="space-y-2">
      <Card className="overflow-hidden">
        <div className="aspect-video w-full">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">ID: {videoId}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleOpenYouTube}
            className="text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Ouvrir sur YouTube
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VideoInfoDisplay;
