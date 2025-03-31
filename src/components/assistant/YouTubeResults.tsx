
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Play, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface YouTubeResultsProps {
  results: any[];
  isLoading: boolean;
  onSelect: (videoId: string) => void;
  downloadLinks?: any;
}

const YouTubeResults: React.FC<YouTubeResultsProps> = ({ 
  results,
  isLoading,
  onSelect,
  downloadLinks
}) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Info className="w-4 h-4 mr-1" />
          Recherche en cours...
        </h3>
        <div className="space-y-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <Info className="w-4 h-4 mr-1" />
        Résultats YouTube
      </h3>
      
      {/* Download links section if available */}
      {downloadLinks && (
        <Card className="mb-4 bg-blue-900/20 border-blue-500/20">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2 text-blue-400">Options de téléchargement</h4>
            <p className="text-xs text-gray-400 mb-3">
              Utilisez ces liens pour télécharger la vidéo YouTube via des services externes.
            </p>
            <div className="flex flex-wrap gap-2">
              {downloadLinks.downloadServices.map((service: any, index: number) => (
                <Button 
                  key={index}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => window.open(service.url, '_blank')}
                >
                  <Download className="h-3 w-3 mr-1" />
                  {service.name}
                </Button>
              ))}
              <Button 
                size="sm"
                variant="outline"
                className="text-xs text-mrc-blue"
                onClick={() => window.open(downloadLinks.watchUrl, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Voir sur YouTube
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-2">
        {results.map((video, index) => (
          <Card 
            key={index} 
            className="overflow-hidden border border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 transition-colors cursor-pointer"
            onClick={() => onSelect(video.id)}
          >
            <div className="flex items-start p-3">
              <div className="relative w-24 h-16 rounded overflow-hidden bg-gray-900 shrink-0 mr-3">
                <img 
                  src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{video.title}</h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{video.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YouTubeResults;
