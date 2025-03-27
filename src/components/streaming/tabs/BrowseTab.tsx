
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Video, Eye, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface LiveStream {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  viewCount: number;
  liveStatus: 'live' | 'upcoming' | 'completed';
  channelTitle: string;
}

interface BrowseTabProps {
  onStreamSelect: (stream: LiveStream) => void;
  onYoutubeUrlChange: (url: string) => void;
  youtubeUrl: string;
}

const BrowseTab = ({ onStreamSelect, onYoutubeUrlChange, youtubeUrl }: BrowseTabProps) => {
  const [livestreams, setLivestreams] = useState<LiveStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { keys } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    fetchLivestreams();
  }, [keys.youtube]);

  const fetchLivestreams = async () => {
    if (!keys.youtube) {
      toast({
        title: "API YouTube non configurée",
        description: "Veuillez configurer votre clé API YouTube dans les paramètres",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock data for now
      const mockLivestreams: LiveStream[] = [
        {
          id: "stream1",
          title: "Conférence de presse du MRC - Stratégie électorale 2025",
          description: "Discussion des stratégies à mettre en place pour les élections à venir",
          thumbnail: "https://via.placeholder.com/320x180",
          viewCount: 1520,
          liveStatus: 'live',
          channelTitle: "MRC Officiel"
        },
        {
          id: "stream2",
          title: "Débat sur les réformes électorales",
          description: "Analyse des propositions de réformes électorales",
          thumbnail: "https://via.placeholder.com/320x180",
          viewCount: 879,
          liveStatus: 'upcoming',
          channelTitle: "MRC Officiel"
        },
        {
          id: "stream3",
          title: "Réunion du comité directeur MRC",
          description: "Réunion mensuelle du comité directeur du MRC",
          thumbnail: "https://via.placeholder.com/320x180",
          viewCount: 2430,
          liveStatus: 'completed',
          channelTitle: "MRC Officiel"
        }
      ];
      
      setLivestreams(mockLivestreams);
    } catch (error) {
      console.error("Error fetching livestreams:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les livestreams YouTube",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStreams = livestreams.filter(
    stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-mrc-red" />
            Livestreams disponibles
          </CardTitle>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Retour
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchLivestreams}
              disabled={isLoading}
            >
              Actualiser
            </Button>
          </div>
        </div>
        <CardDescription>
          Parcourez les livestreams disponibles ou créez votre propre diffusion
        </CardDescription>
        <Input
          placeholder="Rechercher un livestream..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="h-[calc(100%-8rem)] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mrc-blue mb-4"></div>
            <p>Chargement des livestreams...</p>
          </div>
        ) : filteredStreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStreams.map(stream => (
              <div
                key={stream.id}
                className="border border-gray-700 rounded-lg overflow-hidden hover:border-mrc-blue transition-colors cursor-pointer"
                onClick={() => onStreamSelect(stream)}
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title} 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={stream.liveStatus === 'live' ? "destructive" : stream.liveStatus === 'upcoming' ? "outline" : "secondary"}>
                      {stream.liveStatus === 'live' ? 'EN DIRECT' : stream.liveStatus === 'upcoming' ? 'À VENIR' : 'TERMINÉ'}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{stream.title}</h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{stream.channelTitle}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {stream.viewCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <p>Aucun livestream trouvé</p>
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Réinitialiser la recherche
              </Button>
            )}
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-3">Intégrer une vidéo YouTube</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">URL de la vidéo YouTube</Label>
              <Input 
                id="youtube-url" 
                placeholder="https://www.youtube.com/watch?v=..." 
                value={youtubeUrl}
                onChange={(e) => onYoutubeUrlChange(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => onStreamSelect({
                  id: extractYoutubeId(youtubeUrl) || "dQw4w9WgXcQ",
                  title: "Vidéo YouTube intégrée",
                  description: "Vidéo intégrée depuis YouTube",
                  thumbnail: "https://via.placeholder.com/320x180",
                  viewCount: 0,
                  liveStatus: 'live',
                  channelTitle: "MRC En Poche"
                })}
                disabled={!isValidYoutubeUrl(youtubeUrl)}
                className="bg-mrc-blue hover:bg-mrc-blue/90"
              >
                Diffuser cette vidéo
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions to extract YouTube video ID
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function isValidYoutubeUrl(url: string): boolean {
  return !!extractYoutubeId(url);
}

export default BrowseTab;
