
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserChat from "@/components/chat/UserChat";
import { ArrowLeft, BellRing, Eye, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityTab = () => {
  const mockStreams = [
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-mrc-blue" />
                Communauté MRC
              </CardTitle>
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </Button>
              </Link>
            </div>
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
              {mockStreams
                .filter(stream => stream.liveStatus === 'upcoming')
                .map(stream => (
                  <div 
                    key={stream.id}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-mrc-blue transition-colors cursor-pointer"
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
              
              {mockStreams.filter(stream => stream.liveStatus === 'upcoming').length === 0 && (
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
              {mockStreams
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
  );
};

export default CommunityTab;
