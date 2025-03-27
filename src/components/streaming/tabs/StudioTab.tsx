
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import UserChat from "@/components/chat/UserChat";
import { 
  ArrowLeft, AlertCircle, BellRing, Camera, CameraOff, Eye, Layout, 
  Maximize, Mic, MicOff, ScreenShare, Settings, Share2, Video,
  MessageCircle, Users, UserPlus, MessageSquare
} from "lucide-react";
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

interface StudioTabProps {
  selectedStream: LiveStream | null;
  youtubeUrl: string;
}

const StudioTab = ({ selectedStream, youtubeUrl }: StudioTabProps) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [studioMode, setStudioMode] = useState<'preview' | 'live'>('preview');
  const [selectedLayout, setSelectedLayout] = useState("grid");
  const { toast } = useToast();

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

  // Extract YouTube ID from URL if it exists
  const youtubeId = selectedStream?.id || extractYoutubeId(youtubeUrl) || "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
      <div className="lg:col-span-3 flex flex-col">
        <div className="bg-black rounded-t-lg relative overflow-hidden flex-grow aspect-video">
          {/* Studio Preview/Live Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            {youtubeId ? (
              <iframe
                title={selectedStream?.title || "YouTube Video"}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
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
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </Button>
              </Link>
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
  );
};

// Helper function to extract YouTube ID from URL
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default StudioTab;
