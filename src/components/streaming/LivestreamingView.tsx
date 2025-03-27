
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Video, Play, Eye, MessageCircle, Users, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKeys } from "@/hooks/useApiKeys";
import UserChat from "@/components/chat/UserChat";

interface LiveStream {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  viewCount: number;
  liveStatus: 'live' | 'upcoming' | 'completed';
  channelTitle: string;
}

const LivestreamingView = () => {
  const [livestreams, setLivestreams] = useState<LiveStream[]>([]);
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { keys, keyStatus } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    if (keys.youtube && keyStatus.youtube) {
      fetchLivestreams();
    }
  }, [keys.youtube, keyStatus.youtube]);

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
      // In a real implementation, this would call the YouTube API
      // For now, we'll simulate the response with mock data
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
      
      // In a real implementation, we would fetch from the YouTube API
      // const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=YOUR_CHANNEL_ID&eventType=live&type=video&key=${keys.youtube}`);
      // const data = await response.json();
      // const formattedStreams = data.items.map(item => ({
      //   id: item.id.videoId,
      //   title: item.snippet.title,
      //   description: item.snippet.description,
      //   thumbnail: item.snippet.thumbnails.medium.url,
      //   liveStatus: 'live',
      //   channelTitle: item.snippet.channelTitle
      // }));
      // setLivestreams(formattedStreams);
      
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

  const handleStreamSelect = (stream: LiveStream) => {
    setSelectedStream(stream);
  };

  const filteredStreams = livestreams.filter(
    stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!keys.youtube || !keyStatus.youtube) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-mrc-red" />
            Livestreaming MRC
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Configuration requise</h3>
          <p className="text-center text-muted-foreground mb-4">
            Vous devez configurer votre clé API YouTube pour accéder aux livestreams.
          </p>
          <Button 
            variant="default" 
            onClick={() => window.location.href = "/settings"}
          >
            Configurer l'API YouTube
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-mrc-red" />
                Livestreaming MRC
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchLivestreams}
                disabled={isLoading}
              >
                Actualiser
              </Button>
            </div>
            {selectedStream ? (
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{selectedStream.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Badge variant={selectedStream.liveStatus === 'live' ? "destructive" : selectedStream.liveStatus === 'upcoming' ? "outline" : "secondary"}>
                    {selectedStream.liveStatus === 'live' ? 'EN DIRECT' : selectedStream.liveStatus === 'upcoming' ? 'À VENIR' : 'TERMINÉ'}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {selectedStream.viewCount}
                  </span>
                  <span>{selectedStream.channelTitle}</span>
                </div>
              </div>
            ) : (
              <Input
                placeholder="Rechercher un livestream..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-2"
              />
            )}
          </CardHeader>
          <CardContent className="flex-grow p-0 relative overflow-hidden">
            {selectedStream ? (
              <Tabs defaultValue="video" className="h-full flex flex-col">
                <TabsList className="mx-4 mt-2">
                  <TabsTrigger value="video" className="flex items-center gap-1">
                    <Video className="h-4 w-4" /> Direct
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> Discussion
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="video" className="flex-grow m-0 p-0">
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <iframe
                      title={selectedStream.title}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedStream.id}?autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </TabsContent>
                <TabsContent value="chat" className="flex-grow m-0 p-0 h-full">
                  <UserChat isInDialog={true} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mrc-blue mb-4"></div>
                    <p>Chargement des livestreams...</p>
                  </div>
                ) : filteredStreams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredStreams.map(stream => (
                      <div
                        key={stream.id}
                        className="border border-gray-700 rounded-lg overflow-hidden hover:border-mrc-blue transition-colors cursor-pointer"
                        onClick={() => handleStreamSelect(stream)}
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
                          {stream.liveStatus === 'live' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                              <Button variant="outline" size="sm" className="gap-2 bg-mrc-red border-none text-white hover:bg-mrc-red/80">
                                <Play className="h-4 w-4" />
                                Regarder
                              </Button>
                            </div>
                          )}
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-1">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5 text-mrc-blue" />
              Communauté en ligne
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0 relative overflow-hidden">
            <UserChat isInDialog={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LivestreamingView;
