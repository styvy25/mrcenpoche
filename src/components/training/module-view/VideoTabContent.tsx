
import React from 'react';
import { Video } from 'lucide-react';
import YoutubeEmbed from '../YoutubeEmbed';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

interface VideoTabContentProps {
  loading: boolean;
  videos?: any[];
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ loading, videos }) => {
  if (loading) {
    return <LoadingState />;
  }

  if (!videos?.length) {
    return (
      <EmptyState 
        icon={<Video className="h-10 w-10" />} 
        title="Aucune vidéo disponible" 
        description="Ce module ne contient pas encore de vidéos."
      />
    );
  }

  return (
    <div className="space-y-6">
      {videos.map((video: any, index: number) => (
        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
          <YoutubeEmbed videoId={video.videoId} title={video.title} />
          <div className="p-4">
            <h3 className="font-semibold mb-1">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoTabContent;
