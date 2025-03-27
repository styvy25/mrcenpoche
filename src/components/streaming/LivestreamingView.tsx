
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useToast } from "@/hooks/use-toast";
import BrowseTab from "./tabs/BrowseTab";
import StudioTab from "./tabs/StudioTab";
import CommunityTab from "./tabs/CommunityTab";
import ApiKeyMissing from "./ApiKeyMissing";
import LivestreamingTabIcons from "./components/LivestreamingTabIcons";
import StreamingContainer from "./components/StreamingContainer";

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
    <StreamingContainer>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 max-w-lg mx-auto">
          <LivestreamingTabIcons tab="browse" label="Parcourir" />
          <LivestreamingTabIcons tab="studio" label="Studio" />
          <LivestreamingTabIcons tab="community" label="Communauté" />
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
    </StreamingContainer>
  );
};

export default LivestreamingView;
