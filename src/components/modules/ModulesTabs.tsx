
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BookOpen, TrendingUp, MessageCircle, Video } from "lucide-react";

interface ModulesTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  modulesContent: React.ReactNode;
  progressContent: React.ReactNode;
  challengeContent: React.ReactNode;
  chatContent: React.ReactNode;
  trainingContent?: React.ReactNode;
}

const ModulesTabs = ({
  activeTab,
  setActiveTab,
  modulesContent,
  progressContent,
  challengeContent,
  chatContent,
  trainingContent
}: ModulesTabsProps) => {
  return (
    <Tabs defaultValue="modules" value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
      <TabsList className="grid sm:grid-cols-4 md:grid-cols-5 gap-1">
        <TabsTrigger value="modules" className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline-block">Modules</span>
        </TabsTrigger>
        
        <TabsTrigger value="progress" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline-block">Progrès</span>
        </TabsTrigger>
        
        <TabsTrigger value="challenge" className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline-block">Défi</span>
        </TabsTrigger>
        
        <TabsTrigger value="chat" className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline-block">Chat</span>
        </TabsTrigger>

        <TabsTrigger value="training" className="flex items-center space-x-2">
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline-block">Formations</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="modules">{modulesContent}</TabsContent>
      <TabsContent value="progress">{progressContent}</TabsContent>
      <TabsContent value="challenge">{challengeContent}</TabsContent>
      <TabsContent value="chat">{chatContent}</TabsContent>
      {trainingContent && <TabsContent value="training">{trainingContent}</TabsContent>}
    </Tabs>
  );
};

export default ModulesTabs;
