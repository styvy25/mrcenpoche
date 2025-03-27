
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, Video, Play, Eye, MessageCircle, Users, ThumbsUp, 
  Settings, Share2, BellRing, Mic, MicOff, Camera, CameraOff, ScreenShare,
  MessageSquare, UserPlus, Layout, Maximize
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKeys } from "@/hooks/useApiKeys";
import UserChat from "@/components/chat/UserChat";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [studioMode, setStudioMode] = useState<'preview' | 'live'>('preview');
  const [selectedLayout, setSelectedLayout] = useState("grid");
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
    setActiveTab("studio");
  };

  const filteredStreams = livestreams.filter(
    stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleGoLive = () => {
    if (studioMode === 'preview') {
      toast({
        title: "En direct!",
        description: "Votre stream est maintenant en direct sur YouTube",
      });
      setStudioMode('live');
    } else {
      toast({
        title: "Mode aperçu",
        description: "Votre stream n'est plus en direct",
        variant: "destructive"
      });
      setStudioMode('preview');
    }
  };

  if (!keys.youtube || !keyStatus.youtube) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-mrc-red" />
            StreamYard MRC
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
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="browse" className="flex items-center gap-1">
            <Video className="h-4 w-4" /> Parcourir
          </TabsTrigger>
          <TabsTrigger value="studio" className="flex items-center gap-1">
            <Camera className="h-4 w-4" /> Studio
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Communauté
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="h-full">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-mrc-red" />
                  Livestreams disponibles
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
                              Rejoindre
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
              
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-3">Créer une nouvelle diffusion</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stream-title">Titre de la diffusion</Label>
                    <Input id="stream-title" placeholder="Entrez le titre de votre diffusion" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stream-description">Description</Label>
                    <Input id="stream-description" placeholder="Description de votre diffusion" />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setActiveTab("studio")}
                      className="bg-mrc-blue hover:bg-mrc-blue/90"
                    >
                      Créer une diffusion
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="studio" className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
            <div className="lg:col-span-3 flex flex-col">
              <div className="bg-black rounded-t-lg relative overflow-hidden flex-grow aspect-video">
                {/* Studio Preview/Live Area */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {selectedStream ? (
                    <iframe
                      title={selectedStream.title}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedStream.id}?autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white">
                      <Camera className="h-16 w-16 text-gray-600 mb-4" />
                      <p className="text-lg text-gray-400">
                        {cameraEnabled ? 'Caméra activée' : 'Caméra désactivée'}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Status overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <Badge variant={studioMode === 'live' ? 'destructive' : 'outline'} className="animate-pulse">
                    {studioMode === 'live' ? 'EN DIRECT' : 'APERÇU'}
                  </Badge>
                  {studioMode === 'live' && (
                    <div className="flex items-center gap-1 bg-black/60 text-white rounded px-2 py-1 text-xs">
                      <Eye className="h-3 w-3" /> 
                      <span>{Math.floor(Math.random() * 200) + 50}</span>
                    </div>
                  )}
                </div>
                
                {/* Layout selector overlay */}
                <div className="absolute bottom-2 right-2">
                  <Button variant="outline" size="sm" className="bg-black/60 border-gray-700">
                    <Layout className="h-4 w-4 mr-1" />
                    Disposition
                  </Button>
                </div>
              </div>
              
              {/* Studio Controls */}
              <div className="bg-gray-900 border border-gray-800 rounded-b-lg px-4 py-3">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant={micEnabled ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => setMicEnabled(!micEnabled)}
                      className="gap-1"
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      {micEnabled ? 'Micro' : 'Muet'}
                    </Button>
                    
                    <Button
                      variant={cameraEnabled ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => setCameraEnabled(!cameraEnabled)}
                      className="gap-1"
                    >
                      {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                      {cameraEnabled ? 'Caméra' : 'Sans vidéo'}
                    </Button>
                    
                    <Button
                      variant={screenShareEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setScreenShareEnabled(!screenShareEnabled)}
                      className="gap-1"
                    >
                      <ScreenShare className="h-4 w-4" />
                      Partage d'écran
                    </Button>
                    
                    <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                      <SelectTrigger className="w-36 h-9 text-xs">
                        <SelectValue placeholder="Disposition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="grid">Grille</SelectItem>
                        <SelectItem value="sidebar">Barre latérale</SelectItem>
                        <SelectItem value="picture">Image dans l'image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                    >
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </Button>
                    
                    <Button
                      variant={studioMode === 'preview' ? 'default' : 'destructive'}
                      size="sm"
                      onClick={toggleGoLive}
                      className={`gap-1 ${studioMode === 'preview' ? 'bg-mrc-red hover:bg-mrc-red/90' : ''}`}
                    >
                      {studioMode === 'preview' ? (
                        <>
                          <BellRing className="h-4 w-4" />
                          Commencer la diffusion
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Arrêter la diffusion
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Stream Information */}
              <Card className="mt-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex justify-between items-center">
                    <span>Informations de la diffusion</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share2 className="h-4 w-4 mr-1" />
                      Partager
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title">Titre</Label>
                      <Input 
                        id="title" 
                        value={selectedStream?.title || "Nouvelle diffusion MRC"} 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input 
                        id="description" 
                        value={selectedStream?.description || "Description de la diffusion"} 
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="private" />
                        <Label htmlFor="private">Diffusion privée</Label>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Mettre à jour
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:col-span-1 h-full flex flex-col">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsList className="w-full">
                  <TabsTrigger value="chat" className="flex-1 flex items-center justify-center gap-1">
                    <MessageCircle className="h-4 w-4" /> Chat
                  </TabsTrigger>
                  <TabsTrigger value="participants" className="flex-1 flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" /> Participants
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="flex-grow m-0 p-0 h-full">
                  <Card className="h-full flex flex-col border-t-0 rounded-t-none">
                    <CardContent className="p-0 overflow-hidden h-full">
                      <UserChat isInDialog={true} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="participants" className="flex-grow m-0 h-full">
                  <Card className="h-full flex flex-col border-t-0 rounded-t-none">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Participants (23)</h3>
                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                          <UserPlus className="h-3 w-3" />
                          Inviter
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                <Users className="h-4 w-4 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Utilisateur {i + 1}</p>
                                <p className="text-xs text-gray-400">Spectateur</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MessageSquare className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-mrc-blue" />
                    Communauté MRC
                  </CardTitle>
                  <CardDescription>
                    Rejoignez notre communauté et participez aux discussions
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden p-0">
                  <UserChat isInDialog={true} />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-mrc-red" />
                    Prochaines diffusions
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-auto">
                  <div className="space-y-4">
                    {filteredStreams
                      .filter(stream => stream.liveStatus === 'upcoming')
                      .map(stream => (
                        <div 
                          key={stream.id}
                          className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-mrc-blue transition-colors cursor-pointer"
                          onClick={() => handleStreamSelect(stream)}
                        >
                          <img 
                            src={stream.thumbnail} 
                            alt={stream.title} 
                            className="w-full aspect-video object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-medium text-sm">{stream.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">Commence dans 2 heures</p>
                            <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
                              <BellRing className="h-3 w-3 mr-1" />
                              Rappel
                            </Button>
                          </div>
                        </div>
                      ))}
                    
                    {filteredStreams.filter(stream => stream.liveStatus === 'upcoming').length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Aucune diffusion à venir pour le moment
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Diffusions populaires</h3>
                    {filteredStreams
                      .filter(stream => stream.liveStatus === 'completed')
                      .slice(0, 3)
                      .map(stream => (
                        <div 
                          key={stream.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                        >
                          <img 
                            src={stream.thumbnail} 
                            alt={stream.title} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium truncate">{stream.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Eye className="h-3 w-3" /> {stream.viewCount}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LivestreamingView;
