
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useToast } from "@/hooks/use-toast";
import BrowseTab from "./tabs/BrowseTab";
import StudioTab from "./tabs/StudioTab";
import CommunityTab from "./tabs/CommunityTab";
import ApiKeyMissing from "./ApiKeyMissing";
import { Video, Camera, Users } from "lucide-react";

const LivestreamingView = () => {
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const { keys, keyStatus } = useApiKeys();
  const { toast } = useToast();

  // Shared state between tabs
  const [selectedStream, setSelectedStream] = useState(null);

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    setActiveTab("studio");
  };

  const handleYoutubeUrlChange = (url) => {
    setYoutubeUrl(url);
  };

  if (!keys.youtube || !keyStatus.youtube) {
    return <ApiKeyMissing />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="browse" className="flex items-center gap-1">
            <BrowseTabIcon /> Parcourir
          </TabsTrigger>
          <TabsTrigger value="studio" className="flex items-center gap-1">
            <StudioTabIcon /> Studio
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-1">
            <CommunityTabIcon /> Communauté
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="h-full">
          <BrowseTab 
            onStreamSelect={handleStreamSelect} 
            onYoutubeUrlChange={handleYoutubeUrlChange}
            youtubeUrl={youtubeUrl}
          />
        </TabsContent>
        
        <TabsContent value="studio" className="h-full">
          <StudioTab 
            selectedStream={selectedStream} 
            youtubeUrl={youtubeUrl}
          />
        </TabsContent>
        
        <TabsContent value="community" className="h-full">
          <CommunityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper components for tab icons
const BrowseTabIcon = () => <Video className="h-4 w-4" />;
const StudioTabIcon = () => <Camera className="h-4 w-4" />;
const CommunityTabIcon = () => <Users className="h-4 w-4" />;

export default LivestreamingView;
