
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Video, BookOpen, Info, Settings, Bell, Globe, Star, MessageSquare } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import PageTransitionWrapper from "@/components/ui/page-transition-wrapper";

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
    <PageTransitionWrapper className="min-h-[600px]">
      <div className="mb-6">
        <motion.div 
          className="flex justify-between items-center mb-6 flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green animate-gradient">
            Espace de collaboration
          </h2>
          
          <div className="flex gap-2">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "video" | "immersive")}>
              <TabsList className="backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-gray-200 dark:border-gray-800 p-1 rounded-xl">
                <TabsTrigger value="chat" className="flex items-center gap-1 rounded-lg data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline">Discussion</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-1 rounded-lg data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                  <Video size={16} />
                  <span className="hidden sm:inline">Réunion</span>
                </TabsTrigger>
                <TabsTrigger value="immersive" className="flex items-center gap-1 rounded-lg data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                  <BookOpen size={16} />
                  <span className="hidden sm:inline">Immersif</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>
        
        <AuthRequired>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "chat" && (
                <Card className="p-4 border-0 bg-gradient-to-br from-gray-50/90 to-white/80 dark:from-gray-900/90 dark:to-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl">
                  <ChatTabContent onShowAPIKeyDialog={() => setShowAPIKeyDialog(true)} />
                </Card>
              )}
              
              {activeTab === "video" && (
                <Card className="p-4 border-0 bg-gradient-to-br from-blue-50/90 to-white/80 dark:from-blue-900/30 dark:to-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl">
                  <VideoMeeting onEndMeeting={handleEndMeeting} />
                </Card>
              )}
              
              {activeTab === "immersive" && (
                <Card className="p-4 border-0 bg-gradient-to-br from-green-50/90 to-white/80 dark:from-green-900/30 dark:to-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl">
                  <ImmersiveTrainingSpace />
                </Card>
              )}
            </motion.div>
          </AnimatePresence>

          <Dialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog}>
            <DialogContent className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
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
                  className="bg-mrc-blue hover:bg-blue-600"
                >
                  Compris
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </AuthRequired>
      </div>
    </PageTransitionWrapper>
  );
};

export default ModuleChatView;
