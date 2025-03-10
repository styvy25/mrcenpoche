
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, MessageCircle, LightbulbIcon } from "lucide-react";

interface ModulesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modulesContent: ReactNode;
  progressContent: ReactNode;
  challengeContent: ReactNode;
  chatContent: ReactNode;
}

const ModulesTabs = ({
  activeTab,
  setActiveTab,
  modulesContent,
  progressContent,
  challengeContent,
  chatContent
}: ModulesTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="modules" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Modules</span>
        </TabsTrigger>
        <TabsTrigger value="progress" className="flex items-center gap-1">
          <Award className="h-4 w-4" />
          <span className="hidden sm:inline">Progression</span>
        </TabsTrigger>
        <TabsTrigger value="challenge" className="flex items-center gap-1">
          <LightbulbIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Défi quotidien</span>
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Discussion</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="modules" className="pt-4">
        {modulesContent}
      </TabsContent>
      
      <TabsContent value="progress" className="pt-4">
        {progressContent}
      </TabsContent>
      
      <TabsContent value="challenge" className="pt-4">
        {challengeContent}
      </TabsContent>
      
      <TabsContent value="chat" className="pt-4">
        {chatContent}
      </TabsContent>
    </Tabs>
  );
};

export default ModulesTabs;
