
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useApiKeys } from "@/hooks/api-keys";
import { useToast } from "@/components/ui/use-toast";
import BrowseTab from "./tabs/BrowseTab";
import StudioTab from "./tabs/StudioTab";
import CommunityTab from "./tabs/CommunityTab";
import ApiKeyMissing from "./ApiKeyMissing";
import LivestreamingTabIcons from "./components/LivestreamingTabIcons";
import StreamingContainer from "./components/StreamingContainer";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import StripePaymentPopup from "@/components/payment/StripePaymentPopup";

const LivestreamingView = () => {
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const { keys, keyStatus } = useApiKeys();
  const { toast } = useToast();
  const { userPlan } = usePlanLimits();
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);

  // Shared state between tabs
  const [selectedStream, setSelectedStream] = useState(null);

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    
    // Vérifier le plan de l'utilisateur
    if (userPlan === 'premium') {
      setActiveTab("studio");
    } else {
      // Montrer une popup pour passer à premium
      setIsPaymentPopupOpen(true);
      toast({
        title: "Fonctionnalité Premium",
        description: "Cette fonctionnalité nécessite un abonnement premium.",
      });
    }
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
      
      <StripePaymentPopup 
        isOpen={isPaymentPopupOpen} 
        onClose={() => setIsPaymentPopupOpen(false)} 
      />
    </StreamingContainer>
  );
};

export default LivestreamingView;
