
import { useState, useEffect } from "react";
import { Users, Video, BookOpen, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import AuthRequired from "./common/AuthRequired";
import ChatTabContent from "./chat/ChatTabContent";
import VideoMeeting from "./video/VideoMeeting";
import ImmersiveTrainingSpace from "./training/ImmersiveTrainingSpace";

const ModuleChatView = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "video" | "immersive">("chat");
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  const { toast } = useToast();

  // Check if API keys are defined for AI chat
  useEffect(() => {
    if (activeTab === "chat") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        // Don't show dialog on initial load, wait for user to select AI chat
      }
    }
  }, [activeTab]);

  const handleEndMeeting = () => {
    setActiveTab("chat");
    toast({
      title: "Réunion terminée",
      description: "Vous avez quitté la réunion.",
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green animate-gradient">
          Espace de collaboration
        </h2>
        
        <div className="flex gap-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "video" | "immersive")}>
            <TabsList>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <Users size={14} />
                <span className="hidden sm:inline">Discussion</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video size={14} />
                <span className="hidden sm:inline">Réunion</span>
              </TabsTrigger>
              <TabsTrigger value="immersive" className="flex items-center gap-1">
                <BookOpen size={14} />
                <span className="hidden sm:inline">Formation immersive</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <AuthRequired>
        <TabsContent value="chat" className="mt-0">
          <ChatTabContent onShowAPIKeyDialog={() => setShowAPIKeyDialog(true)} />
        </TabsContent>
        
        <TabsContent value="video" className="mt-0">
          <VideoMeeting onEndMeeting={handleEndMeeting} />
        </TabsContent>
        
        <TabsContent value="immersive" className="mt-0">
          <ImmersiveTrainingSpace />
        </TabsContent>

        <Dialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clés API requises</DialogTitle>
              <DialogDescription>
                Pour utiliser l'assistant IA, vous devez configurer vos clés API YouTube et Perplexity
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Veuillez vous rendre dans les paramètres de l'application pour configurer vos clés API.
            </p>
            <DialogFooter>
              <Button 
                onClick={() => {
                  setShowAPIKeyDialog(false);
                  toast({
                    title: "Configuration nécessaire",
                    description: "Veuillez configurer vos clés API dans les paramètres",
                    variant: "destructive"
                  });
                }}
              >
                Compris
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AuthRequired>
    </div>
  );
};

export default ModuleChatView;
