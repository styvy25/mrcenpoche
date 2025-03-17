
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, TrendingUp } from "lucide-react";

interface ModulesTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  chatContent: React.ReactNode;
  progressContent: React.ReactNode;
}

const ModulesTabs = ({
  activeTab,
  setActiveTab,
  chatContent,
  progressContent
}: ModulesTabsProps) => {
  return (
    <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
      <TabsList className="grid grid-cols-2 gap-1">
        <TabsTrigger value="chat" className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline-block">Chat</span>
        </TabsTrigger>
        
        <TabsTrigger value="progress" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline-block">Progrès</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat">{chatContent}</TabsContent>
      <TabsContent value="progress">{progressContent}</TabsContent>
    </Tabs>
  );
};

export default ModulesTabs;
