
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, Play, Clock, Calendar } from "lucide-react";

interface YouTubeResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeResultsProps {
  videos: YouTubeResult[];
  onVideoSelect: (videoId: string) => void;
}

const YouTubeResults = ({ videos, onVideoSelect }: YouTubeResultsProps) => {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Formater la date de publication
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handlePlayVideo = (videoId: string) => {
    if (previewVideo === videoId) {
      setPreviewVideo(null);
    } else {
      setPreviewVideo(videoId);
    }
  };

  return (
    <div className="space-y-3 mb-4">
      <h3 className="font-medium flex items-center gap-2 text-mrc-red">
        <Youtube size={18} />
        Vidéos liées au MRC
      </h3>
      <div className="grid gap-3">
        {videos.map((video) => (
          <Card key={video.id} className="p-3 bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 transition-colors">
            {previewVideo === video.id ? (
              <div className="mb-3">
                <div className="aspect-video rounded-md overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="relative w-24 h-auto overflow-hidden group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-24 h-auto rounded-md object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handlePlayVideo(video.id)}
                  >
                    <Play size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {expandedVideo === video.id ? video.description : video.description.substring(0, 100) + "..."}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(video.publishedAt)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 px-2 bg-mrc-red/20 border-mrc-red/30 hover:bg-mrc-red/30 text-white"
                      onClick={() => onVideoSelect(video.id)}
                    >
                      Analyser
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 px-2 bg-gray-700/50 hover:bg-gray-700"
                      onClick={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
                    >
                      {expandedVideo === video.id ? "Réduire" : "Plus"}
                    </Button>
                    <Button
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 px-2 bg-gray-700/50 hover:bg-gray-700"
                      onClick={() => handlePlayVideo(video.id)}
                    >
                      {previewVideo === video.id ? "Fermer" : "Aperçu"}
                    </Button>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-mrc-red flex items-center gap-1 ml-auto"
                    >
                      <ExternalLink size={12} />
                      Voir sur YouTube
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YouTubeResults;
